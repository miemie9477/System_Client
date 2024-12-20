import "./css/AwaitPaymentPage.css"
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaTrashCan } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { NavLink } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import axios from "axios";
import { format } from "date-fns";

const AwaitPaymentBody = () => {

    const formatDate = (isoString) => {
        return format(new Date(isoString), "yyyy-MM-dd HH:mm:ss");
    };

    // 表格數據
    const [rows, setRows] = useState([{
        orderNum:"",
        total:"",
        name: "",
        phone:"",
        time:"2024-01-01T04:00:00.000Z",
        payState:"",
        orderState:"",
        tRemark:""
    }]);
    const [detail, setDetail] = useState([{}])

    useEffect(() =>{
        getRows();
    }, [])

    console.log("Await Payment:", rows);
    console.log("Await Payment Detail:", detail);

    async function getRows() {
        try {
            const checkPayUrl = `${process.env.REACT_APP_API_URL}/backend/checkPay`;
            const checkDetailUrl = `${process.env.REACT_APP_API_URL}/backend/checkPayDetail`;
            
            // 發送第一個請求
            const checkPayResponse = await axios.get(checkPayUrl);    
            setRows(checkPayResponse.data.map(transaction => ({
                orderNum: transaction.rId,
                total: transaction.total,
                name: transaction.name,
                phone: transaction.phone,
                time: transaction.tTime,
                payState: transaction.payState,
                orderState: transaction.tState,
                tRemark: transaction.tRemark
            })));
            
            const checkDetailResponse = await axios.get(checkDetailUrl);
            setDetail(checkDetailResponse.data.map(item => ({
                orderNum: item.rId,
                pNo: item.pNo,
                pName: item.pName,
                rAmount: item.rAmount,
                rTotal: item.rTotal,
                rSpicy: item.rSpicy
            })));
        } catch (error) {
            console.error("Error in getRows:", error);
            throw error;
        }
    }

    // 目前插入區塊對應行的 ID
    const [expandedRow, setExpandedRow] = useState(null);

    // 點擊按鈕時切換區塊顯示/隱藏
    const toggleExpand = (orderNum) => {
        setExpandedRow(expandedRow === orderNum ? null : orderNum);
    };

    // 處理按鈕點擊
    const PaymentHandler = (orderNum) => {
        // setRows((prevRows) =>
        //     prevRows.map((row) =>
        //         row.orderNum === orderNum ? { ...row, payState: "已付款" } : row
        //     )
        // );
        const payBillUrl = `${process.env.REACT_APP_API_URL}/act/payBill`;
        axios.post(payBillUrl, {orderNum})
        .then(
            response =>{
                console.log(response.data);
                getRows();
            }
        )
        .catch(
            error =>{
                console.log(error);
            }
        )
    };

    const DeleteHandler = (orderNum) => {
        const deleteUrl = `${process.env.REACT_APP_API_URL}/act/delete`;
        axios.post(deleteUrl, {orderNum})
        .then(
            response =>{
                console.log(response.data);
                getRows();
            }
        )
        .catch(
            error =>{
                console.log(error);
            }
        )
    };

    const [Cart_num, setCart_num] = useState(1);
    const [UnitPrice, setUnitPrice] = useState(70);

    return(
        <div className="AwaitPaymentBody">
            <div className="APBSwitchPage">
                <NavLink to="/AllOrdersPage"><button className="APBNotHere">所有訂單</button></NavLink>
                <NavLink to="/AwaitPaymentPage"><button className="APBHere">待付款</button></NavLink>
                <NavLink to="/AwaitDeliveryPage"><button className="APBNotHere">待出餐</button></NavLink>
                <NavLink to="/DonePage"><button className="APBNotHere">已完成</button></NavLink>
                <NavLink to="/CheckMenuPage" style={{marginLeft: "auto"}}><button className="APBSwitchToData">切換到資料表管理</button></NavLink>
            </div>
            
            <table className="APBOrderTable">
                <thead>
                    <tr>
                        <th>訂單編號</th>
                        <th>送單時間</th>
                        <th>姓名</th>
                        <th>電話號碼</th>
                        <th>付款狀態</th>
                        <th>訂單狀態</th>
                    </tr>
                </thead>
                <tbody>

                    {rows.map((row) => (
                        <React.Fragment key={row.orderNum}>
                        {/* 正常的表格行 */}
                        <tr>
                            <td>{row.orderNum}</td>
                            <td>{formatDate(row.time)}</td>
                            <td>{row.name}</td>
                            <td>{row.phone}</td>
                            {/* <td>{row.payState === 0 ? (<button className="APBOTPaymentSucceedButton" onClick={() => PaymentHandler(row.orderNum)}>付款</button>):("已付款")}</td> */}
                            <td><button className="APBOTPaymentSucceedButton" onClick={() => PaymentHandler(row.orderNum)}>付款</button></td>
                            <td>{row.orderState === 0 ? '未出餐' : '已出餐'}</td>
                            <td>
                            <button className="APBOTExpandButton" onClick={() => toggleExpand(row.orderNum)}>
                                {expandedRow === row.orderNum ? (<IoMdArrowDropup style={{ fontSize: "2vw", color: "#F4AC6D" }} />) : (<IoMdArrowDropdown style={{ fontSize: "2vw", color: "#F4AC6D" }} />)}
                            </button>
                            </td>
                        </tr>
                        {/* 插入的區塊 */}
                        {expandedRow === row.orderNum && (
                            <tr>
                            <td colSpan="7" className="APBOExpandContentTD">
                                <div className="APBOExpandContent" >
                                    {detail
                                    .filter((pNo) => pNo.orderNum === row.orderNum) // 篩選出 pid 為 row.orderNum 的資料
                                    .map((pNo, index) => (
                                        <div key={index}>
                                            <div className="APBGoods">{pNo.pName}</div>
                                            <div className="APBSpice">{pNo.rSpicy === 0 ? "不辣" : "要辣"}</div>
                                            <div className="APBAdjustNum">
                                                <div className="APBANCalculate">$ {pNo.rTotal / pNo.rAmount} × {pNo.rAmount} =</div>
                                                <div className="APBANPrice">$ {pNo.rTotal}</div>
                                            </div>
                                            <div className="APBGoodsLine"></div>                                            
                                        </div>
                                    ))}
                                    {/* <div className="APBGoods">香雞排</div>
                                    <div className="APBSpice">不辣</div>
                                    <div className="APBAdjustNum">
                                        <div className="APBANCalculate">$ {UnitPrice} × {Cart_num} =</div>
                                        <div className="APBANPrice">$ {Cart_num*UnitPrice}</div>
                                    </div>
                                    <div className="APBGoodsLine"></div> */}

                                    <div className="APBRemark">
                                        <div className="APBRText">訂單備註: </div>
                                        <div className="APBRDetail">不要塑膠袋</div>
                                    </div>

                                    <div className="APBSum">
                                        <div className="APBSumTitle">小計</div>
                                        <div className="APBSumPrice">$ {row.total}</div>
                                    </div>

                                    <div className="APBDelete"><button className="APBDeleteButton" onClick={() => DeleteHandler(row.orderNum)}>刪除訂單</button></div>
                                </div>
                            </td>
                            </tr>
                        )}
                        </React.Fragment>
                    ))}
                    
                </tbody>
            
            </table>                
            
           
        </div>
    );
}
  

export default AwaitPaymentBody