import { Product } from "./product"

export type FeedStock = {
  id: number
  name: string
  suppliesType: string
  provider: string
  unit: string
  products: Product[]
  amount?: number | null
  validity?: Date | null
}