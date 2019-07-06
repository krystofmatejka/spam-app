import { ObjectType } from 'type-graphql'
import { ConnectionContainer } from '../../../pagination/ConnectionContainer'
import { UserEdge } from './UserEdge'

@ObjectType()
export class UserConnection extends ConnectionContainer(UserEdge) {}
