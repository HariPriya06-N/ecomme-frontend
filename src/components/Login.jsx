import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

const Login = () => {
  const uname = useRef(null);
  const upwd = useRef(null);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const login = async () => {
    const username = uname.current.value.trim();
    const password = upwd.current.value.trim();

    if (!username || !password) {
      setErrorMsg("Both username and password are required.");
      return;
    }

    try {
      const response = await axios.post("https://ecomme-backend-production.up.railway.app/login", {
        username,
        password,
      });

      if (response.data === "Login success") {
        navigate("/dashboard");
      } else {
        setErrorMsg("Invalid credentials. Try again.");
      }
    } catch (error) {
      console.error("Error during login", error);
      setErrorMsg("Server error. Please try later.");
    }
  };

  return (
    <div className="login-container">
      <fieldset className="login-box">
        <legend className="login-title">LOGIN</legend>
        {errorMsg && <div className="login-error">{errorMsg}</div>}
        <input type="text" ref={uname} placeholder="Enter username" className="login-input" />
        <input type="password" ref={upwd} placeholder="Enter password" className="login-input" />
        <button onClick={login} className="login-button">Login</button>
      </fieldset>
    </div>
  );
};

export default Login;
