import {Resolver, Query, Arg} from 'type-graphql'
import {createConnection} from '../../pagination'
import {UserConnection} from './user-connection'
import {UserService} from './user-service'

@Resolver()
export class UserResolver {
  private userService = new UserService()

  @Query(() => UserConnection)
  public async users(
    @Arg('first', {nullable: true}) first: number = 10,
    @Arg('after', {nullable: true}) after: string
  ) {
    const users = await this.userService.findUsers(first, after)
    return createConnection(users, first)
  }
}
