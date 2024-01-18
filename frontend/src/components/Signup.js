import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/index.css";
export default function Signup({ showalert }) {
  const navigate = useNavigate();
  const [registerinput, setregisterinput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const postform = async (input) => {
    try {
      const { data } = await axios.post(
        "https://cosmochat-backend.onrender.com/api/auth/register",
        { name: input.name, email: input.email, password: input.password }
      );
      localStorage.setItem("token", data.token);
      showalert("Logged in successfully", "success");
      navigate("/");
    } catch (error) {
      showalert("Invalid Credentials", "danger");
    }
  };
  const handlechange = (e) => {
    setregisterinput({ ...registerinput, [e.target.name]: e.target.value });
  };
  const submitform = async (e) => {
    e.preventDefault();
    await postform(registerinput);
    setregisterinput({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="containe">
        <div className="mainbox">
          <form className="loginform">
            <h1>Create Account</h1>
            <div className="form-elements">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your Name"
                value={registerinput.name}
                onChange={handlechange}
                id="loginemail"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-elements">
              <input
                type="email"
                name="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter your Email"
                value={registerinput.email}
                onChange={handlechange}
                id="loginpassword"
              />
            </div>
            <div className="form-elements">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={registerinput.password}
                onChange={handlechange}
                id="password"
              />
            </div>
            <div className="submit-group">
              <button onClick={submitform} type="submit" className="submit">
                Submit
              </button>
              <Link to={"/login"}>Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
