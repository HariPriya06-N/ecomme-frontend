import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./products.css";

const Laptops = () => {
  const navigate = useNavigate();
  const [laptops, setLaptops] = useState([]);

  const getLaptops = async () => {
    const { data } = await axios.get("https://ecomme-backend-production.up.railway.app/laptops");
    setLaptops(data);
  };

  useEffect(() => {
    getLaptops();
  }, []);

  const details_product = (product) => {
    navigate("/dashboard/detailed", { state: product });
  };

  return (
    <div className="product-container">
      <h1 className="product-heading">Explore Laptops</h1>
      <div className="product-wrapper">
        {laptops.map((laptop, index) => (
          <div
            className="product-card"
            key={index}
            onClick={() => details_product(laptop)}
          >
            <img src={laptop.pimage} alt={laptop.pname} />
            <h2>{laptop.pname}</h2>
            <h3>₹ {laptop.pcost}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Laptops;

