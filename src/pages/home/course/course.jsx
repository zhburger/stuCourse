import React,{useState,useEffect,} from "react";
import {  Input, Select, Space,InputNumber } from 'antd';
import "./course.css"
import CourseItem from "./courseItem";
import { addCourse,getAllCourse,deleteCourse,editCourse} from "../../../Mock/api";
import { useNavigate } from "react-router";

export default function Course() {
    //courseName,courseType,credits,id,preRequisiteCourseIds,totalHours
    //6个输入框
    //公共基础课（必修），专业必修课（必修），专业选修课（选修，有学分要求）。毕业设计（特殊安排）
    //军训（特殊安排），体育课（必修）（特殊安排）
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userid');
    const navigate = useNavigate();
    const [courseList,setCourseList]=useState([]);
    const [course,setCourse]=useState({});
    const [courseName,setCourseName]=useState("");
    const [courseType,setCourseType]=useState(0);
    const [credits,setCredits]=useState("");
    const [id,setId]=useState(0);
    const [preRequisiteCourseIds,setPreRequisiteCourseIds]=useState([]);
    const [totalHours,setTotalHours]=useState("");
    const [preCourseTxt, setPreCourseTxt] = useState("");
    const options = [
      {
        value: 0,
        label: '公共基础课',
        
      },
      {
        value: 1,
        label: '专业必修课',
        
      },
      {
        value:2,
        label: '专业选修课',
        
      },
      {
        value: 3,
        label: '通选课',
        
      },
      {
        value: 4,
        label: '毕业设计',
        
      },
      {
        value: 5,
        label: '军训',
        
      },
      {
        value: 6,
        label: '体育课',
        
      },
    ];
    const testCourse=[
      {
        "id": 2,
        "courseName": "高等数学2",
        "credits": 7,
        "totalHours": 72,
        "courseType": 0,
        "userId": 1,
        "preRequisiteCourseIds": [
          1,2
        ]
      },
      {
          "id": 2,
          "courseName": "高等数学2",
          "credits": 7,
          "totalHours": 72,
          "courseType": 0,
          "userId": 1,
          "preRequisiteCourseIds": [
            1,3
          ]
        },
        {
          "id": 2,
          "courseName": "高等数学2",
          "credits": 7,
          "totalHours": 72,
          "courseType": 0,
          "userId": 1,
          "preRequisiteCourseIds": [
            1
          ]
        },
        {
          "id": 2,
          "courseName": "高等数学2",
          "credits": 7,
          "totalHours": 72,
          "courseType": 0,
          "userId": 1,
          "preRequisiteCourseIds": [
            1
          ]
        },
  ]
  const clear=()=>{
    setCourseName("");
    setCourseType("");
    setCredits("");
    setTotalHours("");
    setPreRequisiteCourseIds("");
    setPreCourseTxt("");

  }
  //先修课程格式化问题，需要修改
  const parsePrerequisites = (text) => {
    // 类型检查
    if (typeof text !== 'string') {
      console.warn('parsePrerequisites: 输入必须是字符串类型');
      return [];
    }
    
    return text
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(Number);
  };
  //修改课程信息后的操作
  const updateCourse = async (course,token) => {
    try{
      const response = await editCourse(course,token);
      if(response.code==1){
        
        alert("修改成功");
        getAllCourses(userid,token);
      }else{
        getAllCourses(userid,token);
        alert("修改失败"+response.msg);
      }
    }catch(error){
      console.log(error);
    }
  };
  //删除某个课程后的操作
  const deleteCourses = async (id,token) => {
    try{
      const response = await deleteCourse(id,token);
      if(response.code==1){
        // 再次获取课程列表
        alert("成功删除课程:"+id)
        getAllCourses(userid,token);
      }else{
        
        alert("删除课程失败:"+response.msg)
      }

    }catch(error){
      console.log(error)
    }
    
  };

  //获取课程
  const getAllCourses = async (userId,token) => {
    try{
      // 发请求
      const response = await getAllCourse(userId,token);
      if(response.code==1){
        setCourseList(response.data);
        
      }
    }catch(error){
      console.log(error);
    }
  }
  //添加课程
  const submitAddCourse = async (courseName,courseType,credits,id,preCourseTxt,totalHours,token) => {
    try{
      //先格式化处理先修课程
      setPreRequisiteCourseIds(parsePrerequisites(preCourseTxt))
      const preCourseIds=parsePrerequisites(preCourseTxt)
      // 发请求
      const response = await addCourse(courseName,courseType,credits,id,preCourseIds,totalHours,token);
      
      if(response.code==1){
        alert("添加课程成功")
        getAllCourses(userid,token);
      }
      else{
        alert("添加课程失败:"+response.msg);
        getAllCourses(userid,token);
      }
      //再次获取课程列表

    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    
    
    if(token&&userid){
      getAllCourses(userid,token);
    }else{
      alert("请先登录")
      navigate("/user")
      
    }
  },[])
    
  return(
    <div className="content">
        <div className="add-course">
            <form onClick={(e)=>{e.preventDefault()}}>
                <Space.Compact>
                  <Select  placeholder="课程类型" size="large"
                    onChange={(value)=>{setCourseType(value);}}
                    value={courseType?options[courseType]:options[0]}
                    style={{width: '15%'}}
                    options={options} defaultValue={options[0]} />
                  {/* <InputNumber placeholder="课程号" size="large"
                    style={{width: '15%'}}
                    onChange={(value)=>{setId(value)}} 
                    value={id}/> */}
                  <Input placeholder="课程名称" size="large"
                    onChange={(e)=>{setCourseName(e.target.value)}}
                    style={{width: '50%'}} />
                  <InputNumber placeholder="学分" size="large"
                    onChange={(value)=>{setCredits(value)}}
                    value={credits}
                    style={{width: '10%'}} />
                  <InputNumber placeholder="学时" size="large"
                    onChange={(value)=>{setTotalHours(value)}}
                    value={totalHours}
                    style={{width: '10%'}} />
                  <Input placeholder="先修课程（请用逗号分隔）" size="large"
                    onChange={(e)=>
                      {setPreCourseTxt(e.target.value)
                        console.log(preCourseTxt)
                      }}
                    
                    style={{width: '40%'}}/>
                </Space.Compact>
                <button className="submit-btn"
                 onClick={()=>{submitAddCourse(courseName,courseType,credits,id,preCourseTxt,totalHours,token)}}>
                  添加课程
                </button>
            </form>
        </div>
       <div className="course-list">
                <div className="info title" style={{border: '1px solid black'}}>课程类型</div>
                 <div className="info title" >课程号</div>
                 <div className="info title" >课程名称</div>
                 <div className="info title" >学分</div>
                 <div className="info title" >学时</div>
                 <div className="info title" >先修课程</div>
                 <div className="info title" ></div>
                 <div className="info title" ></div>
                {courseList.map((item,index) => {
                    return <CourseItem key={index} index={index} course={item} onUpdate={(newCourse,token) => updateCourse(newCourse,token)} 
                    onDelete={(id,token) => deleteCourses(id,token)}
                    />
                })}
       </div>
    </div>
  )
}