import { ClassType, Field, ObjectType } from 'type-graphql'
import { PageInfo } from './PageInfo'

export const ConnectionContainer = <T>(TEdge: ClassType<T>) => {
  @ObjectType({ isAbstract: true })
  abstract class Connection {
    @Field(() => [ TEdge ])
    public edges: T[] = []

    @Field(() => PageInfo)
    public pageInfo: PageInfo = {
      hasNextPage: false
    }
  }

  return Connection
}
