import { ClassType, Field, ObjectType } from 'type-graphql'

export const EdgeContainer = <T>(TEntity: ClassType<T>) => {
  @ObjectType({ isAbstract: true })
  abstract class Edge {
    @Field()
    public cursor: string

    @Field(() => TEntity)
    public node: T
  }

  return Edge
}
