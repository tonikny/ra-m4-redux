import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { urls } from '../constants'

export const getHouses = createAsyncThunk('houses/getHouses', async () => {
  const response = await fetch(urls.houses)
  const data = await response.json()
  return data
})

const initialState = {
  reqStatus: {
    status: 'initial',
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  houses: {
    byId: {},
    allIds: [],
    types: [],
    // byType: {},
    activeType: null,
    cities: [],
    // byCity: {},
    activeCity: null,
  },
}

export const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    setType(state, action) {
      state.houses.activeType = action.payload
    },
    setCity(state, action) {
      state.houses.activeCity = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHouses.pending, (state) => {
      state.reqStatus.status = 'loading'
      state.reqStatus.isError = false
      state.reqStatus.isLoading = true
      state.reqStatus.isSuccess = false
    })
    builder.addCase(getHouses.fulfilled, (state, action) => {
      state.reqStatus.status = 'success'
      state.reqStatus.isError = false
      state.reqStatus.isLoading = false
      state.reqStatus.isSuccess = true

      action.payload.forEach((house) => {
        state.houses.byId[house.id] = house
        if (!state.houses.allIds.includes(house.id)) {
          state.houses.allIds.push(house.id)
        }

        if (!state.houses.cities.includes(house.city)) {
          state.houses.cities.push(house.city)
        }

        if (!state.houses.types.includes(house.type)) {
          state.houses.types.push(house.type)
        }
      })
    })
    builder.addCase(getHouses.rejected, (state) => {
      state.reqStatus.status = 'failed'
      state.reqStatus.isError = true
      state.reqStatus.isLoading = false
      state.reqStatus.isSuccess = false
    })
  },
})

export const { setType, setCity } = housesSlice.actions

export default housesSlice.reducer
