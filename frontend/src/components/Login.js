import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import '../css/Login.css';
import axios from 'axios';
import { SIGNIN_URL } from "../constants";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = (props) => {

  const nav = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    let target = event.target;
    let value = target.value;
    let name = target.name;

    setUser({
      ...user,
      [name]: value
    });
  }

  const fetchData = async() => {

    await axios.post(SIGNIN_URL, user)
    .then(res => {
         Cookies.set("userId", res.data.userId);
         Cookies.set("firstname", res.data.name);
         Cookies.set("isAdmin", res.data.admin);      
         console.log('cookie login: ', Cookies.get("userId"));
         if(res.data.userId != '')
          nav('/home')
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  }

    return (
      <div className="Login">
        <div className="appAside" />
        <div className="appForm">
      <div className="formCenter">
        <h2 className="loginHeading">Login</h2>
        <form className="formFields" onSubmit={handleSubmit}>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <button className="formFieldButton buttonM">Sign In</button>{" "}
            <Link to="/sign-up" className="formFieldLink textCenter">
              Don't have an account? Create one
            </Link>
          </div>

        </form>
      </div>
      </div>
      </div>
    );
}

export default Login;