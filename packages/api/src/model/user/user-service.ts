import {getRepository} from 'typeorm'
import {UserEntity} from './user-entity'
import {composeFindOptions} from '../../pagination'

export class UserService {
  private usersRepository = getRepository(UserEntity)

  public findUsers(first: number, after?: string) {
    const findOptions = composeFindOptions(first, after)
    return this.usersRepository.find(findOptions)
  }
}
