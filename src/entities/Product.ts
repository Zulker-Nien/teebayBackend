import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserInfo } from "./User";

@Entity()
@ObjectType()
export class ProductInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @CreateDateColumn()
  @Field(() => Date)
  created: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated: Date;

  @Column()
  @Field(() => String)
  title: string;

  @Column("simple-array")
  @Field(() => [String])
  categories: string[];

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => Int)
  rentPrice: number;

  @Column()
  @Field(() => String)
  option: string;

  @ManyToOne(() => UserInfo, (userId) => userId.products)
  @Field(() => Int)
  userId: UserInfo;

  @Column()
  @Field(() => Boolean)
  isComplete: boolean;
}
