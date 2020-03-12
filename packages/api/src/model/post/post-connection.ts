import {ObjectType} from 'type-graphql'
import {ConnectionContainer} from '../../pagination'
import {PostEntity} from './post-entity'

@ObjectType()
export class PostConnection extends ConnectionContainer('Post', PostEntity) {
}
