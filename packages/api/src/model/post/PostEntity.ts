import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class PostEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  public id: number

  @Column()
  @Field()
  public text: string

  @ManyToOne(() => PostEntity, (post) => post.children, { lazy: true })
  @Field(() => PostEntity, { nullable: true })
  public parent: PostEntity

  @OneToMany(() => PostEntity, (post) => post.parent, { lazy: true })
  @Field(() => [ PostEntity ])
  public children: PostEntity[]
}
