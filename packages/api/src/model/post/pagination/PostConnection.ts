import { ObjectType } from 'type-graphql'
import { ConnectionContainer } from '../../../pagination/ConnectionContainer'
import { PostEdge } from './PostEdge'

@ObjectType()
export class PostConnection extends ConnectionContainer(PostEdge) {}
