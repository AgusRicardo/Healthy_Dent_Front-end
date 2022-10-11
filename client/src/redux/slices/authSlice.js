import { createSlice } from '@reduxjs/toolkit'

const UserAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem('isAuth')

  if (isAuth && JSON.parse(isAuth) === true) {
      localStorage.removeItem('isAuth') // Cuando tiras F5 no te vuelve a loguear, por el momento lo dejo asi
  }else {
    return false
  }
}

const initialState = {
  isAuth: UserAuthFromLocalStorage(),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state, values) => {
      state.isAuth = {
        status: true,
        values
      }
    },
    unauthenticateUser: (state) => {
      state.isAuth = {
        status: false
      }
    },
  },
})

export const { authenticateUser, unauthenticateUser } = authSlice.actions

export default authSlice.reducer