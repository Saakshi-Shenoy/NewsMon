import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <div>
      <nav
        className="navbar fixed-top navbar-expand-lg"
        style={{ backgroundColor: "rgb(4, 12, 51)", height:"80px", fontWeight:"bold" }}
      >
        <div className="container-fluid">
          <Link to="/">
            <img
              src="/images/main-logo.png"
              alt="logo"
              className="logo"
            />
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
            <ul className="navbar-nav mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" style={{fontSize: "19px"}} to="/general">
                  General
                </Link>
              </li>
              <li className="nav-item" style={{fontSize: "19px"}}>
                <Link className="nav-link" to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item" style={{fontSize: "19px"}}>
                <Link className="nav-link" to="/business">
                  Business
                </Link>
              </li>
              <li className="nav-item" style={{fontSize: "19px"}}>
                <Link className="nav-link" to="/health">
                  Health
                </Link>
              </li>
              <li className="nav-item" style={{fontSize: "19px"}}>
                <Link className="nav-link" to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item" style={{fontSize: "19px"}}>
                <Link className="nav-link" to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item" style={{fontSize: "19px"}}>
                <Link className="nav-link" to="/technology">
                  Technology
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

