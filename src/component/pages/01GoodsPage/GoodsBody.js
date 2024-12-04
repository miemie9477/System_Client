import './css/GoodsPage.css'
import { useEffect, useState } from "react";
import Food from "./pic/Food.jpg"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoodsBody = ({pNo}) => {

    const navigate = useNavigate();

    const [Mer_num, setMer_num] = useState(1);
    const Mer_Minus = () =>{
        if(Mer_num>1) setMer_num(Mer_num - 1)
        else setMer_num(1)
    }
    const Mer_Add = () =>{
        setMer_num(Mer_num + 1)
    }

    const [Spice, setSpice] = useState("0");
    const Spice_handleChange = (event) => {
        setSpice(event.target.value); // 更新选中的值
    };

    var [info, setInfo] = useState({});
    const [Price, setPrice] = useState("");

    const AddtoCart = () =>{
        console.log(`Mer_num: ${Mer_num}`);
        info.amount = Mer_num;
        info.cTotal = Mer_num*Price;
        info.cSpicy = Spice;
        
        console.log("send req:")
        console.log(info);
        const url = `${process.env.REACT_APP_API_URL}/cart/addCart`;
        axios.post(url, info, {withCredentials: true})
        .then(
            response =>{
                console.log(response)
            }
        )
        //navigate('/');
    }


    useEffect(() =>{
        setInfo({pNo,
            pName:"",
            amount:"",
            cTotal:"",
            cSpicy:""
        })
        
        const url = `${process.env.REACT_APP_API_URL}/good/loadGood`;
        axios.post(url, {pNo},{ withCredentials: true })
        .then(
            response =>{
                console.log(response.data);
                setInfo({
                    pNo,
                    pName:response.data[0].pName,
                    amount:Mer_num,
                    cTotal:response.data[0].unitPrice,
                    cSpicy:Spice
                });
                setPrice(response.data[0].unitPrice);
                console.log(info);
            }
        )
        .catch(
            error =>{
                console.log(error)
            }
        )
    }, [])

    return(
        <div className="GoodsBody">
            <div className='GBMain'>
                <div className='GBMPic'>
                    <img src={Food} alt="Food" />
                </div>
                <div className='GBMText'>
                    <div className='GBMTextTitle'>香雞排</div>
                    <div className='GBMTextPrice'>$ 70</div>
                    <div className='GBMTextNumberTag'>數量</div>
                    <div className='GBMTextNum'>
                        <div className='GBMTNumMinus'><button onClick={Mer_Minus}>−</button></div>
                        <div className='GBMTNumNumber'>{Mer_num}</div>
                        <div className='GBMTNumPlus'><button onClick={Mer_Add}>+</button></div>
                    </div>
                    <div className='GBMTextIntro'>　選用彰化在地生產的雞胸肉，鮮嫩多汁，外皮酥脆，新鮮現炸，還請耐心等候。</div>
                </div>
            </div>
            
            <div className='GBSpice'>
                <div className='GBSpiceTitle'>辣度</div>
                <div className='GBSpiceLine'></div>
                <div className='GBSpiceChoice'>
                    <div className='GBSChoiceYes'><input type="radio" name="Spice" id="Spice" value="No" className='square-radio' checked={Spice === "0"}  onChange={Spice_handleChange}/>不辣</div>
                    <div className='GBSChoiceNo'><input type="radio" name="Spice" id="Spice" value="Yes" className='square-radio' checked={Spice === "1"} onChange={Spice_handleChange}/>要辣</div>
                </div>
            </div>

            <div>
                <button className='GBAddToCart' onClick={AddtoCart}>小計 $ {Mer_num*Price}，加入購物車</button>
            </div>
           
            

        </div>
    );
}
  

export default GoodsBody