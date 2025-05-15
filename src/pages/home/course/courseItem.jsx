import React,{useState} from "react";
import {  Input, Select,InputNumber } from 'antd';
import './courseItem.css'

export default function CourseItem({ index,course, onUpdate, onDelete }) {
  
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({...course});
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
    const handleEdit = async() => {
        console.log(parsePrerequisites(preCourseTxt))
        setFormData({...course, prerequisites:parsePrerequisites(preCourseTxt)});
        onUpdate?.(formData,token);
        setIsEditing(false);
    }
    const handleDelete = async() => {
        onDelete?.(formData.id,token);
    }
    const handleCancel = () => {
        clear();
        setIsEditing(false);
    }
    const clear=()=>{
        setFormData({...course})
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
    
     /*  {
        "id": 2,
        "courseName": "高等数学2",
        "credits": 7,
        "totalHours": 72,
        "courseType": 0,
        "userId": 1,
        "preRequisiteCourseIds": [
          1
        ]
      }, */
    
    return (
        
          isEditing ? (
            <>
                  <div className="input">
                    <Select placeholder="课程类型" size='small'
                        onChange={(value)=>{
                            setFormData({...formData,courseType:value})
                            
                        }}
                        style={{width: '100%',
                            height:'100%'
                        }}
                        variant="borderless"
                        options={options} 
                        defaultValue={options[formData.courseType]} />
                   </div>
                   <div className="input">
                    <InputNumber  placeholder="课程号" size="large"
                        style={{width: '100%'}}
                        onChange={(value)=>{setFormData({...formData,id:value})}}
                        variant="borderless"
                        defaultValue={formData.id}
                        />
                    </div>
                    <div className="input">
                  <Input  placeholder="课程名称" size="large"
                    onChange={(e)=>{
                        setFormData({...formData,courseName:e.target.value})
                        
                    }}
                    defaultValue={formData.courseName}
                    variant="borderless"
                    style={{width: '100%'}} />
                    </div>
                    <div className="input">
                  <InputNumber  placeholder="学分" size="large"
                    onChange={(value)=>{setFormData({...formData,credits:value})}}
                    defaultValue={formData.credits}
                    variant="borderless"
                    style={{width: '100%'}} />
                    </div>
                    <div className="input">
                  <InputNumber  placeholder="学时" size="large"
                    onChange={(value)=>{
                        setFormData({...formData,totalHours:value})
                        
                    }}
                    defaultValue={formData.totalHours}
                    variant="borderless"
                    style={{width: '100%'}} />
                    </div>
                    <div className="input">
                  <Input  placeholder="先修课程（请用逗号分隔）" size="large"
                    onChange={(e)=>{
                        setPreCourseTxt(e.target.value)
                        
                    }}
                    defaultValue={formData.preRequisiteCourseIds}
                    variant="borderless"
                    style={{width: '100%'}}/>
                </div>
              <button className="btn1" onClick={()=>{handleEdit()}} >提交</button>
              <button className="btn2" onClick={() => {handleCancel()}}>取消</button>
            </>
          ) : (
            <>
              <div className="info" style={{
                backgroundColor:index%2==0?'#ccc':'#f0f0f0'
              }}>{options[course.courseType].label}</div>
              <div className="info"
              style={{
                backgroundColor:index%2==0?'#ccc':'#f0f0f0'
              }}>{course.id}</div>
              <div className="info"
              style={{
                backgroundColor:index%2==0?'#ccc':'#f0f0f0'
              }}>{course.courseName}</div>
              <div className="info"
              style={{
                backgroundColor:index%2==0?'#ccc':'#f0f0f0'
              }}>{course.credits}</div>
              <div className="info"
              style={{
                backgroundColor:index%2==0?'#ccc':'#f0f0f0'
              }}>{course.totalHours}</div>
              <div className="info"
              style={{
                backgroundColor:index%2==0?'#ccc':'#f0f0f0'
              }}>{course.preRequisiteCourseIds}</div>
              <button  className="info edit" onClick={() => {setIsEditing(true)}}>修改</button>
              <button  className="info delete" onClick={()=>{handleDelete()}}>删除</button>
            </>
          )
        
      );
}