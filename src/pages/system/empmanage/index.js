import { Button, DatePicker, Input, Select, Table, Image, message, Modal, Upload, Form, Pagination } from "antd"
import './index.scss'
import React, { useEffect, useState } from "react";
import { getEmpList, deleteEmp, addEmp,findEmpByID,updateEmpById } from "@/api/emp";
import dayjs from "dayjs";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { store_getDeptList } from '@/store/modules/deptStore'


const { Option } = Select

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const option = [
  {
    value: '',
    label: ''
  },
  {
    value: '1',
    label: '男'
  },
  {
    value: '2',
    label: '女'
  }
]

const optionJob = [
  {
    value: '1',
    label: '班主任'
  },
  {
    value: '2',
    label: '讲师'
  },
  {
    value: '3',
    label: '学管主任'
  },
  {
    value: '4',
    label: '教研主任'
  },
  {
    value: '5',
    label: '咨询师'
  },
]
const { RangePicker } = DatePicker;


//判断职员的职位
const getJob = (job) => {
  if (job === 1) {
    return '班主任'
  } else if (job === 2) {
    return '讲师'
  } else if (job === 3) {
    return '学管主任'
  } else if (job === 4) {
    return '教研主任'
  } else if (job === 5) {
    return '咨询师'
  }
}
const EmpManage = () => {

  //用来清空添加用户时存留下来的数据
  const temparr = {
    id:'',
    image: '',
    username: '',
    name: '',
    gender: '',
    job: '',
    entrydate: null,
    dept_id: '',
     create_time:'',
    update_time:'',
    password:''

  }
  const [sumbitObj, setsumbitObj] = useState({
    id:'',
    image: '',
    username: '',
    name: '',
    gender: '',
    job: '',
    entrydate: null,
    dept_id: '',
    create_time:'',
    update_time:'',
    password:''
  })

  //员工数据列表
  const [empList, setempLIst] = useState([])

  //单纯用来刷新页面的
  const [a, seta] = useState(0)

  // 用来存储用户选择的数据
  const [seleArr, setSeleArr] = useState([])

  const { deptList } = useSelector(state => state.dept)
  const dispatch = useDispatch()

  //获得员工信息用条数
  const [total, setTotal] = useState(0)
  //存储页面可以渲染的条数和当前页
  const [currentPage, setcurrentPage] = useState()
  const [pagesize, setPageSize] = useState()

  const [findName, setFindName] = useState('')
  const [findGender, setFindGender] = useState('')
  const [begin, setBegin] = useState('')
  const [end, setEnd] = useState('')

  useEffect(() => {
    const fetchGet = async () => {
      const res = await getEmpList(currentPage, pagesize, findName, findGender, begin, end)
      setempLIst(res.data.data.rows)
      setTotal(res.data.data.total)
      dispatch(store_getDeptList())
    }
    setTimeout(() => {
      fetchGet()
    }, 500)
  }, [a])

  // 将用户选择的日期存储起来
  const SelectDate = (e) => {
    setBegin(dayjs(e[0]).format('YYYY-MM-DD'))
    setEnd(dayjs(e[1]).format('YYYY-MM-DD'))
  }

  const handelById=async (id)=>{
    const {data:{data}}=await findEmpByID(id)
    setsumbitObj(data)
    setIsModalOpen(true)
    console.log(data)
  }

  const coulmn = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'id'
    },
    {
      title: '头像',
      dataIndex: 'image',
      render: (image) => <Image width={50} height={50} fallback={image} src='error'></Image>,
      key: 'id'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'id',
      render: (gender) => <span>{gender === 1 ? '男' : '女'}</span>
    },
    // 1 班主任 , 2 讲师 , 3 学工主管 , 4 教研主管 , 5 咨询师
    {
      title: '职位',
      dataIndex: 'job',
      key: 'id',
      render: (job) => <span>{getJob(job)}</span>
    },
    {
      title: '入职日期',
      dataIndex: 'entrydate',
      key: 'id'
    },
    {
      title: '最后操作时间',
      dataIndex: 'update_time',
      key: 'id',
      render: (update_time) => <span>{getUpdate_time(update_time)}</span>
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <div>
        <Button type="primary" onClick={()=>handelById(id)}>编辑</Button>
        <Button type="primary" onClick={() => handelDel(id)} danger>删除</Button>
      </div>
    }
  ]


  // 获取复选框选中的数据将id保存起来
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSeleArr(selectedRowKeys)
    }
  };

  //删除选择的员工数据
  const handelDel = async (id) => {
    console.log(id)
    await deleteEmp(id)
    message.info('删除成功')
    seta(a + 1)
  }

  //格式化时间
  const getUpdate_time = (update_time) => {
    return dayjs(update_time).format("YYYY-MM-DD HH:mm:ss")
  }

  //删除多项数据
  const DelItems = async () => {
    await seleArr.forEach(item => deleteEmp(item))
    message.info('删除成功')
    seta(a + 1)
  }


  //上传相关变量很函数
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {


    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        setsumbitObj(prevalue => ({ ...prevalue, image: info.file.response.data }))

      });
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );


  //用户添加数据选择的日期
  const add_SelectDate = (e) => {
    setsumbitObj(prevalue => ({ ...prevalue, entrydate: dayjs(e).format('YYYY-MM-DD') }))
  }

  //部门选择的数据
  const selectDept = (e) => {
    setsumbitObj(prevalue => ({ ...prevalue, dept_id: e }))
  }

  //添加用户
  const sumbit = async () => {
    if(sumbitObj.id==='' || sumbitObj===null){
      console.log(sumbitObj)
      await addEmp(sumbitObj)
      seta(a + 1)
      setsumbitObj(temparr)
      setImageUrl('')
      setIsModalOpen(false)
    }else{
      await updateEmpById(sumbitObj)
      seta(a+1)
      setsumbitObj(temparr)
      setImageUrl('')
      setIsModalOpen(false)
    }
   
  }


  //用户选择的页码和页数
  const changeSize = (page, pagesize) => {
    console.log(page, pagesize)
    setcurrentPage(page)
    setPageSize(pagesize)
    seta(a + 1)
  }


  //清空用户所查找的信息
  const clearData = () => {
    setFindName('')
    setFindGender('')
    setBegin('')
    setEnd('')
    seta(a + 1)
  }

  // 新增用户的弹窗方法
  const addObj=()=>{
    setIsModalOpen(true)
    setsumbitObj(temparr) 
  }
  return (
    <div className="emp">
      <span>姓名：</span>
      <Input className="input_text" value={findName} onChange={(e) => setFindName(e.target.value)} placeholder="请输入员工姓名"></Input>
      <span>性别：</span>
      <Select className="input_text" value={findGender} onChange={(e) => setFindGender(e)} placeholder='请选择' options={option}></Select>
      <span>入职日期：</span>
      <RangePicker defaultValue={null}  onChange={e => SelectDate(e)} />
      <Button type="primary" className="button" onClick={() => seta(a + 1)}>查询</Button>
      <Button className="button" style={{ backgroundColor: 'grey' }} onClick={() => clearData()}>清空</Button>
      <br></br>
      <Button type="primary" className="button double-button" onClick={() => addObj()} >+ 新增</Button>

      {/* 新增用户弹窗 */}
      <Modal title='新增用户' style={{ paddingInline: 50 }} open={isModalOpen} onCancel={() => setIsModalOpen(false)}
        onOk={() => sumbit()}>
        <Form>
          <ul style={{ listStyle: 'none' }}>

            用户名:
            <li>
              <Input value={sumbitObj.username} onChange={(e) => setsumbitObj(prevUser => ({ ...prevUser, username: e.target.value }))} style={{ width: '80%' }}></Input>
            </li>
            用户姓名:
            <li>
              <Input value={sumbitObj.name} onChange={(e) => setsumbitObj(prevUser => ({ ...prevUser, name: e.target.value }))} style={{ width: '80%' }} ></Input>
            </li>
            性别选择:
            <li>
              <Select value={sumbitObj.gender} style={{ width: '80%' }} placeholder='请选择' onChange={(e) => setsumbitObj(prevUser => ({ ...prevUser, gender: e }))} options={option}></Select>
            </li>
            头像
            <li>
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://127.0.0.1:8082/upload"
                method="post"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {sumbitObj.image ? (
                  <img
                    src={ sumbitObj.image}
                    alt="avatar"
                    style={{
                      width: '100%',
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </li>
            职位
            <li>
              <Select value={sumbitObj.job} onChange={(e) => setsumbitObj(prevUser => ({ ...prevUser, job: e }))} style={{ width: '80%' }} options={optionJob} placeholder='职位'></Select>
            </li>
            入职日期
            <li>
              <DatePicker   allowClear style={{ width: '80%' }} onChange={e => add_SelectDate(e)}></DatePicker>
            </li>
            归属部门
            <li>
              <Select value={sumbitObj.dept_id} onChange={(e) => selectDept(e)} style={{ width: '80%' }} >
                {deptList.map(item => <Option value={item.id} >{item.name}</Option>)}
              </Select>
            </li>
          </ul>
        </Form>
      </Modal>

      <Button type="primary" className="button double-button" onClick={() => DelItems()} danger>- 批量删除</Button>


      <Table rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
        rowKey={record => record.id}
        bordered className="table" dataSource={empList} columns={coulmn} />

      <Pagination
        total={total}
        showSizeChanger
        showQuickJumper
        pageSizeOptions={[5, 10, 15, 20]}
        showTotal={(total) => `总条数${total} `}
        onChange={(page, pagesize) => changeSize(page, pagesize)}
        defaultPageSize='5'
      />



    </div>
  )
}

export default EmpManage