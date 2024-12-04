import Frame from "../../BasicFrame/frame";
import LoginBox from "./LoginBox";
import React, { useState } from 'react';

const LoginPage = () =>{
    // const [login, setLogin] = useState(0);
    const FixStyle = {
        position: "relative"
    }
    
    return(
        <div style={FixStyle}>
            <Frame/>
            <LoginBox/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        </div>
        
    );
}

export default LoginPage;