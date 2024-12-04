import { HashRouter, Routes, Route, Link, withRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import ProtectedRoute from './ProtectedRoute';
import LoginPage from "./component/pages/00OtherPage/LoginPage";
import MenuPage from "./component/pages/00MenuPage/MenuPage";
import GoodsPage from "./component/pages/01GoodsPage/GoodsPage";
import CartPage from "./component/pages/01CartPage/CartPage";

function App() {
  return (
    <HashRouter basename="/">
        <ScrollToTop /> 
        <Routes>
          <Route index element = {<MenuPage/>}/>
          <Route path="GoodsPage" element={<GoodsPage/>} />
          <Route path="CartPage" element={<CartPage/>} />
          <Route path="LoginPage" element={<LoginPage/>}/>
        </Routes>

    </HashRouter>
  );
}

export default App;
