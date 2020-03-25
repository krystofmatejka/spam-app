import {Resolver, Query, Mutation, Subscription, Arg, ID, PubSub, Publisher, Root} from 'type-graphql'
import {PostEntity} from './post-entity'
import {PostInput} from './post-input'
import {createConnection} from '../../pagination'
import {PostConnection} from './post-connection'
import {PostService} from './post-service'

interface PostSubscription {
  post: PostEntity,
  parent?: string
}

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
    @PubSub('NEW_POST') notifyNewPost: Publisher<PostSubscription>
  ) {
    const post = await this.postService.createPost(input)
    await notifyNewPost({post, parent: input.parent})

    return post
  }

  @Subscription(() => PostEntity, {
    topics: 'NEW_POST',
    // tslint:disable-next-line:triple-equals
    filter: ({payload, args}) => args.parent == payload.parent
  })
  public newPosts(
    @Root() payload: PostSubscription,
    @Arg('parent', {nullable: true}) parent: string = null
  ): PostEntity {
    return payload.post
  }
}
