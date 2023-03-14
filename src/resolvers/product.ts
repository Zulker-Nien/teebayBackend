import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { ProductInfo } from "../entities/Product";

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
  addProduct(
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
    userId: number
  ): Promise<ProductInfo> {
    return ProductInfo.create({
      title,
      categories,
      description,
      price,
      rentPrice,
      option,
      isComplete: false,
      userId,
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
    @Arg("isComplete", () => Boolean)
    isComplete: boolean
  ): boolean | null {
    const product = ProductInfo.findOneBy({ id });
    if (!product) {
      return null;
    }
    try {
      ProductInfo.update({ id }, { isComplete });
      return true;
    } catch {
      return false;
    }
  }
}
