import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class PageInfo {
  @Field()
  public hasNextPage: boolean
}
