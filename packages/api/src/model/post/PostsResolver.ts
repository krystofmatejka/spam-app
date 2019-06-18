import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql'
import { getRepository } from 'typeorm'
import { PostEntity } from './PostEntity'
import { PostInput } from './PostInput'

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
}
