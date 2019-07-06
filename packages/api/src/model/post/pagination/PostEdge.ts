import { ObjectType } from 'type-graphql'
import { PostEntity } from '../PostEntity'
import { EdgeContainer } from '../../../pagination/EdgeContainer'

@ObjectType()
export class PostEdge extends EdgeContainer(PostEntity) {}
