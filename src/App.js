import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Affix, Button, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate,  } from 'react-router-dom';


const item=[
  {
    key: 'main',
    icon: <UserOutlined />,
    label: '首页',
  },
  {
    key: '班级学员管理',
    icon: <VideoCameraOutlined />,
    label: '班级学员管理',
    children:[
      {
        key:'classmanage',
        icon: <VideoCameraOutlined />,
        label:'班级管理'
      },
      {
        key:'studentmanage',
        icon: <VideoCameraOutlined />,
        label:'学员管理'
      }
    ]
  },
  {
    key: '系统信息管理',
    icon: <UploadOutlined />,
    label: '系统信息管理',
    children:[
      {
        key:'deptmanage',
        icon: <VideoCameraOutlined />,
        label:'部门管理'
      },
      {
        key:'empmanage',
        icon: <VideoCameraOutlined />,
        label:'员工管理'
      }
    ]
  },
  {
    key: '数据统计管理',
    icon: <UploadOutlined />,
    label: '数据统计管理',
    children:[
      {
        key:'sutcount',
        icon: <VideoCameraOutlined />,
        label:'员工信息统计'
      },
      {
        key:'empcount',
        icon: <VideoCameraOutlined />,
        label:'学员信息统计'
      }
    ]
  }
]

const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
  
};


const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate=useNavigate()

  const handeljump=(e)=>{
    navigate(`/${e.key}`)
  }

  //   <Layout style={{height:'100vh',background: colorBgContainer}}>
  //     <Sider style={siderStyle} trigger={null} collapsible collapsed={collapsed}>
  //       <div className="demo-logo-vertical" />
  //       <Menu
  //         theme="dark"
  //         mode="inline"
  //         defaultSelectedKeys={['main']}
  //         items={item}
  //         onClick={(e)=>{handeljump(e)}}
  //       />
  //     </Sider>
  //     <Layout style={{ marginInlineStart: 200, }}>
  //       <Header
  //         style={{
  //           padding: 0,
  //           background: colorBgContainer,
  //         }}
  //       >
  //         <Button
  //           type="text"
  //           icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
  //           onClick={() => setCollapsed(!collapsed)}
  //           style={{
  //             fontSize: '16px',
  //             width: 64,
  //             height: 64,
  //           }}
  //         />
  //       </Header>
  //       <Content
  //         style={{
  //           margin: '24px 16px',
  //           padding: 10,
  //           overflow: 'initial',
  //           background: colorBgContainer,
           
  //         }}
  //       >
  //         <div
  //           style={{
  //             padding: 24,
             
  //             background: colorBgContainer,
  //             borderRadius: borderRadiusLG,
  //           }}
  //         >
  //           <Outlet></Outlet>
            
  //         </div>
          
  //       </Content>
  //     </Layout>
  //   </Layout>
  // );
  return (
    <Layout hasSider>
      <Sider style={siderStyle} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['main']}  items={item}
        onClick={(e)=>{handeljump(e)}} />
      </Sider  >
      <Layout
        style={{
          marginInlineStart: 200,
        }}
      >
        <Header style={{
            padding: 0,
            background: colorBgContainer,
          }}>
          
          
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
             
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet></Outlet>
            {
              // indicates very long content
              Array.from(
                {
                  length: 100,
                },
                (_, index) => (
                  <React.Fragment key={index}>
                   
                  </React.Fragment>
                ),
              )
            }
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;