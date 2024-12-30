import request from "@/utils/request";

export const getClassList=()=>{
  return request.get('/class')
}

export const deleteById=(id)=>{
  return request.delete(`/class/${id}`)
}

export const insertClass=(obj)=>{
  const  {name,classteacher,teacher_id}=obj
  return request.post('/class/add',{
    name:name,
    classteacher:classteacher,
    teacher_id:teacher_id,
    number:0
  })
}

export const updateById=(obj)=>{
  const {id,name,classteacher,teacher_id,number}=obj 
  return request.post('/class/update',{
    id:id,
    name:name,
    classteacher:classteacher,
    teacher_id:teacher_id,
    number:number
  })
}

export const getById=(id)=>{
  return request.post(`/class/${id}`)
}