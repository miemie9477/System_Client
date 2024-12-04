import Frame from "../../BasicFrame/frame";
import GoodsBody from "./GoodsBody";
import { useLocation } from 'react-router-dom';
const FixStyle = {
    position: "relative"
}

const GoodsPage = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const pNo = queryParams.get('pNo');
    console.log(pNo);

    return(
        <div style={FixStyle}>
            <Frame/>
            <GoodsBody pNo={pNo}/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        </div>
    );
}
  

export default GoodsPage