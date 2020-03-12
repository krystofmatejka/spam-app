import {ObjectType} from 'type-graphql'
import {ConnectionContainer} from '../../pagination'
import {UserEntity} from './user-entity'

@ObjectType()
export class UserConnection extends ConnectionContainer('User', UserEntity) {
}
