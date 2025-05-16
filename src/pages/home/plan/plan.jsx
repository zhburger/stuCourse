import React,{useState,useEffect} from "react";
import {  Space, InputNumber } from 'antd';
import { generatePlan } from "../../../Mock/api";
import { usePlan } from "../../../context/PlanContext";
import './plan.css'

export default function Plan() {
  /* const [creditsOfCommonElectiveCourses,setCreditsOfCommonElectiveCourses]=useState(0);
  const [creditsOfProfessionalElectiveCourses,setCreditsOfProfessionalElectiveCourses]=useState(0);
  const [dataSource,setDataSource]=useState([]);
  const [data1,setData1]=useState(0);
  const [data2,setData2]=useState(0);
 
  const userId=localStorage.getItem("userid");
  const token=localStorage.getItem("token");
  // 计算最大课程数
  const getMaxCourses = (semesters) => {
    return Math.max(...semesters.map(semester => semester.courses.length));
  };

  // 获取最大课程数
  const maxCourses = dataSource.length > 0 ? getMaxCourses(dataSource) : 0;
  
  //生成培养计划并获取
 
  const finalStep = async (creditsOfCommonElectiveCourses, creditsOfProfessionalElectiveCourses,userId,token) => {
    try{
        const response=await generatePlan(creditsOfCommonElectiveCourses, creditsOfProfessionalElectiveCourses,userId,token);
        if(response.code==1){
          setDataSource(response.data.allSemesters);
          setData1(creditsOfCommonElectiveCourses);
          setData2(creditsOfProfessionalElectiveCourses);
          maxCourses = dataSource.length > 0 ? getMaxCourses(dataSource) : 0;
          alert("提交成功")
          
        }
    }catch(error){
      alert("生成失败："+response.msg)
    }
  } */
    const{
      dataSource,
      setDataSource,
      creditsOfCommonElectiveCourses,
      setCreditsOfCommonElectiveCourses,
      creditsOfProfessionalElectiveCourses,
      setCreditsOfProfessionalElectiveCourses,
      getMaxCourses,
      maxCourses,
      userId,
      token,
      data1,
      data2,
      finalStep,
    }=usePlan();
   
  return(
    <div className="cotent-plan">
        <div className="command">
          <Space.Compact>
            <InputNumber  min={0} onChange={(value)=>{setCreditsOfCommonElectiveCourses(value)}} style={{width:250}} size="large" placeholder="最低公共选修课学分要求"/>
            <InputNumber  min={0} onChange={(value)=>{setCreditsOfProfessionalElectiveCourses(value)}} style={{width:250}} size="large" placeholder="最低专业选修课学分要求"/>
          </Space.Compact>
          <button className="generate" onClick={()=>{finalStep(creditsOfCommonElectiveCourses, creditsOfProfessionalElectiveCourses,userId,token)}}>生成培养计划</button>
        </div>
        <div className="plan-list">
          <div className="plan-item first-l"></div>
          <div className="plan-item first-l">第一学期</div>
          <div className="plan-item first-l">第二学期</div>
          <div className="plan-item first-l">第三学期</div>
          <div className="plan-item first-l">第四学期</div>
          <div className="plan-item first-l">第五学期</div>
          <div className="plan-item first-l">第六学期</div>
          <div className="plan-item first-l">第七学期</div>
          <div className="plan-item first-l">第八学期</div>
        <>
          <div className="plan-item"> 总学分 </div>
          {dataSource.length > 0 ? dataSource.map((item,index)=>{
            return <div id={index} className="plan-item" >{item.totalCredits}</div>
          }) : 
            Array.from({length:8}).map((index)=>{
              return <div id={index} className="plan-item" ></div>
            })
          }

          <div className="plan-item"> 总学时 </div>
          {dataSource.length > 0 ? dataSource.map((item,index)=>{
            return <div id={index} className="plan-item" >{item.totalHours}</div>
          }) : 
            Array.from({length:8}).map((index)=>{
              return <div id={index} className="plan-item" ></div>
            })
          }

          <div className="plan-item"> 公共基础课学分 </div>
          {dataSource.length > 0 ? dataSource.map((item,index)=>{
            return <div id={index} className="plan-item" >{item.publicBaseCourseCredits}</div>
          }) : 
            Array.from({length:8}).map((index)=>{
              return <div id={index} className="plan-item" ></div>
            })
          }

          <div className="plan-item"> 专业基础课学分 </div>
          {dataSource.length > 0 ? dataSource.map((item,index)=>{
            return <div id={index} className="plan-item" >{item.majorBaseCourseCredits}</div>
          }) : 
            Array.from({length:8}).map((index)=>{
              return <div id={index} className="plan-item" ></div>
            })
          }

          <div className="plan-item"> 专业选修课学分 </div>
          {dataSource.length > 0 ? dataSource.map((item,index)=>{
            return <div id={index} className="plan-item" >{item.majorElectiveCourseCredits}</div>
          }) : 
            Array.from({length:8}).map((index)=>{
              return <div id={index} className="plan-item" ></div>
            })
          }

          <div className="plan-item"> 公共选修课学分 </div>
          {dataSource.length > 0 ? dataSource.map((item,index)=>{
            return <div id={index} className="plan-item" >{item.commonElectiveCourseCredits}</div>
          }) : 
            Array.from({length:8}).map((index)=>{
              return <div id={index} className="plan-item" ></div>
            })
          }

          <div className="plan-item"> 其他课学分 </div>
          {dataSource.length > 0 ? dataSource.map((item,index)=>{
            return <div id={index} className="plan-item" >{item.otherCourseCredits}</div>
          }) : 
            Array.from({length:8}).map((index)=>{
              return <div id={index} className="plan-item" ></div>
            })
          }
          {
            Array.from({length: maxCourses}).map((_, index) =>{
              return(
              <>
                <div className="plan-item">课程{index}</div>
                {dataSource.map((semester, semesterIndex) => {
                    const course = semester.courses[index];
                    return course ? (
                      <div className={`plan-item course-type-${course.courseType}`}>{course.courseName}</div>
                    ) : <div className="plan-item" style={{color: '#ccc'}}>暂无课程</div>;
                  })}
              </> 
            )
            }
            ) 
          }
          </>
        </div>
    </div>
  )
}