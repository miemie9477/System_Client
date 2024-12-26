import "./css/OtherPage.css";
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from 'react';
import { LoginContext } from "../../../ContextAPI";


const LoginBox = () =>{
    const { login, setLogin } = useContext(LoginContext);
    
    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    
    

    const onSubmit = (data) => {
        
        console.log(data);
        const url = `${process.env.REACT_APP_API_URL}/backend/login`;
        const info = {
            account : data.inputAccount,
            pwd: data.inputPassword
        }
        axios.post(url, info)
        .then(
            response=>{           
                console.log(response.data)
                if(response.data.length > 0){
                    alert('管理員登入');
                    navigate('/AllOrdersPage')
                    setLogin(1);
                }
                else{
                    setError("inputPassword",{type:"custom", message:"帳號或密碼錯誤"})
                    // alert("登入失敗");
                }
            }
        ).catch(
            error =>{
                console.log(error);
                alert("伺服器崩潰，等待回應");
                throw error;
            }
        )
    }

    return(
        <div className="loginBoxCss">
            <div className="loginContent">
                <div className="LCTitle">後台登入</div>
                <form name="login" onSubmit={handleSubmit(onSubmit)}>
                    <div className="loginForm">
                        <div className="LCInputTitle">帳號</div> 
                        <input type="account" id="inputAccount" 
                        {...register("inputAccount", {required: true})} />
                        {!!errors.inputAccount && <p>{errors.inputAccount.message.toString() || "請輸入帳號"}</p> }

                        <div className="LCInputTitle">密碼</div>
                        <input type="password" id="inputPassword" 
                        {...register("inputPassword", {required: true})} />
                        {!!errors.inputPassword && <p>{errors.inputPassword.message.toString() || "請輸入密碼"}</p> }
                        
                        <Button variant="danger"  type="submit"  >登入</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default LoginBox;