export type FeedStock = {
  id: number
  name: string
  suppliesType: string
  provider: string
  unit: string
  amount?: number | null
  validity?: Date | null
  products?: number[]
}