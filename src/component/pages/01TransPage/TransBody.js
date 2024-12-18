import "./css/TransPage.css"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaTrashCan } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { NavLink } from "react-router-dom";
import axios from "axios";

var fetchCartData;

const TransBody = () => {

    var [CartItem, setCartItem] = useState({});

    // useEffect(() =>{
    //     fetchCartData();
    // }, [])
    // console.log("最新的 CartItem:", CartItem);
    
    // fetchCartData = async ()=>{
    //     const url = `${process.env.REACT_APP_API_URL}/cart/checkCart`;
    //     await axios.get(url, {withCredentials: true})
    //     .then(
    //         response =>{
    //             console.log(response.data);
    //             setCartItem(response.data);
    //         }
    //     )
    //     .catch(
    //         error =>{
    //             console.log(error);
    //         }
    //     )
    // };

    // const Discard = () =>{
    //     const url = `${process.env.REACT_APP_API_URL}/cart/discard`

    //     axios.post(url, CartItem.pNo)
    //     .then(
    //         response =>{
    //             console.log(response);
    //             fetchCartData();
    //         }
    //     )
    // }
    const [Cart_num, setCart_num] = useState(1);

    const [UnitPrice, setUnitPrice] = useState(70);

    
    

    return(
        <div className="TransBody">

                <div className="TBTitle">已完成訂餐，若您選擇現金付款，您的餐點於至櫃台結帳後開始準備。<br/>以下是您的訂單資訊:</div>
            
                <div className="TransDetail">
                    
                    <div className="TDOrderNum">
                        <div className="TDONText">訂單編號: </div>
                        <div className="TDONNum">A0000000</div>
                    </div>
                    <div className="TDOrderSentTime">
                        <div className="TDOSTText">送單時間: </div>
                        <div className="TDOSTTime">2024-11-06  15:30</div>
                    </div>

                    <div className="TDTitleLine"></div>
                    <div className="TDGoods">香雞排</div>
                    <div className="TDSpice">不辣</div>
                    <div className="TDAdjustNum">
                        <div className="TDANCalculate">$ {UnitPrice} × {Cart_num} =</div>
                        <div className="TDANPrice">$ {Cart_num*UnitPrice}</div>
                    </div>
                    <div className="TDGoodsLine"></div>

                    <div className="TDRemark">
                        <div className="TDRText">訂單備註: </div>
                        <div className="TDRDetail">不要塑膠袋</div>
                    </div>

                    <div className="TDSum">
                        <div className="TDSumTitle">小計</div>
                        <div className="TDSumPrice">$ {70}</div>
                    </div>
                    
                </div>


                <div className="TransOrdererDetail">
                    <div className="TODTitle">訂購人資訊*</div>
                    <div className="TODLine"></div>
                    <div className="TODName"><input type="text" name="TODName" id="TODName" value="王大明" readonly/></div>
                    <div className="TODPhone"><input type="text" name="TODPhone" id="TODPhone" value="0900000000" readonly/></div>
                    
                </div>
            
                
            
           
        </div>
    );
}
  

export default TransBody