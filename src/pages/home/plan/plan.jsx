import React,{useState,useEffect} from "react";
import {  Space, InputNumber } from 'antd';
import { generatePlan } from "../../../Mock/api";
import { usePlan } from "../../../context/PlanContext";
import * as XLSX from 'xlsx';
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
   
  // 导出Excel文件
  const exportToExcel = () => {
    if (!dataSource || dataSource.length === 0) {
      alert('没有可导出的数据！');
      return;
    }

    // 准备数据
    const data = [];
    
    // 添加表头
    const headers = ['学期', '总学分', '总学时', '公共基础课学分', '专业基础课学分', '专业选修课学分', '公共选修课学分', '其他课学分'];
    data.push(headers);

    // 添加每个学期的数据
    dataSource.forEach((semester, index) => {
      const row = [
        `第${index + 1}学期`,
        semester.totalCredits,
        semester.totalHours,
        semester.publicBaseCourseCredits,
        semester.majorBaseCourseCredits,
        semester.majorElectiveCourseCredits,
        semester.commonElectiveCourseCredits,
        semester.otherCourseCredits
      ];
      data.push(row);
    });

    // 添加课程信息
    data.push(['']); // 空行
    data.push(['课程信息']); // 标题
    data.push(['学期', '课程名称', '课程类型']); // 课程表头

    dataSource.forEach((semester, semesterIndex) => {
      semester.courses.forEach(course => {
        const courseTypeMap = {
          0: '公共基础课',
          1: '专业必修课',
          2: '专业选修课',
          3: '通选课',
          4: '毕业设计',
          5: '军训',
          6: '体育课'
        };
        data.push([
          `第${semesterIndex + 1}学期`,
          course.courseName,
          courseTypeMap[course.courseType] || '未知类型'
        ]);
      });
    });

    // 创建工作簿
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "培养计划");

    // 导出文件
    XLSX.writeFile(wb, "培养计划表.xlsx");
  };
   
  return(
    <div className="cotent-plan">
        <div className="command">
          <Space.Compact>
            <InputNumber  min={0} onChange={(value)=>{setCreditsOfCommonElectiveCourses(value)}} style={{width:250}} size="large" placeholder="最低公共选修课学分要求"/>
            <InputNumber  min={0} onChange={(value)=>{setCreditsOfProfessionalElectiveCourses(value)}} style={{width:250}} size="large" placeholder="最低专业选修课学分要求"/>
          </Space.Compact>
          <button className="generate" onClick={()=>{finalStep(creditsOfCommonElectiveCourses, creditsOfProfessionalElectiveCourses,userId,token)}}>生成培养计划</button>
          <button className="generate" onClick={exportToExcel} style={{marginLeft: '10px'}}>导出培养计划</button>
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