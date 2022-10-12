import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const onLogout = () => {
    logout();
    navigate("/");
  };

  console.log(user);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-4">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link className="navbar-brand" to="/">
        MovieWorld
      </Link>
      <div className="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/new-movie">
                  Add Movie
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={logout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Log in
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
