import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./products.css"; 

const Mobiles = () => {
  const navigate = useNavigate();
  const [mobiles, setMobiles] = useState([]);

  const getMobiles = async () => {
    const { data } = await axios.get("https://ecomme-backend-production.up.railway.app/mobiles");
    setMobiles(data);
  };

  useEffect(() => {
    getMobiles();
  }, []);

  const product_details = (product) => {
    navigate("/dashboard/detailed", { state: product });
  };

  return (
    <div className="product-container">
      <h1 className="product-heading">Explore Mobiles</h1>
      <div className="product-wrapper">
        {mobiles.map((mobile, index) => (
          <div
            className="product-card"
            key={index}
            onClick={() => product_details(mobile)}
          >
            <img src={mobile.pimage} alt="mobile" />
            <h2>{mobile.pname}</h2>
            <h3>₹ {mobile.pcost}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mobiles;

