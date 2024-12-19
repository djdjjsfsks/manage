import { Button, DatePicker, Input, Select,Table , Checkbox, Image, Affix } from "antd"
import './index.scss'
import React, { useEffect, useState } from "react";
import { getEmpList } from "@/api/emp";
import { data } from "react-router-dom";
import dayjs from "dayjs";

const option=[
  {
    value:'1',
    label:'男'
  },
  {
    value:'2',
    label:'女'
  }
]
const { RangePicker } = DatePicker;

const coulmn=[
  {
    title:(
      <Checkbox>
      </Checkbox>
    ),
    dataIndex:'id',
    render:(id,record)=>
    <Checkbox></Checkbox>
    
  },
  {
    title:'姓名',
    dataIndex:'name',
    key:'id'
  },
  {
    title:'头像',
    dataIndex:'image',
    render:(image)=><Image width={50} height={50} fallback={image} src='error'></Image>,
    key:'id'
  },
  {
    title:'性别',
    dataIndex:'gender',
    key:'id',
    render:(gender)=><span>{gender===1?'男':'女'}</span>
  },
  // 1 班主任 , 2 讲师 , 3 学工主管 , 4 教研主管 , 5 咨询师
  {
    title:'职位',
    dataIndex:'job',
    key:'id',
    render:(job)=><span>{getJob(job)}</span>
  },
  {
    title:'入职日期',
    dataIndex:'entrydate',
    key:'id'
  },
  {
    title:'最后操作时间',
    dataIndex:'update_time',
    key:'id',
    render:(update_time)=><span>{getUpdate_time(update_time)}</span>
  },
  {
    title:'操作',
    render:()=><div>
      <Button type="primary">编辑</Button>
      <Button type="primary" danger>删除</Button>
    </div>
  }
]


const getUpdate_time=(update_time)=>{
  return dayjs(update_time).format("YYYY-MM-DD HH:mm:ss")
}

//判断职员的职位
const getJob=(job)=>{
  if(job===1){
    return '班主任'
  }else if(job===2){
    return '讲师'
  }else if(job===3){
    return '学管主任'
  }else if(job===4){
    return '教研主任'
  }else if(job===5){
    return '咨询师'
  }
}
const EmpManage=()=>{

  const [empList,setempLIst] = useState([])


  useEffect(()=>{
    const fetchGet=async ()=>{
      const res=await getEmpList()
      setempLIst(res.data.data.rows)
      console.log(empList)
    }
    fetchGet()
  },[])
  const SelectDate=(e)=>{
    console.log(e)
  }
  return (
    <div className="emp">
      <span>姓名：</span>
       <Input className="input_text" placeholder="请输入员工姓名"></Input>
      <span>性别：</span>
        <Select className="input_text" placeholder='请选择' options={option}></Select>
        <span>入职日期：</span>
        <RangePicker onChange={e=>SelectDate(e)} />    
        <Button type="primary" className="button">查询</Button>
        <br></br>
        <Button type="primary" className="button double-button" >新增</Button>
        <Button type="primary" className="button double-button" danger>删除</Button>

        
        <Table bordered className="table" dataSource={empList} columns={coulmn}/>
       
        
        
    </div>
  )
}

export default EmpManage