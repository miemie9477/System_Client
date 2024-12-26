import "./css/TransPage.css"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaTrashCan } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { NavLink } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';

var fetchData;

const TransBody = () => {

    var [recordItem, setRecordItem] = useState([{}]);
    const rId = getCookie('rId');
    var [trans, setTrans] = useState({});

    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) {
            return match[2];
        }
        return null; // 如果沒找到該 cookie，則返回 null
    }

    useEffect(() =>{
        fetchData();
    }, [])

    console.log("最新的 recordItem:", recordItem);
    const formattedTime = trans.tTime ? format(new Date(trans.tTime), "yyyy-MM-dd HH:mm:ss"): trans.tTime;;

    fetchData = async ()=>{
        const viewTrans = `${process.env.REACT_APP_API_URL}/cart/viewTrans`;
        const viewTransResponse = await axios.post(viewTrans, {rId},{ withCredentials: true });
        console.log("trans res:", viewTransResponse.data[0]);
        setTrans(viewTransResponse.data[0]);
        const url = `${process.env.REACT_APP_API_URL}/cart/viewRecord`;
        await axios.post(url, {rId}, {withCredentials: true})
        .then(
            response => {
                console.log(response.data);

                const Item = response.data.map(item => ({
                    rId: item.rId,
                    pNo: item.pNo,
                    pName: item.pName,
                    rAmount: item.rAmount,
                    rTotal: item.rTotal,
                    rSpicy: item.rSpicy,
                    unitPrice: item.rTotal / item.rAmount, // 計算單價
                }));
            
                setRecordItem(Item); // 將處理好的陣列存入狀態
                if(response.data.length < 1){
                    alert("購物車為空!");
                    // navigate('/');
                }
            }
        )
        .catch(
            error =>{
                console.log(error);
            }
        )
    };

    return(
        <div className="TransBody">

                <div className="TBTitle">已完成訂餐，若您選擇現金付款，您的餐點於至櫃台結帳後開始準備。<br/>以下是您的訂單資訊:</div>
            
                <div className="TransDetail">
                    
                    <div className="TDOrderNum">
                        <div className="TDONText">訂單編號: </div>
                        <div className="TDONNum">{trans.rId}</div>
                    </div>
                    <div className="TDOrderSentTime">
                        <div className="TDOSTText">送單時間: </div>
                        <div className="TDOSTTime">{formattedTime}</div>
                    </div>

                    <div className="TDTitleLine"></div>
                    <div>
                    {/* <div className="TDGoods">香雞排</div>
                    <div className="TDSpice">不辣</div>
                    <div className="TDAdjustNum">
                        <div className="TDANCalculate">$ {UnitPrice} × {Cart_num} =</div>
                        <div className="TDANPrice">$ {Cart_num*UnitPrice}</div>
                    </div>
                    <div className="TDGoodsLine"></div> */}
                    
                    </div>
                    {recordItem.map((item, index) => (
                        <div key={index} className="record-container">
                        {/* 商品名稱 */}
                        <div className="TDGoods">{item.pName}</div>

                        {/* 辣度 */}
                        <div className="TDSpice">
                            {item.rSpicy === 0 ? "不辣" : item.rSpicy === 1 ? "小辣" : "中辣"}
                        </div>

                        {/* 數量與價格 */}
                        <div className="TDAdjustNum">
                            <div className="TDANCalculate">
                            $ {item.unitPrice} × {item.rAmount} =
                            </div>
                            <div className="TDANPrice">$ {item.rTotal}</div>
                        </div>

                        {/* 分隔線 */}
                        <div className="TDGoodsLine"></div>
                        </div>
                    ))}

                    <div className="TDRemark">
                        <div className="TDRText">訂單備註: </div>
                        <div className="TDRDetail">{trans.tRemark}</div>
                    </div>

                    <div className="TDSum">
                        <div className="TDSumTitle">小計</div>
                        <div className="TDSumPrice">$ {trans.total}</div>
                    </div>
                    
                </div>


                <div className="TransOrdererDetail">
                    <div className="TODTitle">訂購人資訊*</div>
                    <div className="TODLine"></div>
                    <div className="TODName"><input type="text" name="TODName" id="TODName" value={trans.name} readonly/></div>
                    <div className="TODPhone"><input type="text" name="TODPhone" id="TODPhone" value={trans.phone} readonly/></div>
                    
                </div>
            
                
            
           
        </div>
    );
}
  

export default TransBody