import { createSlice } from "@reduxjs/toolkit";
import {getDeptList} from '@/api/depts'
import {getEmpAll} from '@/api/emp'
import {getClassList} from '@/api/class'
import {StudentList} from '@/api/student'
const store=createSlice({
  name:'dept',
  initialState:{
    deptList:[],
    empList:[],
    classList:[],
    studentList:[]
  },
  reducers:{
    //修改同步方法
    setdeptList(state,action){
      state.deptList=action.payload
    },
    setEmpList(state,action){
      state.empList=action.payload
    },
    setClassList(state,action){
      state.classList=action.payload
    },
    setStudentList(state,action){
      state.studentList=action.payload
    }
  }
})

const {setdeptList,setEmpList,setClassList,setStudentList}=store.actions


//编写异步方法
const store_getDeptList=()=>{
  return async(dispatch)=>{
    const res=await getDeptList()

    dispatch(setdeptList(res.data.data))
  }
}

const store_getEmpList=()=>{
    return async(dispatch)=>{
      const {data:{data}} = await getEmpAll()
      dispatch(setEmpList(data))
    }
}
const store_getClassList=()=>{
  return async(dispatch)=>{
    const {data:{data}} = await getClassList()
    dispatch(setClassList(data))
  }
}

const store_getStudentList=()=>{
  return async(dispatch)=>{
    const {data:{data}} = await StudentList()
    dispatch(setStudentList(data))
  }
}

export {store_getDeptList,store_getEmpList,store_getClassList,store_getStudentList}

const reducer=store.reducer

export default reducer