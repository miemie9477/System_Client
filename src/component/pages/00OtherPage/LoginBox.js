import "./css/OtherPage.css";
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";


const LoginBox = () =>{

    
    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    

    const onSubmit = (data) => {
        
        console.log(data);

        const url = 'http://localhost:3001/login/verify';
        const info = {
            mAccount : data.inputAccount,
            mPwd: data.inputPassword
        }
        
    }

    return(
        <div className="loginBoxCss">
            <div className="loginContent">
                <div style={{fontSize:"18px", margin:"40px"}}>後台登入<br/></div>
                <form name="login" onSubmit={handleSubmit(onSubmit)}>
                    <div className="loginForm">
                        <b>帳號</b> 
                        <input type="account" id="inputAccount" 
                        {...register("inputAccount", {required: true, maxLength: {value: 10, message: "帳號過長"}})} />
                        {!!errors.inputAccount && <p>{errors.inputAccount.message.toString() || "請輸入帳號"}</p> }

                        <b>密碼</b>
                        <input type="password" id="inputPassword" 
                        {...register("inputPassword", {required: true})} />
                        {!!errors.inputPassword && <p>{errors.inputPassword.message.toString() || "請輸入密碼"}</p> }
                        
                        <Button variant="danger"  type="submit"  >登入</Button>
                        <div className="registerLink">
                            新增後臺帳號:<NavLink to="/RegisterPage">點我註冊</NavLink>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default LoginBox;