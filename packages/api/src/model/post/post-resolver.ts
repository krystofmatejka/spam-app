import {Resolver, Query, Mutation, Subscription, Arg, ID, PubSub, Publisher, Root} from 'type-graphql'
import {PostEntity} from './post-entity'
import {PostInput} from './post-input'
import {createConnection} from '../../pagination'
import {PostConnection} from './post-connection'
import {PostService} from './post-service'

@Resolver()
export class PostResolver {
  private postService = new PostService()

  @Query(() => PostEntity, {nullable: true})
  public post(
    @Arg('id', () => ID, {nullable: true}) id: string
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
  public async createPost(
    @Arg('input') input: PostInput,
    @PubSub('NEW_POST') notifyNewPost: Publisher<PostEntity>
  ) {
    const post = await this.postService.createPost(input)
    await notifyNewPost(post)

    return post
  }

  @Subscription(() => PostEntity, {
    topics: 'NEW_POST'
  })
  public newPosts(
    @Root() post: PostEntity
  ): PostEntity {
    return post
  }
}
