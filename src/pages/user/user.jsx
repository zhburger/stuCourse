import React from "react";
import './user.css'
import {useState,useEffect} from 'react'
import { accountLogin,accountRegister } from "../../Mock/api";
import { useNavigate } from "react-router";

export default function User() {
    const [isSignedIn, setIsSignedIn] = useState(true);
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const renderForm = (isSignedIn) => {
      if (isSignedIn) {
        return (
          <form className="content" onSubmit={(e)=>{e.preventDefault()}}>
            <input type="text" onChange={(e) => setAccount(e.target.value)} value={account} placeholder="" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="" />
            <button className="submit-btn" onClick={()=>userLogin(account,password)}>Sign In</button>
          </form>
        )
      }
      else{
        return(
          <form className="content" onSubmit={(e)=>{e.preventDefault()}}>
            <input type="text" onChange={(e) => setAccount(e.target.value)} value={account} placeholder="" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="" />
            <button className="submit-btn"onClick={()=>userRegister(account,password)}>Sign Up</button>
          </form>
        )
      }
    }

    const clear=()=>{
      setAccount("");
      setPassword("");
    }

    const userLogin = async (account, password) => {
      try {
        const response = await accountLogin(account, password);
        console.log(response);
        if(response.code==1){
          //登录成功
          const data= response.data;
          const username= data.username;
          const token = data.token;
          const userid = data.id;
          localStorage.setItem('token',token);
          localStorage.setItem('username',username);
          localStorage.setItem('userid',userid);
          
          clear();
          navigate('/home');
        }
        else{
          alert("登录失败："+response.msg);
        }
      }catch (error) {
        alert("登录失败："+error);
      }
    }
    const userRegister = async(account, password) => {
      try {
        const response = await accountRegister(account, password);
        console.log(response);
        if(response.code==1){
          //注册成功
          alert("注册成功，请继续登录");
          setIsSignedIn(true);
          clear();
          console.log(account,password);
        }
        else{
          alert("注册失败："+response.msg);
        }
      }catch (error) {
        alert("登录失败："+error);
      }
    }
    useEffect(()=>{
      if(localStorage.getItem('token')){
        alert("已登录,为你跳转到主页");
        navigate('/home')
      }
    })
  return (
    <div className="container">
      <div className="login-card">
        <div className="header">培养计划编制</div>
        <div className="tabs">
          <button onClick={()=>setIsSignedIn(true)} className="login-btn btn"
            style={{borderBottom: isSignedIn === true ? "2px solid #ce93d8" : "2px solid #151b23",
              color: isSignedIn === true ? "#ce93d8" : "#3b4a5a",
              textShadow: isSignedIn === true ? "0 0 8px #ce93d8, 0 0 16px #ce93d8" : "none"
            }}
          >Sign In</button>
          <button onClick={()=>setIsSignedIn(false)}className="sinup-btn btn"
            style={{borderBottom: isSignedIn === false ? "2px solid #ce93d8" : "2px solid #151b23",
              color: isSignedIn === false ? "#ce93d8" : "#3b4a5a",
              textShadow: isSignedIn === false ? "0 0 8px #ce93d8, 0 0 16px #ce93d8" : "none"
            }}
          >Sign Up</button>
        </div>
        <div className="form-container">
          <label className="label-1">UserName</label>
          <label className="label-2">PassWord</label>
          {renderForm(isSignedIn)}
        </div>
      </div>
    </div>
  );
}