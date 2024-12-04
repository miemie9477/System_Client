import "./css/MenuPage.css"
import Food from "./pic/Food.jpg"
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const FixStyle = {
    position: "relative"
}

const MenuItems = ({pNo}) => {

    const [productInfo, setProductInfo] = useState([]);

    useEffect(() =>{
        const check = async () =>{
            try{
                const checkCart = `${process.env.REACT_APP_API_URL}/setCookie/createTId`;
                const checkCartResponse = await axios.get(checkCart,{ withCredentials: true });
                console.log(checkCartResponse.data);

                const url = `${process.env.REACT_APP_API_URL}/menu/loadMenu`;
                const menuResponse = await axios.get(url, { withCredentials: true })
                console.log("get menu:" , menuResponse.data)
                setProductInfo(menuResponse.data);
                
            }
            catch(error){
                console.log(error);
            }
        }
        check();
    }, [])

    return(
        // <div className="MenuItems" style={FixStyle}>
        //     <div className="MIPic">
        //         <NavLink to={`/GoodsPage?pNo=${pNo}`}><img src={Food} alt="Food" /></NavLink>
        //     </div>
        //     <div className="MIText">
        //     <NavLink to={`/GoodsPage?pNo=${pNo}`}><div className="MITextName">香雞排</div></NavLink>
        //     <NavLink to={`/GoodsPage?pNo=${pNo}`}><div className="MITextPrice">$ 70</div></NavLink>

        //     </div>
            

        // </div>
        <div className="MenuItemsContainer">
        {productInfo.map((product) => (
            <div className="MenuItems" style={FixStyle} key={product.pNo}>
                <div className="MIPic">
                    <NavLink to={`/GoodsPage?pNo=${product.pNo}`}>
                    <img src={Food} alt={product.pName} />
                    </NavLink>
                </div>
                <div className="MIText">
                    <NavLink to={`/GoodsPage?pNo=${product.pNo}`}>
                    <div className="MITextName">{product.pName}</div>
                    </NavLink>
                    <NavLink to={`/GoodsPage?pNo=${product.pNo}`}>
                    <div className="MITextPrice">${product.unitPrice}</div>
                    </NavLink>
                </div>
            </div>
        ))}
        </div>
    );
}
  

export default MenuItems