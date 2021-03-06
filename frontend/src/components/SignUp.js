import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/SignUp.css';
import { USER_URL } from "../constants";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignUp = () => {

  const nav = useNavigate();
  //getter setter for user object
  const [user, setUser] = useState({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      university: "",
      dept: "",
      major: "",
      isAdmin: 0
    });

  const dept = ['Arts', 'Engineering', 'Science', 'Business', 'Education', 'Communication', 'Medicine', 'Social Work'];

  //calls API to send new user's data to store in the database
  const fetchData = () => {

    axios.post(USER_URL, user)
    .then(res => {
        if(res.data.userId != '') {
          Cookies.set("userId", res.data.userId);
          Cookies.set("firstname", res.data.name);
          Cookies.set("isAdmin", res.data.admin);
          nav('/province')
        }
        else
          alert("The account already exists");
    })
  }

  //sets user object when there's any change in the user input
  const handleChange = (event) => {
    let target = event.target;
    let value = target.value;
    let name = target.name;

    setUser({
      ...user,
      [name]: value
    });
  }

  //calls fetchData() on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  }

    //renders signup page
    return (
      <div className="SignUp">
      <div className="appForm">
      <h2 className="signupHeading">SIGNUP</h2>
      <div className="formCenter">
        <form onSubmit={handleSubmit} className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="firstname">
              First Name
            </label>
            <input
              type="text"
              className="formFieldInput"
              placeholder="Enter your first name"
              name="firstname"
              value={user.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="lastname">
              Last Name
            </label>
            <input
              type="text"
              className="formFieldInput"
              placeholder="Enter your last name"
              name="lastname"
              value={user.lastname}
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
            <select name="dept" className="selectDept" onChange={handleChange}>
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
            <button className="formFieldButton buttonM">Sign Up</button>{" "}
          </div>
          <Link to="/" className="formFieldLink textCenter">
            I'm already member
          </Link>
        </form>
      </div>
      </div>
      </div>
    );
  }
export default SignUp;
