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

    const { register: registerModify, handleSubmit: handleSubmitModify, formState: { errors: errorsModify } } = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur",
    });

    const Send = (data) =>{
        const account = data.CMMBMTAccount;
        const pwd = data.CMMBMTPwd; 
        const insertMember = `${process.env.REACT_APP_API_URL}/backend/insertMember`;
        console.log(`create: ${account}, ${pwd}`)
        
        axios.post(insertMember, {account, pwd})
        .then(
            response =>{
                if(response.data){
                    console.log("驗證成功",data);
                    alert(`已新增管理者資料`);
                    check();       
                }
            }
        )
        .catch(
            error =>{
                console.log(error);
                alert("新增失敗")
            }
        )
    }

    const handleModify = (account, pwd) => {
        console.log(`Account: ${account}, Pwd: ${pwd}`);
    
        const modifyMember = `${process.env.REACT_APP_API_URL}/backend/modifyMember`;
        axios
            .post(modifyMember, { account, pwd })
            .then((response) => {
                if (response.data.result === "success") {
                    alert("已修改管理者資料");
                    setMemberInfo();
                    check(); // 重新獲取更新後的資料
                }
            })
            .catch((error) => {
                console.error(error);
                alert("修改失敗");
            });
    };

    const handleDelete = (account) => {
        const deleteMember = `${process.env.REACT_APP_API_URL}/backend/deleteMember`;
        axios
            .post(deleteMember, { account })
            .then((response) => {
                if (response.data) {
                    alert("已刪除管理者資料");
                    check(); // 重新獲取更新後的資料
                }
            })
            .catch((error) => {
                console.error(error);
                alert("刪除失敗");
            });
    };
    

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

    useEffect(() =>{
        check();
    }, [])

    return(
        <div className="CheckMemberBody">
            <div className="CMMBSwitchPage">
                <NavLink to="/CheckMenuPage"><button className="CMMBNotHere">商品資料表</button></NavLink>
                <NavLink to="/CheckMemberPage"><button className="CMMBHere">管理者帳密</button></NavLink>
                <NavLink to="/AllOrdersPage" style={{marginLeft: "auto"}}><button className="CMMBSwitchToOrder">切換到訂單管理</button></NavLink>
            </div>
            <div className="CMMBTitle">新增管理員</div>
            <div className="CMMBLine"></div> 
            <form name="CMMBMTForm" onSubmit={handleSubmitModify(Send)}>
                <table className="CMMBMemberTable">
                    <thead>
                        <tr>
                            <th className="CMMBMTAccount">帳號</th>
                            <th className="CMMBMTPwd">密碼</th>
                            <th className="CMMBMTFixButton"></th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="CMMBMTAccount">
                                <textarea type="text"
                                    name={`CMMBMTAccount`}
                                    id={`CMMBMTAccount`}
                                    {...registerModify(`CMMBMTAccount`, { required: true })}
                                    rows="1"
                                ></textarea>
                            </td>
                            <td className="CMMBMTPwd">
                                <textarea type="text"
                                    name={`CMMBMTPwd`}
                                    id={`CMMBMTPwd`}
                                    {...registerModify(`CMMBMTPwd`, { required: true })}
                                    rows="1"
                                ></textarea>
                            </td>
                            <td className="CMMBMTFixButton"><button type="submit">新增</button></td>

                        
                        </tr>
                        
                    </tbody>
                
                </table>
            </form>
            <div className="CMMBTitle">管理員帳密修改</div>
            <div className="CMMBLine"></div> 
            <form name="CMMBMTForm" >
                <table className="CMMBMemberTable">
                    <thead>
                        <tr>
                            <th className="CMMBMTAccount">帳號</th>
                            <th className="CMMBMTPwd">密碼</th>
                            <th className="CMMBMTFixButton"></th>
                            <th className="CMMBMTDeleteButton"></th>  
                        </tr>
                    </thead>
                    <tbody>
                    {memberInfo.map((Info, index) => (
                        <tr key={index}>
                            <td className="CMMBMTAccount">
                                <textarea
                                    name={`CMMBMTAccount1-${Info.account}`}
                                    id={`CMMBMTAccount1-${Info.account}`}
                                    {...register(`CMMBMTAccount1-${Info.account}`, { required: true })}
                                    rows="1">
                                    {Info.account}
                                </textarea>
                            </td>
                            <td className="CMMBMTPwd">
                                <textarea
                                    name={`CMMBMTPwd1-${Info.pwd}`}
                                    id={`CMMBMTPwd1-${Info.pwd}`}
                                    {...register(`CMMBMTPwd1-${Info.pwd}`, { required: true })}
                                    rows="1"
                                >
                                    {Info.pwd}
                                </textarea>
                            </td>
                            <td className="CMMBMTFixButton">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleModify(
                                            getValues(`CMMBMTAccount1-${Info.account}`),
                                            getValues(`CMMBMTPwd1-${Info.pwd}`)
                                        )
                                    }>修改
                                </button>
                            </td>
                            <td className="CMMBMTDeleteButton">
                                <button
                                    type="button"
                                    onClick={() => handleDelete(Info.account)}>刪除
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                
                </table>
            </form>
        </div>
    );
}

export default CheckMember;