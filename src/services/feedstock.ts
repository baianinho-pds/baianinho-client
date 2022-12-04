import { Api } from "./api"

export type FeedStock = {
  id: number
  name: string
  supplies_type: string
  provider: string
  unit: string
  amount?: number
  validity?: string
}

export class FeedStockService {
  static async addFeedstock(feedStock: Omit<FeedStock, 'id'>) {
    await new Api().post('/feedstock', feedStock)
  }
}