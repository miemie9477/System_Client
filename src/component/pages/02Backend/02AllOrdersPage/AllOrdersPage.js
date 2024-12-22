
import Frame from "../../../BasicFrame/frame";
import AllOrdersBody from "./AllOrdersBody";
import DeleteBtn from "./DeleteBtn";

const FixStyle = {
    position: "relative"
}

const AllOrdersPage = () => {
    return(
        <div style={FixStyle}>
            <Frame/>
            <AllOrdersBody/>
            <br/><br/>
            <DeleteBtn/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        </div>
    );
}
  

export default AllOrdersPage