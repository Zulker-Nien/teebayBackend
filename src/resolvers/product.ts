import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { ProductInfo } from "../entities/Product";
import { UserInfo } from "../entities/User";

@Resolver()
export class ProductResolver {
  @Query(() => [ProductInfo])
  getAllProducts(): Promise<ProductInfo[]> {
    return ProductInfo.find({});
  }

  @Query(() => ProductInfo, { nullable: true })
  getProduct(
    @Arg("id", () => Int)
    id: number
  ): Promise<ProductInfo | null> {
    return ProductInfo.findOneBy({ id });
  }

  @Mutation(() => ProductInfo)
  async addProduct(
    @Arg("title", () => String)
    title: string,
    @Arg("categories", () => [String])
    categories: string[],
    @Arg("description", () => String)
    description: string,
    @Arg("price", () => Int)
    price: number,
    @Arg("rentPrice", () => Int)
    rentPrice: number,
    @Arg("option", () => String)
    option: string,
    @Arg("userId", () => Int)
    userId: UserInfo,
    @Arg("status", () => String)
    status: string,
    @Arg("ownerId", () => Int)
    ownerId: number
  ): Promise<ProductInfo> {
    return ProductInfo.create({
      title,
      categories,
      description,
      price,
      rentPrice,
      option,
      isComplete: true,
      userId,
      status: "Available",
      ownerId,
    }).save();
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Arg("id", () => Int)
    id: number
  ): boolean {
    try {
      ProductInfo.delete({ id });
      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  updateProduct(
    @Arg("id", () => Int)
    id: number,
    @Arg("title", () => String)
    title: string,
    @Arg("categories", () => [String])
    categories: string[],
    @Arg("description", () => String)
    description: string,
    @Arg("price", () => Int)
    price: number,
    @Arg("rentPrice", () => Int)
    rentPrice: number,
    @Arg("option", () => String)
    option: string
  ): boolean | null {
    const product = ProductInfo.findOneBy({ id });
    if (!product) {
      return null;
    }
    try {
      ProductInfo.update(
        { id },
        { title, categories, description, price, rentPrice, option }
      );
      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  buyProduct(
    @Arg("id", () => Int)
    id: number,
    @Arg("status", () => String)
    status: string,
    @Arg("ownerId", () => Int)
    ownerId: number
  ): boolean | null {
    const product = ProductInfo.findOneBy({ id });
    if (!product) {
      return null;
    }
    try {
      ProductInfo.update({ id }, { status, ownerId });
      return true;
    } catch {
      return false;
    }
  }
}
