import "./css/CheckMemberPage.css"
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { NavLink } from "react-router-dom";
import axios from "axios";
const CheckMember = () =>{

    const [memberInfo, setMemberInfo] = useState([])

    const { register, handleSubmit, watch, setError, getValues, formState: { errors } } = useForm({
        mode:"onSubmit",
        reValidateMode:"onBlur",

    });

    const onSubmit = (data) => {
        const account = data.CMMBMTAccount;
        const pwd = data.CMMBMTPwd; 
        const modifyMember = `${process.env.REACT_APP_API_URL}/backend/insertMember`;
 
        axios.post(modifyMember, {account, pwd})
        .then(
            response =>{
                if(response.data.result === "success"){
                    console.log("驗證成功",data);
                    alert(`已修改會員資料`);       
                }
            }
        )
        
        
    }

    useEffect(() =>{
        const check = async () =>{
            try{
                const checkMember = `${process.env.REACT_APP_API_URL}/backend/member`;
                const checkMemberResponse = await axios.get(checkMember);
                console.log(checkMemberResponse.data);
                setMemberInfo(checkMemberResponse.data);
            }
            catch(error){
                console.log(error);
            }
        }   
        check();
    }, [])

    return(
        <div className="CheckMemberBody">
            <div className="CMMBSwitchPage">
                <NavLink to="/CheckMenuPage"><button className="CMMBNotHere">商品資料表</button></NavLink>
                <NavLink to="/CheckMemberPage"><button className="CMMBHere">管理者帳密</button></NavLink>
                <NavLink to="/AllOrdersPage" style={{marginLeft: "auto"}}><button className="CMMBSwitchToOrder">切換到訂單管理</button></NavLink>
            </div>
            <div className="CMMBTitle">管理員帳密修改</div>
            <div className="CMMBLine"></div> 
            <form name="CMMBMTForm" onSubmit={handleSubmit(onSubmit)}>
                <table className="CMMBMemberTable">
                    <thead>
                        <tr>
                            <th className="CMMBMTAccount">帳號</th>
                            <th className="CMMBMTPwd">密碼</th>
                            <th className="CMMBMTFixButton"></th> 
                        </tr>
                    </thead>
                    <tbody>
                        {memberInfo.map((Info, index) => (
                        <tr>
                            <td className="CMMBMTAccount">
                                <textarea
                                    name={`CMMBMTAccount-${Info.account}`}
                                    id={`CMMBMTAccount-${Info.account}`}
                                    {...register(`CMMBMTAccount-${Info.account}`, { required: true })}
                                    rows="1"
                                >{Info.account}</textarea>
                            </td>
                            <td className="CMMBMTPwd">
                                <textarea
                                    name={`CMMBMTPwd-${Info.pwd}`}
                                    id={`CMMBMTPwd-${Info.pwd}`}
                                    {...register(`CMMBMTPwd-${Info.pwd}`, { required: true })}
                                    rows="1"
                                >{Info.pwd}</textarea>
                            </td>
                            <td className="CMMBMTFixButton"><button type="submit">修改</button></td>

                        
                        </tr>
                        ))}
                    </tbody>
                
                </table>
            </form>
        </div>
    );
}

export default CheckMember;