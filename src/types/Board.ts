import { CardType } from "./Card"

export type BoardType = {
    id: number
    title: string
    user_id: number
    created_at: Date
    updated_at: Date
    
  }

export type BoardIdType = BoardType & {
  cards: CardType[]
}

export interface BoardIdResponse {
  data?: BoardIdType
  error?: string
}

export interface BoardResponse {
  data?: BoardType[]
  error?: string
}
  