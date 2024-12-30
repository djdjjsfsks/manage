import { Button, Drawer, message, Table } from "antd"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {store_getClassList,store_getStudentList} from '@/store/modules/deptStore'
import {DeleteById,AddClass,UpdateStu,findById_stu} from '@/api/student'

const StudentManage=()=>{

  //班级渲染条目
  const column=[
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
      title:'编辑',
      dataIndex:'name',
      render:(name)=><Button type="primary" onClick={()=>showDrawer(name)}>编辑</Button>
    },
  ]

  // 学员渲染条目
  const stuColumn=[
    {
      title:'ID',
      key:'stu_id',
      dataIndex:'stu_id',
      render:(text,record,index)=><span>{index+1}</span>
    },
    {
      title:'姓名',
      key:'stu_id',
      dataIndex:'stu_name'
    },
    {
      title:'性别',
      key:'stu_id',
      dataIndex:'stu_gender',
      render:(stu_gender)=><span>{stu_gender===1?'男':'女'}</span>
    },
    {
      title:'入学时间',
      key:'stu_id',
      dataIndex:'interTime'
    },
    {
      title:'操作',
      key:'stu_id',
      dataIndex:'stu_id',
      render:(stu_id)=><div>
        <Button type="primary">编辑</Button>
        <Button type="primary" danger onClick={()=>headelDel(stu_id)}>删除</Button>
      </div>
    }
  ]

  

  const [title,setTitle]=useState('')
  const [a,setA]=useState(1)
  const dispatch=useDispatch()

  const classList = useSelector(state => state.dept.classList)
  const studentList = useSelector(state => state.dept.studentList)

  const [stulist,setStulist]=useState([])

  useEffect(()=>{   
    dispatch(store_getClassList())
    dispatch(store_getStudentList())      
  },[a])
  
  const [open, setOpen] = useState(false);

  const showDrawer = (name) => {
    setStulist(studentList.filter(item=>item.stu_class ===name))
    setTitle(name)
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const headelDel=async(stu_id)=>{
    console.log(stu_id)
    await DeleteById(stu_id)
    message.info("删除成功")
    setOpen(false)
    setA(a+1)
  }
  return (
    <div>
      <Button type="primary">+新增学生</Button>
      <p></p>
        <Table  pagination={false} dataSource={classList} columns={column}></Table>
        <Drawer title={title} width={700} onClose={onClose} open={open}>
          <Table pagination={false} dataSource={stulist} columns={stuColumn}></Table>
      </Drawer>
    </div>
  )
}

export default StudentManage