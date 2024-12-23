import './css/GoodsPage.css'
import { useEffect, useState } from "react";
import Food from "./pic/Food.jpg"
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { NavLink } from "react-router-dom";
import axios from 'axios';

const GoodsBody = ({pNo}) => {
    

    const navigate = useNavigate();
    var [productAmount, setProductAmount] = useState();
    const [Mer_num, setMer_num] = useState(1);
    const Mer_Minus = () =>{
        if(Mer_num>1) setMer_num(Mer_num - 1)
        else setMer_num(1)
    }
    const Mer_Add = () =>{
        setMer_num(Mer_num + 1)
    }

    const [Spice, setSpice] = useState(0);
    const Spice_handleChange = (event) => {
        setSpice(Number(event.target.value)); // 更新选中的值
    };

    var [info, setInfo] = useState({});
    const [Price, setPrice] = useState(0);
    var [Intro, setIntro] = useState("");

    const AddtoCart = async() =>{
        if(productAmount >= Mer_num){
            console.log(`Mer_num: ${Mer_num}`);
            info.amount = Mer_num;
            info.cTotal = Mer_num*Price;
            info.cSpicy = Spice;
    
            const checkCart = `${process.env.REACT_APP_API_URL}/setCookie/createTId`;
            const checkCartResponse = await axios.get(checkCart,{ withCredentials: true });
            console.log(checkCartResponse.data);
    
            console.log("send req:")
            console.log(info);
            const url = `${process.env.REACT_APP_API_URL}/cart/addCart`;
            axios.post(url, info, {withCredentials: true})
            .then(
                response =>{
                    console.log("response",response)
                }
            )
            alert(`${Mer_num}份${info.pName} 已加入購物車`)
            navigate('/#');
        }
        else{
            console.log(`Mer_num: ${Mer_num}\npAmount:${productAmount}` )
            alert("庫存不足，請選購其他商品");
            navigate('/#');
        }
    }


    useEffect(() =>{
        setSpice(0)

        setInfo({pNo,
            pName:"",
            amount:"",
            cTotal:"",
            cSpicy:""
        })
        
        const url = `${process.env.REACT_APP_API_URL}/menu/loadGood`;
        axios.post(url, {pNo},{ withCredentials: true })
        .then(
            response =>{
                console.log(response.data[0].pAmount);
                setProductAmount(response.data[0].pAmount);
                setInfo({
                    pNo,
                    pName:response.data[0].pName,
                    amount:Mer_num,
                    cTotal:response.data[0].unitPrice,
                    cSpicy:Spice
                });
                setPrice(response.data[0].unitPrice);
                console.log(info);
                setIntro(response.data[0].pIntroduction)
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
            <div className='GBPrePage'>
                <NavLink to="/"><div className='GBPPArrow'><MdOutlineArrowBackIosNew style={{fontSize:"2.2vw", color:"#E08F50"}}/></div></NavLink>
                <NavLink to="/"><div className='GBPPText'>上一頁</div></NavLink>
            </div>
            <div className='GBMain'>
                <div className='GBMPic'>
                    <img src={require(`./pic/${pNo}.jpg`)} alt="Food" />
                </div>
                <div className='GBMText'>
                    <div className='GBMTextTitle'>{info.pName}</div>
                    <div className='GBMTextPrice'>$ {Price}</div>
                    <div className='GBMTextNumberTag'>數量</div>
                    <div className='GBMTextNum'>
                        <div className='GBMTNumMinus'><button onClick={Mer_Minus}>−</button></div>
                        <div className='GBMTNumNumber'>{Mer_num}</div>
                        <div className='GBMTNumPlus'><button onClick={Mer_Add}>+</button></div>
                    </div>
                    <div className='GBMTextIntro'>{Intro}</div>
                </div>
            </div>
            
            <div className='GBSpice'>
                <div className='GBSpiceTitle'>辣度</div>
                <div className='GBSpiceLine'></div>
                <div className='GBSpiceChoice'>
                    <div className='GBSChoiceYes'><input type="radio" name="Spice" id="Spice" value={0} className='square-radio' checked={Spice === 0}  onChange={Spice_handleChange}/>不辣</div>
                    <div className='GBSChoiceNo'><input type="radio" name="Spice" id="Spice" value={1} className='square-radio' checked={Spice === 1} onChange={Spice_handleChange}/>要辣</div>
                </div>
            </div>

            <div>
                <button className='GBAddToCart' onClick={AddtoCart}>小計 $ {Mer_num*Price}，加入購物車</button>
            </div>
           
            

        </div>
    );
}
  

export default GoodsBody