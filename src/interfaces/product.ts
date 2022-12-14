import { FeedStock } from "./feedstock"

export interface Product {
    id: number
    name: string
    batchCode: number
    grammage: number
    quantity: number
    price: number
    productionDate: Date | null
    expirationDate: Date | null
    feedstocks: FeedStock[]
}