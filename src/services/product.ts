import { Product } from "../interfaces/product";
import { Api } from "./api";

type Page<T> = {
  data: T[];
  total?: number;
};

export type FindPageResponse = Pick<Product, "id" | "name">;

export class ProductService {
  static async addProduct(product: Omit<Product, "id">) {
    await new Api().post("/product", product);
  }

  static async findMany(queryParams?: string): Promise<Page<Product>> {
    return await new Api().get(`/product?${queryParams}`);
  }

  static async findOne(id: number): Promise<Product> {
    return await new Api().get(`/product/${id}`);
  }

  static async updateProduct(id: number, product: Omit<Product, "id">) {
    await new Api().put(`/product/${id}`, product);
  }

  static async deleteProduct(id: number) {
    await new Api().delete(`/product/${id}`);
  }
}
