import deptReducers from './modules/deptStore'
import { configureStore } from '@reduxjs/toolkit'

const store=configureStore({
  reducer:{
    dept:deptReducers,
  }
})

export default store
