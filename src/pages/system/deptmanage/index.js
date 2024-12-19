import { Button, Input, message, Modal, Spin, Table } from "antd"
import "./index.scss"
import { useEffect, useState } from "react"
import {getDeptList,deleteById,addDeptName} from '@/api/depts'
import Column from "antd/es/table/Column";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

// const columns = [
//   {
//     title: 'ID',
//     dataIndex: 'id',
//     key: 'id',
//   },
//   {
//     title: '部门',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: '创建时间',
//     dataIndex: 'create_time',
//     key: 'create_time',
//   },
//   {
//     title: '修改时间',
//     dataIndex: 'update_time',
//     key: 'update_time',
//   },
//   {
//     title: 'Action',
//     dataIndex: '',
//     key: 'x',
//     render: () =><Button type="primary" danger>删除</Button>
//   },
// ];




const DeptManage=()=>{
  
  const [List,setList] =useState([])
  const [a,seta]=useState(1)


  useEffect(()=>{
    const fetchGet=async ()=>{
      const res=await getDeptList()
      setList(res.data.data)
      
    }
    setTimeout(()=>{
      
      fetchGet()

    },500)
  },[a])
    
  
  const onRowClick=async (record,rowIndex)=>{
    seta(a+1)
    await deleteById(record.id)
    message.info('删除成功')
    
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
    seta(a+1)
    message.info('添加成功')
    setDeptName('')
    setIsModalOpen(false);
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

      <Table dataSource={List} onRow={(record,rowIndex)=>({
        onClick:()=>onRowClick(record,rowIndex),
      })}>
        {/* <Column title='id' dataIndex='id'></Column> */}
        <Column title='部门' dataIndex='name' key='name'></Column>
        <Column title='操作时间' dataIndex='update_time' key='update_time'></Column>
        <Column title='编辑'  render={()=><Button type="primary" danger>删除</Button>}>
          
        </Column>
      </Table>

    </div>
  )
}

export default DeptManage