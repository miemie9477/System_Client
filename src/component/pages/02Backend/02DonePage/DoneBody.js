import "./css/DonePage.css"
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaTrashCan } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { NavLink } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { format } from "date-fns";
import axios from "axios";

const DoneBody = () => {

    const formatDate = (isoString) => {
        return format(new Date(isoString), "yyyy-MM-dd HH:mm:ss");
    };


    // 表格數據
    var [rows, setRows] = useState([{
        orderNum:"",
        total:"",
        name: "",
        phone:"",
        time:"2024-01-01T04:00:00.000Z",
        payState:"",
        orderState:"",
        tRemark:""
    }]);
    var [detail, setDetail] = useState([{
            orderNum: "",
            pNo: "",
            pName: "",
            rAmount: "",
            rTotal: "",
            rSpicy: ""
    }])

    useEffect(() =>{
        getRows();
    }, [])

    console.log("Done rows:", rows);
    console.log("Done Detail:", detail);

    async function getRows() {
        try {
            const doneUrl = `${process.env.REACT_APP_API_URL}/backend/done`;
            const doneDetailUrl = `${process.env.REACT_APP_API_URL}/backend/doneDetail`;
            
            // 發送第一個請求
            const doneResponse = await axios.get(doneUrl);    
            setRows(doneResponse.data.map(transaction => ({
                orderNum: transaction.rId,
                total: transaction.total,
                name: transaction.name,
                phone: transaction.phone,
                time: transaction.tTime,
                payState: transaction.payState,
                orderState: transaction.tState,
                tRemark: transaction.tRemark
            })));
            
            const doneDetailResponse = await axios.get(doneDetailUrl);
            setDetail(doneDetailResponse.data.map(item => ({
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

    const RefundHandler = (orderNum) => {
        // setRows((prevRows) =>
        //     prevRows.map((row) =>
        //         row.orderNum === orderNum ? { ...row, payState: "已退款" } : row
        //     )
        // );
        const refundUrl = `${process.env.REACT_APP_API_URL}/act/refund`;
        axios.post(refundUrl, {orderNum})
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

    // 目前插入區塊對應行的 ID
    const [expandedRow, setExpandedRow] = useState(null);

    // 點擊按鈕時切換區塊顯示/隱藏
    const toggleExpand = (orderNum) => {
        setExpandedRow(expandedRow === orderNum ? null : orderNum);
    };

    // 處理按鈕點擊
    
    

    const [Cart_num, setCart_num] = useState(1);

    const [UnitPrice, setUnitPrice] = useState(70);    

    return(
        <div className="DoneBody">
            <div className="DBSwitchPage">
                <NavLink to="/AllOrdersPage"><button className="DBNotHere">所有訂單</button></NavLink>
                <NavLink to="/AwaitPaymentPage"><button className="DBNotHere">待付款</button></NavLink>
                <NavLink to="/AwaitDeliveryPage"><button className="DBNotHere">待出餐</button></NavLink>
                <NavLink to="/DonePage"><button className="DBHere">已完成</button></NavLink>
                <NavLink to="/CheckMenuPage" style={{marginLeft: "auto"}}><button className="DBSwitchToData">切換到資料表管理</button></NavLink>
            </div>
            
            <table className="DBOrderTable">
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
                            {/* <td>{row.payState === "已付款" ? (<button className="DBOTRefundSucceedButton" onClick={() => RefundHandler(row.orderNum)}>退款</button>):("已退款")}</td> */}
                            <td><button className="DBOTRefundSucceedButton" onClick={() => RefundHandler(row.orderNum)}>退款</button></td>
                            <td>{row.orderState === 0 ? '未出餐' : '已出餐'}</td>
                            <td>
                            <button className="DBOTExpandButton" onClick={() => toggleExpand(row.orderNum)}>
                                {expandedRow === row.orderNum ? (<IoMdArrowDropup style={{ fontSize: "2vw", color: "#F4AC6D" }} />) : (<IoMdArrowDropdown style={{ fontSize: "2vw", color: "#F4AC6D" }} />)}
                            </button>
                            </td>
                        </tr>
                        {/* 插入的區塊 */}
                        {expandedRow === row.orderNum && (
                            <tr>
                            <td colSpan="7" className="DBOExpandContentTD">
                                <div className="DBOExpandContent" >
                                    {detail
                                    .filter((pNo) => pNo.orderNum === row.orderNum) // 篩選出 pid 為 row.orderNum 的資料
                                    .map((pNo, index) => (
                                        <div key={index}>
                                            <div className="DBGoods">{pNo.pName}</div>
                                            <div className="DBSpice">{pNo.rSpicy === 0 ? "不辣" : "要辣"}</div>
                                            <div className="DBAdjustNum">
                                                <div className="DBANCalculate">$ {pNo.rTotal / pNo.rAmount} × {pNo.rAmount} =</div>
                                                <div className="DBANPrice">$ {pNo.rTotal}</div>
                                            </div>
                                            <div className="DBGoodsLine"></div>                                            
                                        </div>
                                    ))}
                                    {/* <div className="DBGoods">香雞排</div>
                                    <div className="DBSpice">不辣</div>
                                    <div className="DBAdjustNum">
                                        <div className="DBANCalculate">$ {UnitPrice} × {Cart_num} =</div>
                                        <div className="DBANPrice">$ {Cart_num*UnitPrice}</div>
                                    </div>
                                    <div className="DBGoodsLine"></div> */}

                                    <div className="DBRemark">
                                        <div className="DBRText">訂單備註: </div>
                                        <div className="DBRDetail">不要塑膠袋</div>
                                    </div>

                                    <div className="DBSum">
                                        <div className="DBSumTitle">小計</div>
                                        <div className="DBSumPrice">$ {row.total}</div>
                                    </div>
                                    <div className="DBDelete"><button className="DBDeleteButton" onClick={() => DeleteHandler(row.orderNum)}>刪除訂單</button></div>
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
  

export default DoneBody