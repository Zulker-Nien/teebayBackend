import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { UserInfo } from "../entities/User";
import { ProductInfo } from "../entities/Product";

@Resolver()
export class UserResolver {
  @Query(() => [UserInfo])
  getAllUsers(): Promise<UserInfo[]> {
    return UserInfo.find({});
  }

  @Query(() => UserInfo, { nullable: true })
  getUser(
    @Arg("id", () => Int)
    id: number
  ): Promise<UserInfo | null> {
    return UserInfo.findOneBy({ id });
  }

  @Query(() => [ProductInfo], { nullable: true })
  async getProductsByUserId(
    @Arg("userId", () => Int) userId: number
  ): Promise<ProductInfo[] | null> {
    const products = await ProductInfo.find({
      where: { userId: userId },
      relations: ["userId"],
    });
    return products.length > 0 ? products : null;
  }

  @Query(() => UserInfo, { nullable: true })
  loginUser(
    @Arg("email", () => String)
    email: string,
    @Arg("password", () => String)
    password: string
  ): Promise<UserInfo | null> {
    return UserInfo.findOneBy({ email, password });
  }
  @Mutation(() => UserInfo, { nullable: true })
  async login(
    @Arg("email", () => String)
    email: string,
    @Arg("password", () => String)
    password: string
  ): Promise<UserInfo | null> {
    const user = await UserInfo.findOneBy({
      email: email,
      password: password,
    });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    return user;
  }

  @Mutation(() => UserInfo)
  createUser(
    @Arg("firstName", () => String)
    firstName: string,
    @Arg("lastName", () => String)
    lastName: string,
    @Arg("address", () => String)
    address: string,
    @Arg("email", () => String)
    email: string,
    @Arg("phoneNumber", () => String)
    phoneNumber: string,
    @Arg("password", () => String)
    password: string
  ): Promise<UserInfo> {
    return UserInfo.create({
      firstName,
      lastName,
      address,
      email,
      phoneNumber,
      password,
      isComplete: false,
    }).save();
  }

  @Mutation(() => Boolean)
  deleteUser(
    @Arg("id", () => Int)
    id: number
  ): boolean {
    try {
      UserInfo.delete({ id });
      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  updateUser(
    @Arg("id", () => Int)
    id: number,
    @Arg("isComplete", () => Boolean)
    isComplete: boolean
  ): boolean | null {
    const user = UserInfo.findOneBy({ id });
    if (!user) {
      return null;
    }
    try {
      UserInfo.update({ id }, { isComplete });
      return true;
    } catch {
      return false;
    }
  }
}
