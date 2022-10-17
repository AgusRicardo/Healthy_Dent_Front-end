import { createSlice } from '@reduxjs/toolkit'

export const turnSlice = createSlice({
  name: 'turn',
  initialState: {
    item: ""
  },
  reducers: {
    addTurn: (state, action) => {
      state.item = action.payload
    },
    deleteTurn: (state) => {
      state.item = ""
    },
  },
})

export const { addTurn, deleteTurn } = turnSlice.actions;
export const selectTurn = state => state.turn.item;

export default turnSlice.reducer