import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/SignUp.css';
import { USER_URL } from "../constants";
import axios from 'axios';

const SignUp = () => {

    const [user, setUser] = useState({
      email: "",
      password: "",
      username: "",
      university: "",
      dept: "",
      major: "",
      isAdmin: 0
    });

  const dept = ['Arts and Sciences', 'Engineering', 'Fine arts', 'Business', 'Education', 'Communication', 'Health sciences', 'Social Work', 'Theatre'];

  const fetchData = async() => {

    await axios.get(USER_URL)
      .then(res => {
        console.log(res.data)
      })

    await axios.post(USER_URL, user)
    .then(res => {
        // this.setState({
        //     data: state
        // })
        console.log('componentDidMount', user);
    })
  }

  const handleChange = (event) => {
    let target = event.target;
    let value = target.value;
    let name = target.name;

    setUser({
      ...user,
      [name]: value
    });
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    fetchData();
    console.log('handleSubmit', user);
  }
    return (
      <div className="SignUp">
        <div className="appForm">
      <div className="formCenter">
        <form onSubmit={handleSubmit} className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="username">
              Full Name
            </label>
            <input
              type="text"
              id="username"
              className="formFieldInput"
              placeholder="Enter your full name"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="university">
              University/College
            </label>
            <input
              type="text"
              className="formFieldInput"
              placeholder="Enter your university/college name"
              name="university"
              value={user.university}
              onChange={handleChange}
            />
          </div>
          <div className="formField">
            <label className= "formFieldLabel" htmlFor="department">
              Department
            </label>
            <select name="dept" onChange={handleChange}>
              {dept.map((dt) => 
              <option value={dt}>{dt}</option>
              )}
            </select>
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="major">
              Major
            </label>
            <input
              type="text"
              className="formFieldInput"
              placeholder="Enter your major"
              name="major"
              value={user.major}
              onChange={handleChange}
            />
          </div>
          <div className="formField">
            <button className="formFieldButton">Sign Up</button>{" "}
          </div>
          <Link to="/sign-in" className="formFieldLink">
            I'm already member
          </Link>
        </form>
      </div>
      </div>
      </div>
    );
  }
export default SignUp;
