import { ObjectType } from 'type-graphql'
import { ConnectionContainer } from '../../pagination/ConnectionContainer'
import { PostEntity } from './PostEntity'

@ObjectType()
export class PostConnection extends ConnectionContainer('Post', PostEntity) {}
