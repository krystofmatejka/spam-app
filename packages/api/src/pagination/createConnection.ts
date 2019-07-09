import { pipe } from 'ramda'
import { IEntity } from './IEntity'
import { IConnection } from './IConnection'
import { IEdge } from './IEdge'
import { encodeCursor } from './encodeCursor'

const hasNextPage = (first: number, entities: IEntity[]) => (entities.length - 1 === first)

const sliceUnnecessaryEntity = (first: number) => (entities: IEntity[]) => {
  return hasNextPage(first, entities) ? entities.slice(0, entities.length - 1) : entities
}

const entitiesToEdges = (entities: IEntity[]) => entities.map((entity) => ({
  cursor: encodeCursor(entity.id),
  node: entity
}))

const getBorderCursors = (edges = []) => {
  let startCursor
  let endCursor
  if (edges.length > 0) {
    startCursor = edges[0].cursor
    endCursor = edges[edges.length - 1].cursor
  }

  return {
    startCursor,
    endCursor
  }
}

const getPageInfo = <T>(first: number, entities: IEntity[], edges: Array<IEdge<T>>) => {
  return {
    pageInfo: {
      hasNextPage: hasNextPage(first, entities),
      ...getBorderCursors(edges)
    }
  }
}

export const createConnection = <T extends IEntity>(entities: T[], first: number): IConnection<IEdge<T>> => {
  const edges: any = pipe(
    sliceUnnecessaryEntity(first),
    entitiesToEdges
  )(entities)

  return {
    edges,
    ...getPageInfo(first, entities, edges)
  }
}
