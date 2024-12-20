import "./css/AwaitDeliveryPage.css"
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

const AwaitDeliveryBody = () => {

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
    console.log("Await Delivery:", rows);
    console.log("Await Delivery Detail:", detail);
    async function getRows() {
        try {
            const readyURL = `${process.env.REACT_APP_API_URL}/backend/ready`;
            const readyDetailURL = `${process.env.REACT_APP_API_URL}/backend/readyDetail`;
            
            // 發送第一個請求
            const readyResponse = await axios.get(readyURL);    
            setRows(readyResponse.data.map(transaction => ({
                orderNum: transaction.rId,
                total: transaction.total,
                name: transaction.name,
                phone: transaction.phone,
                time: transaction.tTime,
                payState: transaction.payState,
                orderState: transaction.tState,
                tRemark: transaction.tRemark
            })));
            
            const readyDetailResponse = await axios.get(readyDetailURL);
            setDetail(readyDetailResponse.data.map(item => ({
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

    // 目前插入區塊對應行的 orderNum
    const [expandedRow, setExpandedRow] = useState(null);
    // 點擊按鈕時切換區塊顯示/隱藏
    const toggleExpand = (orderNum) => {
        setExpandedRow(expandedRow === orderNum ? null : orderNum);
    };    
    
    // 處理按鈕點擊
    const DeliveryHandler = (orderNum) => {
    //     setRows((prevRows) =>
    //         prevRows.map((row) =>
    //             row.orderNum === orderNum ? { ...row, orderState: "已出餐" } : row
    //         )
    //     );
    // };
        const deliveryUrl = `${process.env.REACT_APP_API_URL}/act/delivery`;
        axios.post(deliveryUrl, {orderNum})
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
        <div className="AwaitDeliveryBody">
            <div className="ADBSwitchPage">
                <NavLink to="/AllOrdersPage"><button className="ADBNotHere">所有訂單</button></NavLink>
                <NavLink to="/AwaitPaymentPage"><button className="ADBNotHere">待付款</button></NavLink>
                <NavLink to="/AwaitDeliveryPage"><button className="ADBHere">待出餐</button></NavLink>
                <NavLink to="/DonePage"><button className="ADBNotHere">已完成</button></NavLink>
                <NavLink to="/CheckMenuPage" style={{marginLeft: "auto"}}><button className="ADBSwitchToData">切換到資料表管理</button></NavLink>
            </div>
            
            <table className="ADBOrderTable">
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
                            <td>{row.payState === 0 ? '未付款' : row.payState === 1 ? '已付款' : '退款'}</td>
                            {/* <td>{row.orderState === "未準備" ? (<button className="ADBOTDeliverySucceedButton" onClick={() => DeliveryHandler(row.orderNum)}>出餐</button>):("已出餐")}</td> */}
                            <td><button className="ADBOTDeliverySucceedButton" onClick={() => DeliveryHandler(row.orderNum)}>出餐</button></td>
                            <td>
                            <button className="ADBOTExpandButton" onClick={() => toggleExpand(row.orderNum)}>
                                {expandedRow === row.orderNum ? (<IoMdArrowDropup style={{ fontSize: "2vw", color: "#F4AC6D" }} />) : (<IoMdArrowDropdown style={{ fontSize: "2vw", color: "#F4AC6D" }} />)}
                            </button>
                            </td>
                        </tr>
                        {/* 插入的區塊 */}
                        {expandedRow === row.orderNum && (
                            <tr>
                            <td colSpan="7" className="ADBOExpandContentTD">
                                <div className="ADBOExpandContent" >
                                    {detail
                                    .filter((pNo) => pNo.orderNum === row.orderNum) // 篩選出 pid 為 row.orderNum 的資料
                                    .map((pNo, index) => (
                                        <div key={index}>
                                            <div className="ADBGoods">{pNo.pName}</div>
                                            <div className="ADBSpice">{pNo.rSpicy === 0 ? "不辣" : "要辣"}</div>
                                            <div className="ADBAdjustNum">
                                                <div className="ADBANCalculate">$ {pNo.rTotal / pNo.rAmount} × {pNo.rAmount} =</div>
                                                <div className="ADBANPrice">$ {pNo.rTotal}</div>
                                            </div>
                                            <div className="ADBGoodsLine"></div>                                            
                                        </div>
                                    ))}
                                    {/* <div className="ADBGoods">香雞排</div>
                                    <div className="ADBSpice">不辣</div>
                                    <div className="ADBAdjustNum">
                                        <div className="ADBANCalculate">$ {UnitPrice} × {Cart_num} =</div>
                                        <div className="ADBANPrice">$ {Cart_num*UnitPrice}</div>
                                    </div>
                                    <div className="ADBGoodsLine"></div> */}

                                    <div className="ADBRemark">
                                        <div className="ADBRText">訂單備註: </div>
                                        <div className="ADBRDetail">不要塑膠袋</div>
                                    </div>

                                    <div className="ADBSum">
                                        <div className="ADBSumTitle">小計</div>
                                        <div className="ADBSumPrice">$ {row.total}</div>
                                    </div>

                                    <div className="ADBDelete"><button className="ADBDeleteButton" onClick={() => DeleteHandler(row.orderNum)}>刪除訂單</button></div>
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
  

export default AwaitDeliveryBody