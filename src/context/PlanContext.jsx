import React, { createContext, useState, useContext } from 'react';
import { generatePlan } from '../Mock/api';
// 创建 Context
const PlanContext = createContext();

// 创建 Provider 组件
export function PlanProvider({ children }) {
    const [creditsOfCommonElectiveCourses,setCreditsOfCommonElectiveCourses]=useState(0);
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
            alert("提交成功")
            maxCourses = dataSource.length > 0 ? getMaxCourses(dataSource) : 0;
            
           
          }
          else{
            alert("提交失败:"+response.msg)
          }
      }catch(error){
        console.log(error)
      }
    }
  // 提供给子组件的值
  const value = {
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
  };
  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
}

// 创建自定义 Hook
export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}