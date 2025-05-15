import axios from 'axios';

//用户登录
export const accountLogin= async(account,password)=>{
    try{
      console.log(account,password);
      console.log('登录中');
      const response = await axios.post('/api/user/login',{
          username:account,
          password:password
      })
      console.log(response.data);
      return response.data;
    }catch(error){
      console.error('登录失败:',error);
    }
}

//用户注册
export const accountRegister= async(account,password)=>{
    try{
      console.log(account,password);
      console.log('注册中');
      const response = await axios.post('/api/user/register',{
          username:account,
          password:password
      })
      console.log(response.data);
      return response.data;
    }catch(error){
      console.error('注册失败:',error);
    }
}


// 获取全部课程
export const getAllCourse = async (userId,token) => {
  try {
    const response = await axios.get(`/api/course/${userId}`,{
      headers: {
        token: token
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('获取课程失败:', error);
    return null;
  }
};

//提交课程修改
export const editCourse = async (courseData,token) => {
  try {
    const response = await axios.put('/api/course', courseData,{
      headers: {
        token: token
      }
    });
    console.log('修改成功', response.data);
    return response.data;
  } catch (error) {
    console.error('修改课程失败:', error);
    throw error;
  }
};

//删除课程api
export const deleteCourse = async (courseId,token) => {
  try{
    console.log(token);
    console.log(courseId);
    const response = await axios.delete(`/api/course/${courseId}`,{
      headers: {
        token: token
      }
    });
    console.log(response.data);
    return response.data;
  }catch(error){
    console.error('删除失败:',error);
  }
}

//添加课程api
export const addCourse = async (courseName,courseType,credits,id,preRequisiteCourseIds,totalHours,token) => {
  try{
    //courseName,courseType,credits,id,preRequisiteCourseIds,totalHours
    console.log("信息："+courseName,courseType,credits,id,preRequisiteCourseIds,totalHours);
    console.log("token"+token);
    const response = await axios.post('/api/course', {
      courseName: courseName,
      courseType: courseType,
      credits: credits,
      id: id,
      preRequisiteCourseIds: preRequisiteCourseIds,
      totalHours: totalHours
    },
    {
      headers: {
        token: token
      }
    }
    );
    console.log(response.data);
    return response.data;
  }catch(error){
    console.error('添加失败:',error);
  }
}

//生成培养计划api
export const generatePlan = async (creditsOfCommonElectiveCourses,creditsOfProfessionalElectiveCourses,userId,token) => {
  try{
    const response = await axios.post('/api/plan/planninng', {
      creditsOfCommonElectiveCourses:creditsOfCommonElectiveCourses,
      creditsOfProfessionalElectiveCourses:creditsOfProfessionalElectiveCourses,
      userId:userId
    },{
      headers: {
        token: token
      }
    })
    console.log(response.data);
    return response.data;
  }catch(error){
    console.error('生成失败:',error);
  }
  
}