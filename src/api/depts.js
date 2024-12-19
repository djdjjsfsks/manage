import request from "@/utils/request";


//获取部门列表
export const getDeptList=()=>{
  return request.get('/depts')
}

//删除指定部门
export const deleteById=(id)=>{
  return request.delete(`/depts/${id}`)
}


//添加部门
export const addDeptName=(name)=>{
  return request.post('/depts',{
    name:name
  })
}


