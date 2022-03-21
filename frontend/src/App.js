import React, { Component } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Community from "./components/Community";
import CreateComm from "./components/CreateComm";
import JoinCommunity from "./components/JoinCommunity";
import UserRequest from "./components/UserRequest";
import Info from "./components/Info";
import Province from "./components/Province";
import Cookies from "js-cookie";

const App = () => {

    return (
      <Router>
        <div className="App">
            <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/home" element={<Home/>} />
            <Route exact path="/community" element={<Community/>} />
            <Route exact path="/create-community" element={<CreateComm/>} />
            <Route exact path="/join-community" element={<JoinCommunity/>} />
            <Route exact path="/fetch-users" element={<UserRequest/>} />
            <Route exact path="/info" element={<Info/>} />
            <Route exact path="/province" element={<Province/>} />
            <Route exact path="/sign-up" element={<SignUp/>} />
            </Routes>
        </div>
      </Router>
    );
  }

export default App;
