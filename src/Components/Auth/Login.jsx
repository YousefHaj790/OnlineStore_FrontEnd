import React, { useState } from "react";
import "../Styles/Login.css";
import MainLogin from "../Images/Main Icon.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { Return } = location.state || { Return: "block" };





  const signIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3005/profile/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("userid", data.user._id);
        sessionStorage.setItem("username", data.user.firstName);
        sessionStorage.setItem("ProfilePic", data.user.profileImage);
        sessionStorage.setItem("address", data.user.address);


        navigate("/Products/Grocery");
        window.location.reload()
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
   



  
  
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <form style={{ display: Return }} className="login-form" onSubmit={signIn}>
          <div className="input-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="signin-button" type="submit">
            Sign in
          </button>
          <br />
          <br />

          {error && <div className="error-message">{error}</div>}

          <Link to="/Register" state={{ Return: "none" }}>
            <button className="signup-button">
              Sign up now!
            </button>
          </Link>

          <div className="icon-container">
            <img src={MainLogin} alt="Main Icon" width={80} height={80} />
          </div>
        </form>

        <Outlet />
      </div>
    </div>
  );
};

export default Login;
