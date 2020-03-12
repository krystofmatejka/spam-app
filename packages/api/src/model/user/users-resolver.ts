import {Resolver, Query, Arg} from 'type-graphql'
import {getRepository} from 'typeorm'
import {UserEntity} from './user-entity'
import {createConnection, composeFindOptions} from '../../pagination'
import {UserConnection} from './user-connection'

@Resolver()
export class UsersResolver {
  private usersRepository = getRepository(UserEntity)

  @Query(() => UserConnection)
  public async users(
    @Arg('first', {nullable: true}) first: number = 10,
    @Arg('after', {nullable: true}) after: string
  ): Promise<UserConnection> {
    const findOptions = composeFindOptions(first, after)
    const users = await this.usersRepository.find(findOptions)
    return createConnection(users, first)
  }
}
