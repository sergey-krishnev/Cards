import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  CardsPackType,
  DeleteCardsPackType,
  GetCardsType,
  PacksAPI,
  SetCardsPackType,
  UpdateCardsPackType,
} from '../../API/packAPI.ts'
import { clearState } from '../../utils/localstorage'
import { RootState } from '../store'

export const getPacks = createAsyncThunk(
  'packs/getPacks',
  async (payload: GetCardsType, { getState }) => {
    const state = getState() as RootState
    let params = new URL(document.location.href.replace('#', '/')).searchParams

    let url_user_id = params.get('userId')

    console.log(url_user_id)
    const { isPersonalCardsPack, pageCount, page, sortPacks } = state.packs
    const user_id = state.user.user?._id || false
    const packName = state.packs.search
    const finalPayload = {
      pageCount,
      page,
      sortPacks,
      ...payload,
    }

    isPersonalCardsPack && user_id && (finalPayload.user_id = user_id)
    packName && (finalPayload.packName = packName)
    url_user_id && (finalPayload.user_id = url_user_id)

    return await PacksAPI.getPacks({
      ...finalPayload,
    })
  }
)
export const addPack = createAsyncThunk(
  'packs/addPack',
  async (payload: SetCardsPackType, { dispatch }) => {
    return await PacksAPI.addPack({ ...payload }).then(() => dispatch(getPacks({})))
  }
)
export const updatePack = createAsyncThunk(
  'packs/updatePack',
  async (payload: UpdateCardsPackType, { dispatch }) => {
    return await PacksAPI.updatePack({ ...payload }).then(() => {
      dispatch(getPacks({}))
    })
  }
)
export const deletePack = createAsyncThunk(
  'packs/deletePack',
  async (payload: DeleteCardsPackType) => {
    return await PacksAPI.deletePack({ ...payload })
  }
)

type InitialStateType = {
  cardPacks: Array<CardsPackType>
  cardPacksTotalCount: number
  maxCardsCount?: number
  maxCards?: number
  minCards?: number
  page: number
  pageCount: number
  cardsPackName: string
  isPersonalCardsPack: boolean | null
  nameCards: string
  isLoading: boolean
  search?: string | undefined
  sortPacks: string
}

const getCardsPackSlice = createSlice({
  name: 'cards',
  initialState: {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCards: 0,
    maxCards: 1000,
    page: 1,
    pageCount: 10,
    cardsPackName: '',
    isPersonalCardsPack: null,
    nameCards: '',
    isLoading: false,
    sortPacks: '0updated',
  } as InitialStateType,
  reducers: {
    updatedSortPacks: (state, action: PayloadAction<{ sortPacks: string }>) => {
      state.sortPacks = action.payload.sortPacks
    },
    updatedPackTitle: (state, action: PayloadAction<{ cardsPackName: string }>) => {
      state.cardsPackName = action.payload.cardsPackName
    },
    updatedMinMax: (
      state,
      action: PayloadAction<{
        minCardsCount: number
        maxCardsCount: number
      }>
    ) => {
      state.minCards = action.payload.minCardsCount
      state.maxCards = action.payload.maxCardsCount
    },
    updatedPage: (state, action: PayloadAction<{ page: number }>) => {
      state.page = action.payload.page
    },
    updatedPageCount: (state, action: PayloadAction<{ pageCount: number }>) => {
      state.pageCount = action.payload.pageCount
    },
    updatedSearch: (state, action: PayloadAction<{ search: string }>) => {
      state.search = action.payload.search
    },
    addedPack: (state, action: PayloadAction<CardsPackType>) => {
      state.cardPacks.push(action.payload)
    },
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading
    },
  },
  extraReducers: builder => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.cardPacks = action.payload.cardPacks
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount
      state.page = action.payload.page
      state.pageCount = action.payload.pageCount
      state.isLoading = false
      state.maxCardsCount = action.payload.maxCardsCount
    })
    builder.addCase(getPacks.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getPacks.rejected, state => {
      state.isLoading = false
      clearState()
    })
  },
})

export const packsReducer = getCardsPackSlice.reducer
export const packsActions = getCardsPackSlice.actions
export const packsThunks = {
  getPacks,
  addPack,
  deletePack,
  updatePack,
}
export const selectPacks = (state: RootState) => state.packs
