import {Resolver, Query, Mutation, Arg, ID} from 'type-graphql'
import {PostEntity} from './post-entity'
import {PostInput} from './post-input'
import {createConnection} from '../../pagination'
import {PostConnection} from './post-connection'
import {PostService} from './post-service'

@Resolver()
export class PostResolver {
  private postService = new PostService()

  @Query(() => PostEntity)
  public post(
    @Arg('id', () => ID) id: string
  ) {
    return this.postService.findPost(id)
  }

  @Query(() => PostConnection)
  public async posts(
    @Arg('first', {nullable: true}) first: number = 10,
    @Arg('after', {nullable: true}) after: string = null,
    @Arg('parent', {nullable: true}) parent: string = null
  ) {
    const posts = await this.postService.findPosts(first, after, parent)
    return createConnection(posts, first)
  }

  @Mutation(() => PostEntity)
  public createPost(
    @Arg('input') input: PostInput
  ) {
    return this.postService.createPost(input)
  }
}
