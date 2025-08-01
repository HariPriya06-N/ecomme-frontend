import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./products.css";

const Headphones = () => {
  const navigate = useNavigate();
  const [headphones, setHeadphones] = useState([]);

  const getHeadphones = async () => {
    const { data } = await axios.get("https://ecomme-backend-production.up.railway.app/headphones");
    setHeadphones(data);
  };

  useEffect(() => {
    getHeadphones();
  }, []);

  const product_details = (product) => {
    navigate("/dashboard/detailed", { state: product });
  };

  return (
    <div className="product-container">
      <h1 className="product-heading">Explore Headphones</h1>
      <div className="product-wrapper">
        {headphones.map((headphone, index) => (
          <div
            className="product-card"
            key={index}
            onClick={() => product_details(headphone)}
          >
            <img src={headphone.pimage} alt={headphone.pname} />
            <h2>{headphone.pname}</h2>
            <h3>₹ {headphone.pcost}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Headphones;

