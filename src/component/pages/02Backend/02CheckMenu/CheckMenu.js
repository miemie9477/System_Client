import { useState, useEffect } from "react";
import axios from "axios";

const CheckMenu = () =>{

    const [productInfo, setProductInfo] = useState([]);

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
        <div>

        </div>
    );
}

export default CheckMenu