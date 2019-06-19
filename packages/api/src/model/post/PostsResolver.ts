import { Resolver, Query, Mutation, Arg, ID, ObjectType, Field } from 'type-graphql'
import { getRepository, MoreThan } from 'typeorm'
import { PostEntity } from './PostEntity'
import { PostInput } from './PostInput'

@ObjectType()
class Edge {
  @Field()
  public cursor: string

  @Field(() => PostEntity)
  public node: PostEntity
}

@ObjectType()
class PageInfo {
  @Field()
  public hasNextPage: boolean = false

  @Field()
  public hasPreviousPage: boolean = false
}

@ObjectType()
class PostsConnection {
  @Field(() => [ Edge ])
  public edges: Edge[] = []

  @Field(() => PageInfo)
  public pageInfo: PageInfo = {
    hasNextPage: false,
    hasPreviousPage: false
  }
}

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

  @Query(() => PostsConnection)
  public async posts (
    @Arg('first') first: number = 5,
    @Arg('after') after: number = 0
  ) {
    const posts = await this.postRepository.find({
      take: first,
      where: {
        id: MoreThan(after)
      }
    })

    const edges = posts.map((post) => ({
      cursor: `${post.id}`,
      node: post
    }))

    const postsConnection = new PostsConnection()
    postsConnection.edges = edges

    return postsConnection
  }
}
