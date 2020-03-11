import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql'
import { getRepository, IsNull } from 'typeorm'
import { PostEntity } from './PostEntity'
import { PostInput } from './PostInput'
import { composeFindOptions } from '../../pagination/composeFindOptions'
import { createConnection } from '../../pagination/createConnection'
import { PostConnection } from './PostConnection'

@Resolver()
export class PostsResolver {
  private postRepository = getRepository(PostEntity)

  @Query(() => PostEntity)
  public post (
    @Arg('postId', () => ID) postId: string
  ): Promise<PostEntity> {
    return this.postRepository.findOne(postId)
  }

  @Query(() => PostConnection)
  public async posts (
    @Arg('parent', { nullable: true}) parent: string,
    @Arg('first', { nullable: true }) first: number = 10,
    @Arg('after', { nullable: true }) after: string
  ): Promise<PostConnection> {
    const findOptions = (parent) ? { where: { parent }} : { where: { parent: IsNull() } }
    const findOptionsWithCursor = composeFindOptions(first, after, findOptions)

    const posts = await this.postRepository.find(findOptionsWithCursor)
    return createConnection(posts, first)
  }

  @Mutation(() => PostEntity)
  public createPost (
    @Arg('input') input: PostInput
  ): Promise<PostEntity> {
    const data = {
      text: input.text
    }
    if (input.parentId) {
      Object.assign(data, { parent: { id: parseInt(input.parentId, 10) }})
    }
    const article = this.postRepository.create(data)

    return this.postRepository.save(article)
  }
}
