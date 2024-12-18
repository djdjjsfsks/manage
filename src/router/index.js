import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Main from "@/pages/main";
import CalssManage from "@/pages/class/classsmanage";
import StudentManage from "@/pages/class/studentmanage";
import DeptManage from "@/pages/system/deptmanage";
import EmpManage from "@/pages/system/empmanage";
import StudentCount from "@/pages/data/stucount";
import EmpCount from "@/pages/data/empcount";

const router=createBrowserRouter([
  {
    path:'/',
    element:<App></App>,
    children:[
      {
        index:true,
        element:<Main></Main>
      },
      {
        path:'/classmanage',
        element:<CalssManage></CalssManage>
      },
      {
        path:'/studentmanage',
        element:<StudentManage></StudentManage>
      },
      {
        path:'/deptmanage',
        element:<DeptManage></DeptManage>
      },
      {
        path:'/empmanage',
        element:<EmpManage></EmpManage>
      },
      {
        path:'/sutcount',
        element:<StudentCount></StudentCount>
      },
      {
        path:'/empcount',
        element:<EmpCount></EmpCount>
      }
    ]
  }
])

export default router