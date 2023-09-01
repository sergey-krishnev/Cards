import { clearState } from '../utils/localstorage'

import { instance } from './instance'

export type GetCardType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number //grade
  max?: number //grade
  sortCards?: string
  page?: number
  pageCount?: number
}
export type CardsType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: Date
  updated: Date
  _id: string
}
export type GetCardsResponseType = {
  cards: Array<CardsType>
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}
export type PostCardType = {
  cardsPack_id: string
  question?: string // если не отправить будет таким "no question"
  answer?: string // если не отправить будет таким 'no answer'
  grade?: number // 0..5, не обязателен
  shots?: number // не обязателен
  answerImg?: string // не обязателен
  questionImg?: string // не обязателен
  questionVideo?: string // не обязателен
  answerVideo?: string // не обязателен
}
export type AddCardType = {
  card: PostCardType
}
export type DeleteCardType = {
  id: string
}
export type PutCardType = {
  _id: string
  question?: string
  answer?: string
  comments?: string
}
export type UpdateCardType = {
  card: PutCardType
}
export type UpdateGradeType = {
  grade: number
  card_id: string
}

export const CardsAPI = {
  getCards: (args: GetCardType) => {
    try {
      return instance
        .get<GetCardsResponseType>('/cards/card', { params: args })
        .then(res => res.data)
    } catch {
      clearState()
    }
  },
  addCard: (args: AddCardType) => {
    return instance.post('/cards/card', args).catch(() => clearState())
  },
  deleteCard: (args: DeleteCardType) => {
    return instance.delete(`/cards/card`, { params: args }).catch(() => clearState())
  },
  updateCard: (args: UpdateCardType) => {
    return instance.put('/cards/card', args).catch(() => clearState())
  },
  updateCardGrade: (args: UpdateGradeType) => {
    return instance.put('cards/grade', args).catch(() => clearState())
  },
}

// То, что приходит с бэка в результате setCard, deleteCard, updateCard - игнорируем
// и перезапрашиваем карточки заново
