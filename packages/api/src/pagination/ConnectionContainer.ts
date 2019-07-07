import { ClassType, Field, ObjectType } from 'type-graphql'
import { PageInfo } from './PageInfo'

export const ConnectionContainer = <T>(name: string, TEntity: ClassType<T>) => {
  @ObjectType(`${name}Edge`)
  abstract class Edge {
    @Field()
    public cursor: string

    @Field(() => TEntity)
    public node: T
  }

  @ObjectType({ isAbstract: true })
  abstract class Connection {
    @Field(() => [ Edge ])
    public edges: Edge[] = []

    @Field(() => PageInfo)
    public pageInfo: PageInfo
  }

  return Connection
}
