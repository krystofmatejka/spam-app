import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import {Field, ID, ObjectType} from 'type-graphql'

@Entity()
@ObjectType()
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  public id: number

  @Column()
  @Field()
  public email: string
}
