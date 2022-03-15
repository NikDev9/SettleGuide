import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import '../css/Login.css';
import axios from 'axios';
import { SIGNIN_URL } from "../constants";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  const nav = useNavigate();
  const [userProfile, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    let target = event.target;
    let value = target.value;
    let name = target.name;

    setUser({
      ...userProfile,
      [name]: value
    });
  }

  const fetchData = async() => {

    await axios.post(SIGNIN_URL, userProfile)
    .then(res => {
         console.log('okay', res);
         if(res.data.userId != '')
          nav('/')
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
              value={userProfile.email}
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
              value={userProfile.password}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <button className="formFieldButton">Sign In</button>{" "}
            <Link to="/" className="formFieldLink">
              Create an account
            </Link>
          </div>

        </form>
      </div>
      </div>
      </div>
    );
}

export default Login;
