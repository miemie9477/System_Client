import "./css/AllOrdersPage.css"
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


const AllOrdersBody = () => {

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

    var [expandedRow, setExpandedRow] = useState(null);

    useEffect(() => {
        // 請求所有交易資料
        const url = `${process.env.REACT_APP_API_URL}/backend/allTrans`;
        axios.get(url)
            .then(response => {
                console.log("All trans:", response.data);
                setRows(response.data.map(item => ({
                    orderNum: item.rId,
                    total: item.total,
                    name: item.name,
                    phone: item.phone,
                    time: item.tTime,
                    payState: item.payState,
                    orderState: item.tState,
                    tRemark: item.tRemark
                })));
            })
            .catch(error => {
                console.error("Error fetching transactions:", error);
            });

        // 請求所有交易詳細資料
        const detailURL = `${process.env.REACT_APP_API_URL}/backend/allTransDetail`;
        axios.get(detailURL)
        .then(response => {
            //console.log("All Transaction Detail:", response.data);
            setDetail(response.data.map(item => ({
                orderNum: item.rId,
                pNo: item.pNo,
                pName: item.pName,
                rAmount: item.rAmount,
                rTotal: item.rTotal,
                rSpicy: item.rSpicy
            })));
        })
        .catch(error => {
            console.error("Error fetching transaction details:", error);
        });
    }, []);

    // 目前插入區塊對應行的 orderNum
    console.log("detail:", detail);
    // 點擊按鈕時切換區塊顯示/隱藏
    const toggleExpand = (orderNum) => {
        setExpandedRow(expandedRow === orderNum ? null : orderNum);
    };
    

    const [Cart_num, setCart_num] = useState(1);

    const [UnitPrice, setUnitPrice] = useState(70);

    return(
        <div className="AllOrdersBody">
            <div className="AOBSwitchPage">
                <NavLink to="/AllOrdersPage"><button className="AOBHere">所有訂單</button></NavLink>
                <NavLink to="/AwaitPaymentPage"><button className="AOBNotHere">待付款</button></NavLink>
                <NavLink to="/AwaitDeliveryPage"><button className="AOBNotHere">待出餐</button></NavLink>
                <NavLink to="/DonePage"><button className="AOBNotHere">已完成</button></NavLink>
                <NavLink to="/CheckMenuPage" style={{marginLeft: "auto"}}><button className="AOBSwitchToData">切換到資料表管理</button></NavLink>
            </div>

            <table className="AOBOrderTable">
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
                                <td>
                                    {row.payState === 0 ? '未付款' : row.payState === 1 ? '已付款' : '退款'}
                                </td>
                                <td>
                                    {row.orderState === 0 ? '未出餐' : '已出餐'}    
                                </td>
                                <td>
                                <button className="AOBOTExpandButton" onClick={() => toggleExpand(row.orderNum)}>
                                    {expandedRow === row.orderNum ? (<IoMdArrowDropup style={{ fontSize: "2vw", color: "#F4AC6D" }} />) : (<IoMdArrowDropdown style={{ fontSize: "2vw", color: "#F4AC6D" }} />)}
                                </button>
                                </td>
                            </tr>
                        {/* 插入的區塊 */}
                        {expandedRow === row.orderNum && (
                            <tr>
                            <td colSpan="7" className="AOBOExpandContentTD">
                                <div className="AOBOExpandContent" >
                                    {detail
                                    .filter((pNo) => pNo.orderNum === row.orderNum) // 篩選出 pid 為 row.orderNum 的資料
                                    .map((pNo, index) => (
                                        <div key={index}>
                                            <div className="AOBGoods">{pNo.pName}</div>
                                            <div className="AOBSpice">{pNo.rSpicy === 0 ? "不辣" : "要辣"}</div>
                                            <div className="AOBAdjustNum">
                                                <div className="AOBANCalculate">$ {pNo.rTotal / pNo.rAmount} × {pNo.rAmount} =</div>
                                                <div className="AOBANPrice">$ {pNo.rTotal}</div>
                                            </div>
                                            <div className="AOBGoodsLine"></div>                                            
                                        </div>
                                    ))}
                                    {/* <div className="AOBGoods">香雞排</div>
                                    <div className="AOBSpice">不辣</div>
                                    <div className="AOBAdjustNum">
                                        <div className="AOBANCalculate">$ {UnitPrice} × {Cart_num} =</div>
                                        <div className="AOBANPrice">$ {Cart_num*UnitPrice}</div>
                                    </div>
                                    <div className="AOBGoodsLine"></div> */}

                                    <div className="AOBRemark">
                                        <div className="AOBRText">訂單備註: {row.tRemark}</div>
                                        <div className="AOBRDetail"></div>
                                    </div>

                                    <div className="AOBSum">
                                        <div className="AOBSumTitle">小計</div>
                                        <div className="AOBSumPrice">$ {row.total}</div>
                                    </div>
                                </div>
                            </td>
                            </tr>
                        )
                        }
                        
                        </React.Fragment>
                        
                    ))}
                    
                </tbody>
            
            </table>
            
                
            
           
        </div>
    );
}
  

export default AllOrdersBody