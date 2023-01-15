import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { urls } from '../constants'

export const getHouses = createAsyncThunk('houses/getHouses', async () => {
  const response = await fetch(urls.houses)
  const data = await response.json()
  return data
})

const initialState = {
  reqStatus: 'loading', // Guardaria un isError, isSuccess, etc... para que sea más fácil de leer y usar. El loading, success ,etc... deberían guardarse en una constante
  houses: {
    byId: {},
    allIds: [],
    types: [],
    byType: {}, // innecesarios
    activeType: null,
    cities: [],
    byCity: {}, // innecesarios
    activeCity: null,
  },
}

export const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    // por convención y legibilidad, setType y setCity
    updateActiveType(state, action) {
      state.houses.activeType = action.payload
    },
    updateActiveCity(state, action) {
      state.houses.activeCity = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHouses.pending, (state) => {
      state.reqStatus = 'initial'
    })
    builder.addCase(getHouses.fulfilled, (state, action) => {
      state.reqStatus = 'success'
      action.payload.forEach((house) => {
        state.houses.byId[house.id] = house
        if (!state.houses.allIds.includes(house.id)) {
          state.houses.allIds.push(house.id)
        }
        // City
        if (!state.houses.cities.includes(house.city)) {
          state.houses.cities.push(house.city)
        }
        if (!(house.city in state.houses.byCity)) {
          state.houses.byCity[house.city] = []
        }
        if (!state.houses.byCity[house.city].includes(house.id)) {
          state.houses.byCity[house.city].push(house.id)
        }
        // Type
        if (!state.houses.types.includes(house.type)) {
          state.houses.types.push(house.type)
        }
        if (!(house.type in state.houses.byType)) {
          state.houses.byType[house.type] = []
        }
        if (!state.houses.byType[house.type].includes(house.id)) {
          state.houses.byType[house.type].push(house.id)
        }
      })
    })
    builder.addCase(getHouses.rejected, (state) => {
      state.reqStatus = 'failed'
    })
  },
})

// Action creators are generated for each case reducer function
export const { updateActiveType, updateActiveCity } = housesSlice.actions

export default housesSlice.reducer
