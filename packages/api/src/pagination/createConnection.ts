import { IEntity } from './IEntity'
import { IConnection } from './IConnection'
import { IEdge } from './IEdge'
import { encodeCursor } from './encodeCursor'

export const createConnection = <T extends IEntity>(entities: T[], first: number): IConnection<IEdge<T>> => {
  let hasNextPage = false

  if (entities.length - 1 === first) {
    entities = entities.slice(0, entities.length - 1)
    hasNextPage = true
  }

  const edges = entities.map((entity) => ({
    cursor: encodeCursor(entity.id),
    node: entity
  }))

  return {
    edges,
    pageInfo: {
      hasNextPage
    }
  }
}
