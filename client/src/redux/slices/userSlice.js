import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    item: []
  },
  reducers: {
    addItem: (state, action) => {
      state.item.push(action.payload)
    },
    deleteItem: (state) => {
      state.item = []
    },
  },
})

export const { addItem, deleteItem } = userSlice.actions;
export const selectUser = state => state.user.item;

export default userSlice.reducer