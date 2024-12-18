import { HashRouter, Routes, Route, Link, withRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import ProtectedRoute from './ProtectedRoute';
import LoginPage from "./component/pages/00OtherPage/LoginPage";
import MenuPage from "./component/pages/00MenuPage/MenuPage";
import GoodsPage from "./component/pages/01GoodsPage/GoodsPage";
import CartPage from "./component/pages/01CartPage/CartPage";
import TransPage from "./component/pages/01TransPage/TransPage";
import AllOrdersPage from "./component/pages/02Backend/02AllOrdersPage/AllOrdersPage";
import AwaitPaymentPage from "./component/pages/02Backend/02AwaitPaymentPage/AwaitPaymentPage";
import AwaitDeliveryPage from "./component/pages/02Backend/02AwaitDeliveryPage/AwaitDeliveryPage";
import DonePage from "./component/pages/02Backend/02DonePage/DonePage";


function App() {
  return (
    <HashRouter basename="/">
        <ScrollToTop /> 
        <Routes>
          <Route index element = {<MenuPage/>}/>
          <Route path="GoodsPage" element={<GoodsPage/>} />
          <Route path="CartPage" element={<CartPage/>} />
          <Route path="LoginPage" element={<LoginPage/>}/>
          <Route path="CartPage/TransPage" element={<TransPage/>}/>
          <Route path="AllOrdersPage" element={<AllOrdersPage/>}/>
          <Route path="AwaitPaymentPage" element={<AwaitPaymentPage/>}/>
          <Route path="AwaitDeliveryPage" element={<AwaitDeliveryPage/>}/>
          <Route path="DonePage" element={<DonePage/>}/>
        </Routes>

    </HashRouter>
  );
}

export default App;
