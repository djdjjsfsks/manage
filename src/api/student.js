import request from "@/utils/request";


//获得总学生列表
export const StudentList=()=>{
  return request.get('/student')
}

//删除学生
export const DeleteById=(id)=>{
  return request.delete(`/student/${id}`)
}

//添加学生
export const AddClass=(obj)=>{
  const {stu_id,stu_name,stu_gender,stu_class,interTime}=obj
  return request.post('/student',{
    stu_id:stu_id,
    stu_name:stu_name,
    stu_gender:stu_gender,
    stu_class:stu_class,
    interTime:interTime
  })
}

//修改学生
export const UpdateStu=(stu_id,stu_class)=>{
  return request.post('/student/add',{
    params:{
      stu_id:stu_id,
      stu_class:stu_class
    }
  })
}

//查找指定id的学生

export const findById_stu=(id)=>{
  return request.post(`/student/find/${id}`)
}