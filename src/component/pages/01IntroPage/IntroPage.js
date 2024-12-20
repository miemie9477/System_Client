import Frame from "../../BasicFrame/frame";
import IntroBody from "./IntroBody";

const FixStyle = {
    position: "relative"
}

const IntroPage = () => {
    return(
        <div style={FixStyle}>
            <Frame/>
            
            <IntroBody/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        </div>
    );
}
  

export default IntroPage