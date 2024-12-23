import { createSlice } from "@reduxjs/toolkit";
import {getDeptList} from '@/api/depts'

const store=createSlice({
  name:'dept',
  initialState:{
    deptList:[]
  },
  reducers:{
    //修改同步方法
    setdeptList(state,action){
      state.deptList=action.payload
    }
  }
})

const {setdeptList}=store.actions

//编写异步方法
const store_getDeptList=()=>{
  return async(dispatch)=>{
    const res=await getDeptList()

    dispatch(setdeptList(res.data.data))
  }
}

export {store_getDeptList}

const reducer=store.reducer

export default reducer