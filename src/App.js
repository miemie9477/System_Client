import { HashRouter, Routes, Route, Link, withRouter } from "react-router-dom";
import { LoginProvider } from "./ContextAPI";
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
import IntroPage from "./component/pages/01IntroPage/IntroPage";
import CheckMenuPage from "./component/pages/02Backend/02CheckMenu/CheckMenuPage";
import CheckMemberPage from "./component/pages/02Backend/02CheckMember/CheckMemberPage";


function App() {
  return (
    <HashRouter basename="/">
      <LoginProvider>
        <ScrollToTop /> 
        <Routes>
          <Route index element = {<MenuPage/>}/>
          <Route path="GoodsPage" element={<GoodsPage/>} />
          <Route path="CartPage" element={<CartPage/>} />
          <Route path="LoginPage" element={<LoginPage/>}/>
          <Route path="CartPage/TransPage" element={<TransPage/>}/>
          <Route path="AllOrdersPage" element={<ProtectedRoute element={<AllOrdersPage />} allowedRoles={[1]} />}/>
          <Route path="AwaitPaymentPage" element={<ProtectedRoute element={<AwaitPaymentPage />} allowedRoles={[1]} />}/>
          <Route path="AwaitDeliveryPage" element={<ProtectedRoute element={<AwaitDeliveryPage />} allowedRoles={[1]} />}/>
          <Route path="DonePage" element={<ProtectedRoute element={<DonePage />} allowedRoles={[1]} />}/>
          <Route path="IntroPage" element={<IntroPage/>}/>
          <Route path="CheckMenuPage" element={<ProtectedRoute element={<CheckMenuPage />} allowedRoles={[1]} />}/>
          <Route path="CheckMemberPage" element={<ProtectedRoute element={<CheckMemberPage />} allowedRoles={[1]} />}/>
        </Routes>
      </LoginProvider>
    </HashRouter>
  );
}

export default App;
