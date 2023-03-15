import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { UserInfo } from "../entities/User";
import { ProductInfo } from "../entities/Product";
import { hash, compare } from "bcryptjs";
import { MyContext } from "../MyContext";
import { createRefreshToken, createAccessToken } from "../auth";
import { isAuth } from "../isAuthMiddleware";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

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

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    return `your userId is: ${payload!.userId}`;
  }
  @Query(() => [ProductInfo], { nullable: true })
  async getProductsByUserId(
    @Arg("userId", () => Int) userId: number
  ): Promise<ProductInfo[] | null> {
    const products = await ProductInfo.find({
      where: { userId: { id: userId } },
      relations: ["userId"],
    });
    return products.length > 0 ? products : null;
  }

  @Query(() => [ProductInfo], { nullable: true })
  async getProductsOwned(
    @Arg("ownerId", () => Int) ownerId: number
  ): Promise<ProductInfo[] | null> {
    const products = await ProductInfo.find({
      where: { ownerId: ownerId },
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

  @Mutation(() => LoginResponse)
  async loginJWT(
    @Arg("email", () => String)
    email: string,
    @Arg("password", () => String)
    password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse | null> {
    const user = await UserInfo.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("Bad Password!");
    }

    res.cookie("jid", createRefreshToken(user), {
      httpOnly: true,
    });
    return {
      accessToken: createAccessToken(user),
    };
  }
  @Mutation(() => Boolean)
  async createUserJWT(
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
  ): Promise<Boolean> {
    const hashedPassword = await hash(password, 12);
    try {
      await UserInfo.insert({
        firstName,
        lastName,
        address,
        phoneNumber,
        email,
        password: hashedPassword,
        isComplete: false,
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
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
  async createUser(
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
