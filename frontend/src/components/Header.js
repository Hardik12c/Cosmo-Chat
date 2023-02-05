import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const logouttheuser = () => {
    localStorage.removeItem("token");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          Cosmo Chat
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

          {localStorage.getItem("token") ? (
            <Link
              className="btn btn-primary mx-2"
              onClick={logouttheuser}
              role="button"
              to="/login"
            >
              Logout
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </nav>
  );
}
