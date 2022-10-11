import { createSlice } from '@reduxjs/toolkit'

const UserAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem('isAuth')

  if (isAuth && JSON.parse(isAuth) === true) {
    return true 
  }
  
  return false
}

const initialState = {
  isAuth: UserAuthFromLocalStorage(),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state) => {
      state.isAuth = true
    },
    unauthenticateUser: (state) => {
      state.isAuth = false
    },
  },
})

export const { authenticateUser, unauthenticateUser } = authSlice.actions

export default authSlice.reducer