import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductInfo } from "./Product";

@Entity()
@ObjectType()
export class UserInfo extends BaseEntity {
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
  firstName: string;

  @Column()
  @Field(() => String)
  lastName: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  phoneNumber: string;

  @Column()
  @Field(() => String)
  password: string;

  @OneToMany(() => ProductInfo, (product) => product.userId)
  @Field(() => [ProductInfo])
  products: ProductInfo[];

  @Column()
  @Field(() => Boolean)
  isComplete: boolean;
}
