import { FeedStock } from "../interfaces/feedstock";
import { Api } from "./api"

export type FindPageFeedstockResponse = Pick<FeedStock, 'id' | 'provider' | 'amount'>;

type Page<T> = {
  data: T[];
  total?: number;
};

export class FeedStockService {
  static async addFeedstock(feedStock: Omit<FeedStock, 'id'>) {
    await new Api().post('/feedstock', feedStock)
  }

  static async findMany(query?: string): Promise<Page<FeedStock>> {
    return await new Api().get(`/feedstock${query}`);
  }

  static async findOne(id: number): Promise<FeedStock> {
    return await new Api().get(`/feedstock/${id}`);
  }

  static async updateFeedstock(id: number, person: Omit<FeedStock, "id">) {
    await new Api().put(`/feedstock/${id}`, person);
  }

  static async deleteFeedstock(id: number) {
    await new Api().delete(`/feedstock/${id}`);
  }
}