import "./css/frame.css"
import logo from "./pic/logo.png"
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import { useNavigate } from 'react-router-dom';
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import MenuPage from "../pages/00MenuPage/MenuPage";

const TopBarText = () => {

    

    return(
        <>
            <div className="TopBarListCss">
                <div className="TopBarTextLeftCss">
                    <ul >
                        <li><NavLink to="/"><img src={logo} alt="logo" className="TopLogo"/></NavLink></li>
                        <li><NavLink to="/"><div className="TBText_Title">就是炸 炸物專賣店</div></NavLink> </li>
                    </ul>
                </div>
                <div className="TopBarTextRightCss">
                    <div className="RightCss">
                        <NavLink to="/">菜單首頁</NavLink>
                        
                    </div>
                    <div className="RightCss">
                        <NavLink to="/IntroPage">店家資訊</NavLink> 
                        
                    </div>
                    <div className="RightCss">
                        <NavLink to="/LoginPage">後台登入</NavLink> 
                        
                    </div>
                    <div className="CartCss">
                        <NavLink to="/CartPage"><Button variant="outline-dark"><PiShoppingCartSimpleFill style={{fontSize:"2vw"}}/></Button></NavLink>
                    </div>
                </div>
            </div>

        </>
    );
}



export default TopBarText