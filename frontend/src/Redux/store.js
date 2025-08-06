import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import excelDataReducer from './excelDataSlice'
import chartReducer from './chartSlice'

const authData = localStorage.getItem('auth')
const excel = localStorage.getItem('excel')

//parsing data form localstorage
const parsedAuth = authData ? JSON.parse(authData) : { user: null, token: '' }
const excel_data = excel ? JSON.parse(excel) : []

// 👇 Use it to preload Redux state
const preloadedState = {
  user: {
    user: parsedAuth.user,
    token: parsedAuth.token
  },
  excelData: {
    excelData:excel_data?.data || []
  }

}

export const store = configureStore({
    reducer:{
        user:userReducer,
        excelData:excelDataReducer,
        chart:chartReducer
    },
    preloadedState
});