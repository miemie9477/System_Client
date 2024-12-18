import "./css/CartPage.css"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaTrashCan } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { NavLink } from "react-router-dom";
import axios from "axios";

var fetchCartData, modifyAmount;

const CartBody = () => {

    const navigate = useNavigate();
    var [CartItem, setCartItem] = useState([{
        tId: "",
        pNo: "",
        pName: "",
        amount: "",
        cSpicy: "",
        cTotal: "",
        unitPrice:""
    }]);

    useEffect(() =>{
        fetchCartData();
    }, [])
    
    
    fetchCartData = async ()=>{
        const checkCart = `${process.env.REACT_APP_API_URL}/setCookie/createTId`;
        const checkCartResponse = await axios.get(checkCart,{ withCredentials: true });
        console.log(checkCartResponse.data);
        
        const url = `${process.env.REACT_APP_API_URL}/cart/checkCart`;
        await axios.get(url, {withCredentials: true})
        .then(
            response => {
                console.log(response.data);
                const cartItems = response.data.map(item => ({
                    tId: item.tId,
                    pNo: item.pNo,
                    pName: item.pName,
                    amount: item.amount,
                    cTotal: item.cTotal,
                    cSpicy: item.cSpicy,
                    unitPrice: item.cTotal / item.amount, // 計算單價
                }));
            
                setCartItem(cartItems); // 將處理好的陣列存入狀態
                if(response.data.length < 1){
                    alert("購物車為空!");
                    navigate('/');
                }
            }
        )
        .catch(
            error =>{
                console.log(error);
            }
        )
    };

    modifyAmount = (info) =>{
        const url = `${process.env.REACT_APP_API_URL}/cart/modifyAmount`;
        axios.post(url, {info}, {withCredentials: true})
        .then(
            response =>{
                console.log(response.data);
                if(response.data){
                    fetchCartData();
                }
            }
        )
        .catch(
            error =>{
                console.log(error);
            }
        )
    }
    
    console.log("最新的 CartItem:", CartItem);

    const [Cart_num, setCart_num] = useState(1);

    const Cart_Minus = (pNo , unitPrice) =>{
        if(Cart_num>1) {
            setCart_num(Cart_num - 1);
            const info={
                pNo: pNo,
                amount: Cart_num,
                cTotal: Cart_num * unitPrice
            }
            modifyAmount(info);
        }
        else setCart_num(1)
    }

    const Cart_Add = (pNo, unitPrice) =>{
        setCart_num(Cart_num + 1)
        const info={
            pNo: pNo,
            amount: Cart_num,
            cTotal: Cart_num * unitPrice
        }
        modifyAmount(info);
        
    }


    const Discard = (pNo) =>{
        const url = `${process.env.REACT_APP_API_URL}/cart/discard`

        axios.post(url, pNo)
        .then(
            response =>{
                console.log(response);
                fetchCartData();
            }
        )
    }

    const [UnitPrice, setUnitPrice] = useState(70);


    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm({
        mode:"onSubmit",
        reValidateMode:"onBlur",
    });

    const onSubmit = (data) => {
        const total = CartItem.reduce((sum, item) => sum + item.cTotal, 0);
        console.log("總金額:", total); 
        navigate('/CartPage/TransPage')
        
    }
    

    return(
        <div className="CartBody">
            <div className='CBPrePage'>
                <NavLink to="/"><div className='CBPPArrow'><MdOutlineArrowBackIosNew style={{fontSize:"2.2vw", color:"#E08F50"}}/></div></NavLink>
                <NavLink to="/"><div className='CBPPText'>上一頁</div></NavLink>
            </div>
            <form name="CartForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="CartDetail">
                    <div className="CDTitle">購物車資訊</div>
                    <div className="CDTitleLine"></div>
                    
                    <div className="CDGoods">香雞排</div>
                    <div className="CDSpice">不辣</div>
                        <div className="CDAdjustNum">
                            <div className="CDANCrashcan"><button onClick={Discard}><FaTrashCan className="CDANCrashcanIcon"/></button></div>
                            <div className="CDANMinus"><button onClick={Cart_Minus}>−</button></div>
                            <div className="CDANNum">{Cart_num}</div>
                            <div className="CDANPlus"><button onClick={Cart_Add}>+</button></div>
                            <div className="CDANPrice">$ {Cart_num*UnitPrice}</div>
                        </div>
                    <div className="CDGoodsLine"></div>
                    <div className="CDSum">
                        <div className="CDSumTitle">小計</div>
                        <div className="CDSumPrice">$ {70}</div>
                    </div>
                    <div className="CDRemarkTitle">訂單備註</div>
                    <div className="CDRemark">
                        <textarea name="CDRemark" id="CDRemark"
                        {...register("CDRemark")} />
                    </div>
                </div>


                <div className="CartOrdererDetail">
                    <div className="CODTitle">訂購人資訊*</div>
                    <div className="CODLine"></div>
                    <div className="CODName">
                        <input type="text" name="CODName" id="CODName" placeholder="訂購人姓名"
                        {...register("CODName", {required: true})} />
                        {!!errors.CODName && <p>{errors.CODName.message.toString() || "請輸入姓名"}</p> }
                    </div>
                    <div className="CODPhone">
                        <input type="text" name="CODPhone" id="CODPhone" placeholder="電話號碼"
                        {...register("CODPhone", {required: true, maxLength: {value: 10, message: "手機號碼過長"}, minLength: {value: 10, message: "手機號碼過短"}})} />
                        {!!errors.CODPhone && <p>{errors.CODPhone.message.toString() || "請輸入電話號碼"}</p> }
                    </div>
                    <div className="CODPayment"><input type="text" value="現金支付" readonly/></div>
                </div>
            
                <div>
                    <button className='CartSubmit' type="submit">總計 $ {70}，送出訂單</button>
                </div>
            
           </form>
        </div>
    );
}
  

export default CartBody