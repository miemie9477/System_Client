import { useEffect, useState } from "react";
import Frame from "../../BasicFrame/frame";
import MenuItems from "./MenuItems";
import axios from 'axios'

const FixStyle = {
    position: "relative",
    
}


const MenuPage = () => {
    return(
        <div style={FixStyle}>
            <Frame/>
            <div style={{marginTop: "6vh"}}>
                <MenuItems/>
            </div>
            
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        </div>
    );
}
  

export default MenuPage