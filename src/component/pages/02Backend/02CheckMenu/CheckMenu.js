import "./css/CheckMenuPage.css"
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { NavLink } from "react-router-dom";
import axios from "axios";

const CheckMenu = () =>{

    const [productInfo, setProductInfo] = useState([]);

    
    const { register, handleSubmit, watch, setError, getValues, formState: { errors } } = useForm({
        mode:"onSubmit",
        reValidateMode:"onBlur",

    });

    const onSubmit = (data, pNo) => {
        // 提取表單數據
        const updatedData = {
            pNo,
            pName: data[`CMBMTName-${pNo}`],
            pIntroduction: data[`CMBMTIntro-${pNo}`],
            unitPrice: data[`CMBMTPrice-${pNo}`],
            pAmount: data[`CMBMTInventory-${pNo}`],
        };
    
        console.log("更新的商品資料:", updatedData);
    
        const url = `${process.env.REACT_APP_API_URL}/act/modifyProduct`
        axios.post(url, updatedData)
            .then(
                response => {
                    if(response){
                        alert("修改成功");
                        console.log(response)
                    }
                }
        )
            .catch(error => console.error(error));
    };

    useEffect(() =>{
        const check = async () =>{
            try{
                const url = `${process.env.REACT_APP_API_URL}/menu/loadMenu`;
                const menuResponse = await axios.get(url)
                console.log("get menu:" , menuResponse.data)
                setProductInfo(menuResponse.data);
                
            }
            catch(error){
                console.log(error);
            }
        }
        check();
    }, [])
    console.log("productInfo:", productInfo);

    return(
        <div className="CheckMenuBody">
            <div className="CMBSwitchPage">
                <NavLink to="/CheckMenuPage"><button className="CMBHere">商品資料表</button></NavLink>
                <NavLink to="/CheckMemberPage"><button className="CMBNotHere">管理者帳密</button></NavLink>
                <NavLink to="/AllOrdersPage" style={{marginLeft: "auto"}}><button className="CMBSwitchToOrder">切換到訂單管理</button></NavLink>
            </div>
            
            <div className="CMBTitle">商品資料表</div>
            <div className="CMBLine"></div>
            <table className="CMBMenuTable">
                <thead>
                    <tr>
                        <th className="CMBMTNum">商品編號</th>
                        <th className="CMBMTName">商品名稱</th>
                        <th className="CMBMTIntro">商品簡介</th>
                        <th className="CMBMTPrice">商品單價</th>
                        <th className="CMBMTInventory">商品存貨</th>
                        <th className="CMBMTFixButton"></th> 
                    </tr>
                </thead>
                <tbody>
                {productInfo.map((Info, index) => (
                    <tr key={Info.pNo}>
                        <td colSpan={6} className="CMBMTInsideTD" style={{padding:"0"}}>
                        <form name="CMBMTForm" onSubmit={handleSubmit((data) => onSubmit(data, Info.pNo))}>
                            <td className="CMBMTNum">
                                <textarea
                                    name={`CMBMTNum-${Info.pNo}`}
                                    id={`CMBMTNum-${Info.pNo}`}
                                    {...register(`CMBMTNum-${Info.pNo}`, { required: true })}
                                    readOnly rows="1"
                                >{Info.pNo}</textarea>
                            </td>
                            <td className="CMBMTName">
                                <textarea
                                    name={`CMBMTName-${Info.pNo}`}
                                    id={`CMBMTName-${Info.pNo}`}
                                    {...register(`CMBMTName-${Info.pNo}`, { required: true })}
                                    rows="1"
                                >{Info.pName}</textarea>
                            </td>
                            <td className="CMBMTIntro">
                                <textarea
                                    name={`CMBMTIntro-${Info.pNo}`}
                                    id={`CMBMTIntro-${Info.pNo}`}
                                    {...register(`CMBMTIntro-${Info.pNo}`, { required: true })}
                                    rows="1"
                                >{Info.pIntroduction}</textarea>
                            </td>
                            <td className="CMBMTPrice">
                                <textarea
                                    name={`CMBMTPrice-${Info.pNo}`}
                                    id={`CMBMTPrice-${Info.pNo}`}
                                    {...register(`CMBMTPrice-${Info.pNo}`, { required: true })}
                                    rows="1"
                                >{Info.unitPrice}</textarea>
                            </td>
                            <td className="CMBMTInventory">
                                <textarea
                                    name={`CMBMTInventory-${Info.pNo}`}
                                    id={`CMBMTInventory-${Info.pNo}`}
                                    {...register(`CMBMTInventory-${Info.pNo}`, { required: true })}
                                    rows="1"
                                >{Info.pAmount}</textarea>
                            </td>
                            <td className="CMBMTFixButton"><button type="submit">修改</button></td>
                        </form>
                        </td>
                    </tr>
                ))}

                    
                </tbody>
            
            </table>
        </div>
    );
}

export default CheckMenu