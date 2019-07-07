import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class PageInfo {
  @Field()
  public hasNextPage: boolean

  @Field({ nullable: true })
  public startCursor: string

  @Field({ nullable: true })
  public endCursor: string
}
