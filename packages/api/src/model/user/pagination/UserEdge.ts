import { ObjectType } from 'type-graphql'
import { EdgeContainer } from '../../../pagination/EdgeContainer'
import { UserEntity } from '../UserEntity'

@ObjectType()
export class UserEdge extends EdgeContainer(UserEntity) {}
