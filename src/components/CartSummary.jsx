// import "./CartSummary.css";
// import { useCart } from "./CartContext";
// import { FaTrashAlt } from "react-icons/fa";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CartSummary = () => {
//   const navigate = useNavigate();
//   const { cartItems, removeFromCart, clearCart } = useCart();
//   const [whatsappStatus, setWhatsappStatus] = useState('');

//   // Debug log
//   console.log("Cart items:", cartItems);

//   const total = cartItems.reduce((sum, item) => sum + (item.pcost || 0) * (item.qty || 0), 0);

//   const generateCartMessage = () => {
//     const items = cartItems.map(item =>
//       `• ${item.pname} x ${item.qty} - ₹${item.pcost * item.qty}`
//     ).join('\n');

//     return `🛒 *Your Order Summary:*\n${items}\n\n*Total: ₹${total}*\nThank you for shopping with us! 😊`;
//   };

//   const handlePostPayment = async () => {
//     try {
//       const message = generateCartMessage();
//       await axios.post('https://ecomme-backend-production.up.railway.app/send-whatsapp', { message });
//       setWhatsappStatus('✅ Message sent!');
//     } catch (err) {
//       console.error("WhatsApp Error:", err);
//       setWhatsappStatus('❌ Failed to send message.');
//     }

//     clearCart();
//     localStorage.removeItem("cart");
//     navigate('/dashboard/thank-you');
//   };

//   const handlePayment = () => {
//     const options = {
//       key: "rzp_test_1DP5mmOlF5G5ag",
//       amount: total * 100,
//       currency: "INR",
//       name: "Haripriya Store",
//       description: "E-Commerce Test Payment",
//       handler: () => {
//         alert("Payment successful!");
//         handlePostPayment();
//       },
//       prefill: {
//         name: "Haripriya",
//         email: "hari@example.com",
//         contact: "9999999999",
//       },
//       notes: {
//         address: "Demo project",
//       },
//       theme: {
//         color: "#0f62fe",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div className="cart-container">
//       <div className="cart-box">
//         <h2>🧾 Invoice Summary</h2>

//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Product</th>
//                   <th>Cost</th>
//                   <th>Qty</th>
//                   <th>Total</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item) => (
//                   <tr key={item.pid}>
//                     <td>{item.pname}</td>
//                     <td>₹ {item.pcost}</td>
//                     <td>{item.qty}</td>
//                     <td>₹ {item.pcost * item.qty}</td>
//                     <td>
//                       <FaTrashAlt
//                         onClick={() => removeFromCart(item.pid)}
//                         className="delete-icon"
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot>
//                 <tr>
//                   <td colSpan="4"><strong>Grand Total</strong></td>
//                   <td><strong>₹ {total}</strong></td>
//                 </tr>
//               </tfoot>
//             </table>

//             <button className="pay-btn" onClick={handlePayment}>
//               Pay Now
//             </button>

//             {whatsappStatus && <p>{whatsappStatus}</p>}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartSummary;
import "./CartSummary.css";
import { useCart } from "./CartContext";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [whatsappStatus, setWhatsappStatus] = useState('');

  console.log("Cart items:", cartItems); // Debug

  const total = cartItems.reduce((sum, item) => sum + (item.pcost || 0) * (item.qty || 0), 0);

  const generateCartMessage = () => {
    const items = cartItems.map(item =>
      `• ${item.pname} x ${item.qty} - ₹${item.pcost * item.qty}`
    ).join('\n');

    return `🛒 *Your Order Summary:*\n${items}\n\n*Total: ₹${total}*\nThank you for shopping with us! 😊`;
  };

  const handlePostPayment = async () => {
    try {
      const message = generateCartMessage();
      await axios.post('https://ecomme-backend-production.up.railway.app/send-whatsapp', { message });
      setWhatsappStatus('✅ Message sent!');
    } catch (err) {
      console.error("WhatsApp Error:", err);
      setWhatsappStatus('❌ Failed to send message.');
    }

    clearCart();
    localStorage.removeItem("cart");
    navigate('/dashboard/thank-you');
  };

  const handlePayment = () => {
    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag",
      amount: total * 100,
      currency: "INR",
      name: "Haripriya Store",
      description: "E-Commerce Test Payment",
      handler: () => {
        alert("Payment successful!");
        handlePostPayment();
      },
      prefill: {
        name: "Haripriya",
        email: "hari@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Demo project",
      },
      theme: {
        color: "#0f62fe",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="cart-container">
      <div className="cart-box">
        <h2>🧾 Invoice Summary</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Cost</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.uniqueId}>
                    <td>{item.pname}</td>
                    <td>₹ {item.pcost}</td>
                    <td>{item.qty}</td>
                    <td>₹ {item.pcost * item.qty}</td>
                    <td>
                      <FaTrashAlt
                        onClick={() => removeFromCart(item.uniqueId)}
                        className="delete-icon"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4"><strong>Grand Total</strong></td>
                  <td><strong>₹ {total}</strong></td>
                </tr>
              </tfoot>
            </table>

            <button className="pay-btn" onClick={handlePayment}>
              Pay Now
            </button>

            {whatsappStatus && <p>{whatsappStatus}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
