import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql'
import { getRepository } from 'typeorm'
import { PostEntity } from './PostEntity'
import { PostInput } from './PostInput'
import { composeFindOptions } from '../../pagination/composeFindOptions'
import { createConnection } from '../../pagination/createConnection'
import { PostConnection } from './pagination/PostConnection'

@Resolver()
export class PostsResolver {
  private postRepository = getRepository(PostEntity)

  @Query(() => [ PostEntity ])
  public getPosts (): Promise<PostEntity[]> {
    return this.postRepository.find({
      order: {
        id: 'DESC'
      }
    })
  }

  @Query(() => PostEntity)
  public getPost (
    @Arg('postId', () => ID) postId: string
  ): Promise<PostEntity> {
    return this.postRepository.findOne(postId)
  }

  @Mutation(() => PostEntity)
  public createPost (
    @Arg('input') input: PostInput
  ): Promise<PostEntity> {
    const article = this.postRepository.create({
      text: input.text
    })

    return this.postRepository.save(article)
  }

  @Query(() => PostConnection)
  public async posts (
    @Arg('first', { nullable: true }) first: number = 10,
    @Arg('after', { nullable: true }) after: string
  ): Promise<PostConnection> {
    const findOptions = composeFindOptions(first, after)
    const posts = await this.postRepository.find(findOptions)
    return createConnection(posts, first)
  }
}
