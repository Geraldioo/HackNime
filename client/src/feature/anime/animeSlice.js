
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const animeSlice = createSlice({
  name: 'animes',
  initialState,
  reducers: {
    
  },
})

// Action creators are generated for each case reducer function
export const { } = animeSlice.actions

export default animeSlice.reducer