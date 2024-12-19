import request from "@/utils/request";


//获取员工列表
export const getEmpList= ()=>{
  return request.get('/emps')
}