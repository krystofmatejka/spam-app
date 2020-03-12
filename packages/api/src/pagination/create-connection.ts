import {pipe} from 'ramda'
import {encodeCursor} from './encoder'
import {PageInfo} from './page-info'

interface Connection<TEdge> {
  edges: TEdge[]
  pageInfo: PageInfo
}

interface Edge<TEntity> {
  cursor: string
  node: TEntity
}

interface Entity {
  id: number
}

const hasNextPage = (first: number, entities: Entity[]) => (entities.length - 1 === first)

const sliceUnnecessaryEntity = (first: number) => (entities: Entity[]) => {
  return hasNextPage(first, entities) ? entities.slice(0, -1) : entities
}

const entitiesToEdges = (entities: Entity[]) => entities.map((entity) => ({
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

const getPageInfo = <T>(first: number, entities: Entity[], edges: Array<Edge<T>>) => {
  return {
    pageInfo: {
      hasNextPage: hasNextPage(first, entities),
      ...getBorderCursors(edges)
    }
  }
}

export const createConnection = <T extends Entity>(entities: T[], first: number): Connection<Edge<T>> => {
  const edges: any = pipe(
    sliceUnnecessaryEntity(first),
    entitiesToEdges
  )(entities)

  return {
    edges,
    ...getPageInfo(first, entities, edges)
  }
}
