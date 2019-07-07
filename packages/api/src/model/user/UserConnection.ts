import { ObjectType } from 'type-graphql'
import { ConnectionContainer } from '../../pagination/ConnectionContainer'
import { UserEntity } from './UserEntity'

@ObjectType()
export class UserConnection extends ConnectionContainer('User', UserEntity) {}
