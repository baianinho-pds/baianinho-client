export type FeedStock = {
  id: number
  name: string
  supplies_type: string
  provider: string
  unit: string
  amount?: number
  validity: string | undefined
}