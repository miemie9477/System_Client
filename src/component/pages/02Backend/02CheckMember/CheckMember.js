import { useEffect, useState } from "react";
import axios from "axios";
const CheckMember = () =>{

    const [memberInfo, setMemberInfo] = useState([])

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
    })
}

export default CheckMember;