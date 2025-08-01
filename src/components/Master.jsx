import { BrowserRouter,Route,Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Laptops from "./Laptops";
import Mobiles from "./Mobiles";
import Headphones from "./Headphones";
import DetailedProduct from "./DetailedProduct";
import CartSummary from "./CartSummary";
import { CartProvider } from "./CartContext";
import ThankYou from "./ThankYou";

const Master=()=>{
    return(
        <>
        <CartProvider>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/dashboard" element={<Dashboard />}>
                  <Route  index path="laptops" element={<Laptops />} />
                    <Route path="mobiles" element={<Mobiles />} />
                    <Route path="headphones" element={<Headphones />} />
                    <Route path="cart" element={<CartSummary />} /> {/* 🛒 */}
                    <Route path="detailed" element={<DetailedProduct></DetailedProduct>}></Route>
                     <Route path="thank-you" element={<ThankYou />} />
            </Route>
           
    
        </Routes>
        </BrowserRouter>
        </CartProvider>
        </>
    )

}
export default Master;