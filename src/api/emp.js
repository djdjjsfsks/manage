import request from "@/utils/request";


//获取员工列表
export const getEmpList= (currentPage,pagesize,name,gender,begin,end)=>{
  return request.get('/emps',{
    params:{
      page:currentPage,
      pageSize:pagesize,
      name:name,
      gender:gender,
      begin:begin,
      end:end
    }
  })
}

//删除指定用户
export const deleteEmp=(List)=>{
  return request.delete(`/emps/${List}`)
}

// 添加用户
export const addEmp=(sumbit)=>{
  const {username,name,gender,image,job,entrydate,dept_id}=sumbit
  return request.post('/emps/add',{
    username:username,
    name:name,
    gender:gender,
    image:image,
    job:job,
    entrydate:entrydate,
    dept_id:dept_id
  })
}

//根据指定的id查找用户信息
export const findEmpByID=(id)=>{
  return request.post(`/emps/getid/${id}`)
}

//将修改后的数据保存起来
export const updateEmpById=(obj)=>{
  const {id,username, name, gender, image, job, entrydate, dept_id, create_time, update_time}=obj
  return request.post('/emps/update',{
    id:id,
    username:username,
    name:name, 
    gender:gender, 
    image:image,
    job:job, 
    entrydate:entrydate, 
    dept_id:dept_id, 
    create_time:create_time, 
    update_time:update_time
  })
}
