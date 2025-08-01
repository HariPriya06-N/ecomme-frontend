import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  FaLaptop,
  FaMobileAlt,
  FaHeadphones,
  FaShoppingCart,
} from "react-icons/fa";
import "./Dashboard.css";
import { useCart } from "./CartContext";

const Dashboard = () => {
  const { cartItems } = useCart();
  const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const location = useLocation();

  const isAtDashboardRoot = location.pathname === "/dashboard";
  useEffect(() => {
  console.log("Cart changed! Items:", cartItems);
}, [cartItems]);


  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Product Categories</h2>
        <ul className="dashboard-links">
          <li>
            <NavLink to="laptops">
              <FaLaptop className="nav-icon" /> Laptops
            </NavLink>
          </li>
          <li>
            <NavLink to="mobiles">
              <FaMobileAlt className="nav-icon" /> Mobiles
            </NavLink>
          </li>
          <li>
            <NavLink to="headphones">
              <FaHeadphones className="nav-icon" /> Headphones
            </NavLink>
          </li>
          <li>
            <NavLink to="cart" className="cart-link">
              <div className="cart-icon-wrapper">
                <FaShoppingCart className="nav-icon" />
                {totalCount > 0 && (
                  <span className="cart-count">{totalCount}</span>
                )}
              </div>
              <span className="cart-label">Cart</span>
            </NavLink>
          </li>
        </ul>
      </aside>

      <main className="dashboard-content">
        {isAtDashboardRoot ? (
          <div className="welcome-container">
            <h1>🛍️ Welcome to Haripriya Store!</h1>
            <p>Select a category from the left to start shopping.</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/891/891419.png"
              alt="Welcome"
              style={{ width: "200px", marginTop: "20px" }}
            />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Dashboard;

