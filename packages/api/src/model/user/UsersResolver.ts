import { Resolver, Query, Arg } from 'type-graphql'
import { getRepository } from 'typeorm'
import { UserEntity } from './UserEntity'
import { composeFindOptions } from '../../pagination/composeFindOptions'
import { createConnection } from '../../pagination/createConnection'
import { UserConnection } from './pagination/UserConnection'

@Resolver()
export class UsersResolver {
  private usersRepository = getRepository(UserEntity)

  @Query(() => UserConnection)
  public async users (
    @Arg('first', { nullable: true }) first: number = 10,
    @Arg('after', { nullable: true }) after: string
  ): Promise<UserConnection> {
    const findOptions = composeFindOptions(first, after)
    const users = await this.usersRepository.find(findOptions)
    return createConnection(users, first)
  }
}
