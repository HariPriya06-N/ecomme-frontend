import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./detailed.css";
import { useCart } from "./CartContext";

const DetailedProduct = () => {
  const location = useLocation();
  const product = location.state;
  const { pname, pimage, pcost, pqty } = product;
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    if (quantity < pqty) setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${pname} (x${quantity}) added to cart! 🛒`);
  };

  const handleBuyNow = () => {
    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag",
      amount: Number(pcost) * quantity * 100,
      currency: "INR",
      name: "Haripriya E-Commerce",
      description: `Buying ${pname}`,
      handler: function (response) {
        alert("✅ Payment Successful!\nID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Haripriya",
        email: "hpd@gmail.com",
        contact: "9000000000",
      },
      theme: {
        color: "#2563eb",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="detail-container">
      <div className="detail-card">
        <img src={pimage} alt={pname} className="detail-image" />
        <div className="detail-info">
          <h1>{pname}</h1>
          <p className="price">₹ {pcost}</p>
          <p className="stock">Available Quantity: {pqty}</p>
          <div className="actions">
            <div className="qty-control">
              <button onClick={decreaseQty}>−</button>
              <span>{quantity}</span>
              <button onClick={increaseQty}>+</button>
            </div>
            <div className="btn-group">
              <button className="cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="buy-btn" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedProduct;
