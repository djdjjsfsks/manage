import { Button, DatePicker, Input, Select,Table } from "antd"
import './index.scss'
import { CalendarOutlined } from "@ant-design/icons";
import { useState } from "react";

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

const EmpManage=()=>{

  const [date,setDate] = useState('')

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
        <Button type="primary" className="button double-button">新增</Button>
        <Button type="primary" className="button double-button" danger>删除</Button>
        <Table bordered className="table" ></Table>
    </div>
  )
}

export default EmpManage