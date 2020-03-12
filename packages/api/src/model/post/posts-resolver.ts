import {Resolver, Query, Mutation, Arg, ID} from 'type-graphql'
import {getRepository, IsNull} from 'typeorm'
import {PostEntity} from './post-entity'
import {PostInput} from './post-input'
import {createConnection, composeFindOptions} from '../../pagination'
import {PostConnection} from './post-connection'

@Resolver()
export class PostsResolver {
  private postRepository = getRepository(PostEntity)

  @Query(() => PostEntity)
  public post(
    @Arg('postId', () => ID) postId: string
  ): Promise<PostEntity> {
    return this.postRepository.findOne(postId)
  }

  @Query(() => PostConnection)
  public async posts(
    @Arg('first', {nullable: true}) first: number = 10,
    @Arg('after', {nullable: true}) after: string = null,
    @Arg('parent', {nullable: true}) parent: string = null
  ): Promise<PostConnection> {
    const findOptions = {
      where: {
        parent: (parent) ? parent : IsNull()
      }
    }
    const findOptionsWithCursor = composeFindOptions(first, after, findOptions)

    const posts = await this.postRepository.find(findOptionsWithCursor)
    return createConnection(posts, first)
  }

  @Mutation(() => PostEntity)
  public createPost(
    @Arg('input') input: PostInput
  ): Promise<PostEntity> {
    const data = {
      text: input.text
    }
    if (input.parent) {
      Object.assign(data, {
        parent: {
          id: parseInt(input.parent, 10)
        }
      })
    }
    const article = this.postRepository.create(data)

    return this.postRepository.save(article)
  }
}
