import "./css/frame.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './pic/logo.png'
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';

// const visier = () => {
//     // Cookies.set('visiter_counter', 0, { path: '/' })
//     var allowed;
//     // 检测某个 cookie 是否存在
//     if (Cookies.get('visiter_counter')) 
//     {
//         if(allowed === true){
//             let currentValue = parseFloat(Cookies.get('visiter_counter'))
//             Cookies.set('visiter_counter', currentValue + 0.5, {path: '/'})
//             allowed = false
//         }
//     } 
//     else 
//     {
//         Cookies.set('visiter_counter', 1, {path: '/'})
//         allowed = true;
//     }

//     return Cookies.get('visiter_counter')
// }

// const visiter_style={
//     fontWeight : "bold",
//     borderColor : "white",
//     borderStyle : "solid",
//     borderWidth : "1px",
//     padding : "5px",
//     margin: "0 auto"

// }

const BottomBar = () =>{
    return(
        <>
            <div className="BottomBarAreaCss">
                <Container className="BottomText">
                    <Row>
                        <Col>
                            <NavLink to="/" style={{display:"flex",justifyContent:"center"}}><img src={logo} alt="logo" className="BottomLogo"/></NavLink>
                        </Col>
                        <Col>
                            <div className="BText_Title">就是炸 炸物專賣店</div>
                            <div className="BText_content">店家地址: 高雄市苓雅區永昌街66號</div>
                            <div className="BText_content">聯絡電話: 0958310393</div>
                            <div className="BText_content">營業時間: 週一至週五 10:30~18:30</div>
                        </Col>
                    </Row>
                </Container>    
                
            </div>
        </>
    );
}
// 468 70
export default BottomBar