import { Button, Input, Modal, Select, Table } from "antd"
import {deleteById,insertClass,updateById,getById} from '@/api/class'
import {store_getEmpList,store_getClassList,store_getStudentList} from '@/store/modules/deptStore'
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { useDispatch, useSelector } from "react-redux"



const getCreate_time=(create_time)=>{
  return dayjs(create_time).format("YYYY-MM-DD HH:mm:ss")
}




const { Option } = Select

const CalssManage=()=>{

  
  const optins=[
    {
      title:'ID',
      key:'id',
      dataIndex:'id',
      render:(text,record,index)=><span>{index+1}</span>
    },
    {
      title:'班级',
      key:'id',
      dataIndex:'name'
    },
    {
      title:'班主任',
      key:'id',
      dataIndex:'classteacher'
    },
    {
      title:'创建时间',
      key:'id',
      dataIndex:'create_time',
      render:(create_time)=><span>{getCreate_time(create_time)}</span>
    },
    {
      title:'人数',
      key:'id',
      dataIndex:'name',
      render:(name)=><span>{studentList.length}</span>
    },
    {
      title:'操作',
      key:'id',
      render:(id)=><div>
        <Button type="primary" onClick={()=>openModal(id)}>修改</Button>
        <Button type="primary" danger onClick={()=>deleteClass(id)}>删除</Button>
      </div>
    }
  ]
  

  const [a,setA]=useState(1)

  const [isModal,setIsModal]=useState(false)

  const dispatch=useDispatch()

  const  emplist  = useSelector(state => state.dept.empList)
  const ClassList = useSelector(state => state.dept.classList)
  const studentList = useSelector(state => state.dept.studentList)

  
  useEffect(()=>{  
    dispatch(store_getClassList())
    dispatch(store_getStudentList())
    dispatch(store_getEmpList())
  },[a])

  const [number,setnumber]=useState([])

  const getNumber=(name)=>{
    setnumber(studentList.filter(item=>item.stu_class===name))
    console.log(number.length)
    return number.length
  }


  //删除数据
  const deleteClass=async (id)=>{
    await deleteById(id.id)
    setA(a+1)
  }

  const [classObjcopy,setclassObjcopy]=useState({
    id:'',
    name:'',
    classteacher:'',
    teacher_id:'',
    number:''
   })
   const [classObj,setclassObj]=useState({
    id:'',
    name:'',
    classteacher:'',
    teacher_id:'',
    number:''
   })
  const openModal=async (id)=>{
    const {data:{data}}=await getById(id.id)
    setclassObj(prevalue=>({...prevalue,id:data.id}))
    setclassObj(prevalue=>({...prevalue,name:data.name}))
    setclassObj(prevalue=>({...prevalue,classteacher:data.classteacher}))
    setclassObj(prevalue=>({...prevalue,teacher_id:data.teacher_id}))

    setIsModal(true)
  }

 const updateClass=async()=>{
    if(classObj.id==='' || classObj.id===null){
      await insertClass(classObj) 
      setIsModal(false) 
      setA(a+1)
      setclassObj(classObjcopy)
    }else{
      await updateById(classObj) 
      setIsModal(false) 
      setA(a+1)
      setclassObj(classObjcopy)
    }
    
 }

  return (
    <div>
        <Button type="primary"  onClick={()=>setIsModal(true)}>+新增</Button>
        <p></p>
        <Table  pagination={false} columns={optins} dataSource={ClassList}></Table>
        <Modal title="编辑" open={isModal} onOk={()=>updateClass()} onCancel={()=>setIsModal(false)} >
          
          <ul style={{listStyle:"none"}}>
          班主任
            <li>
            <Select onChange={(e)=>setclassObj(prevalue=>({...prevalue,teacher_id:e,classteacher:e}))} value={classObj.classteacher} style={{width:'80%'}}>
                {emplist.map(item=><Option  value={item.id}>{item.name}</Option>)}
            </Select>
            </li>
          班级
            <li>
              <Input value={classObj.name} onChange={(e)=>setclassObj(prevalue=>({...prevalue,name:e.target.value}))}  style={{width:'80%'}} placeholder="请输入班级名称"></Input>
            </li>
          </ul>
         
          
        </Modal>
        
    </div>
  )
}

export default CalssManage