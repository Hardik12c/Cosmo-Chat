import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/index.css";
export default function Login({ showalert }) {
  const navigate = useNavigate();
  const postform = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email: email, password: password }
      );
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      showalert(error.response.data.messg, "danger");
    }
  };

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleinput = (e) => {
    setemail(e.target.value);
  };
  const handlepassword = (e) => {
    setpassword(e.target.value);
  };
  const submitform = async (e) => {
    e.preventDefault();
    await postform(email, password);
    setemail("");
    setpassword("");
  };
  return (
    <>
      <div className="container">
        <div className="mainbox">
          <form className="loginform">
            <h1>Sign In</h1>
            <div className="form-elements">
              <input
                type="email"
                id="loginemail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                className="form-control"
                value={email}
                onChange={handleinput}
              />
            </div>
            <div className="form-elements">
              <input
                type="password"
                id="loginpassword"
                placeholder="Password"
                className="form-control"
                name="password"
                value={password}
                onChange={handlepassword}
              />
            </div>
            <div className="submit-group">
              <button type="submit" className="submit" onClick={submitform}>
                Submit
              </button>
              <Link to={"/signup"}>Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
