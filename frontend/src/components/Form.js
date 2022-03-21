import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import "../css/Form.css";

class Form extends Component {
  render() {
    return (
        <div className="Form">
          <div className="appAside" />
          <div className="appForm">
            <div className="pageSwitcher">
              <NavLink
                to="/sign-in"
                activeclassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign In
              </NavLink>
              <NavLink
                exact
                to="/sign-up"
                activeclassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign Up
              </NavLink>
            </div>

            { <div className="formTitle">
              <NavLink
                to="/sign-in"
                activeclassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign In
              </NavLink>{" "}
              or{" "}
              <NavLink
                exact
                to="/sign-up"
                activeclassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign Up
              </NavLink>
            </div> }
          </div>
        </div>
    );
  }
}

export default Form;