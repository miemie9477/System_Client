import axios from "axios";

const DeleteBtn = () =>{

    const CleanCart = () =>{
        /* eslint-disable no-restricted-globals */
        const message = "System message: Are you sure to clean all data in Cart and CartDetail?";
        if (confirm(message)) {
            console.log("Data cleared.");
            const url = `${process.env.REACT_APP_API_URL}/act/cleanCart`
            axios.get(url)
            .then(
                response =>{
                    if(response){
                        alert("System message: Clean Cart and CartDetail completely.")
                    }
                }
            )
            .catch(
                error =>{
                    console.log(error);
                    alert("System message: Failed.");
                }
            )
        }
        else {
            console.log("Operation canceled.");
        }
        /* eslint-enable no-restricted-globals */
        
    }

    const CleanTrans = () =>{
        /* eslint-disable no-restricted-globals */
        const message = "System message: Are you sure to clean all data in Transaction and Record?";
        if (confirm(message)) {
            console.log("Data cleared.");
            const url = `${process.env.REACT_APP_API_URL}/act/cleanTrans`
            axios.get(url)
            .then(
                response =>{
                    if(response){
                        alert("System message: Clean Transaction and Record completely.")
                    }
                }
            )
            .catch(
                error =>{
                    console.log(error);
                    alert("System message: Failed.");
                }
            )
        }
        else {
            console.log("Operation canceled.");
        }
        /* eslint-enable no-restricted-globals */
        
    }

    return(
        <div className="AllOrdersBody">
            <div className="AOBCleanOption">
                <button className="AOBCOCart" onClick={CleanCart}>清理 Cart & CartDetail 資料</button>
                <button className="AOBCOTrans" onClick={CleanTrans}>清理 Transaction & Record 資料</button>
            </div>

        </div>
    );
}

export default DeleteBtn;