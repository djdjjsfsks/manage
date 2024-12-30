import { Button, Input, message, Modal, Spin, Table } from "antd"
import "./index.scss"
import { useEffect, useState } from "react"
import {deleteById,addDeptName} from '@/api/depts'
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {store_getDeptList} from '@/store/modules/deptStore'

const DeptManage=()=>{
  const deptList=useSelector(state=>state.dept.deptList)
  const [a,setA]=useState(1)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(store_getDeptList())
  },[a])
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render:(text,record,index)=><span>{index+1}</span>
    },
    {
      title: '部门',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作时间',
      dataIndex: 'update_time',
      key: 'id',
      render:(update_time)=><span>{getUpdate_time(update_time)}</span>
    },
    {
      title: '操作',
      key:'id',
      render: (id) =><Button type="primary" onClick={()=>onRowClick(id)} danger>删除</Button>
    },
  ];
  

  const onRowClick=async (id)=>{
    
    console.log(id.id)
    await  deleteById(id.id)
    message.info('删除成功')
    setA(a+1)
  }
  
  const getUpdate_time=(update_time)=>{
    return dayjs(update_time).format("YYYY-MM-DD HH:mm:ss")
  }


   //添加部门
   const [deptName,setDeptName]=useState('')
   const EntryChange=(e)=>{
    setDeptName(e.target.value)
    
   }

  //用来显示添加部门的弹窗
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    addDeptName(deptName)
    message.info('添加成功')
    setDeptName('')
    setIsModalOpen(false);
    setA(a+1)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type='primary' className="add-button" onClick={()=>showModal()}>增加部门</Button>
      
      <Modal title="添加部门" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="请输入部门名称" value={deptName} onChange={(e)=>EntryChange(e)}></Input>
      </Modal>

     <Table  pagination={false} dataSource={deptList} columns={columns}></Table>

    </div>
  )
}

export default DeptManage