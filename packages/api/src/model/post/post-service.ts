import {getRepository, IsNull} from 'typeorm'
import {PostEntity} from './post-entity'
import {PostInput} from './post-input'
import {composeFindOptions} from '../../pagination'

export class PostService {
  private postRepository = getRepository(PostEntity)

  public findPost(id: string) {
    return this.postRepository.findOne(parseInt(id, 10))
  }

  public findPosts(first: number, after?: string, parent?: string) {
    const findOptions = {
      where: {
        parent: (parent) ? parent : IsNull()
      }
    }
    const findOptionsWithCursor = composeFindOptions(first, after, findOptions)

    return this.postRepository.find(findOptionsWithCursor)
  }

  public createPost(input: PostInput) {
    const data = {
      text: input.text,
      parent: (input.parent) ? {id: parseInt(input.parent, 10)} : null
    }
    const article = this.postRepository.create(data)

    return this.postRepository.save(article)
  }
}
