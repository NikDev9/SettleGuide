import React, { Component } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Header from "./components/Header";
import Random from "./components/Random";
import Community from "./components/Community";
import CreateComm from "./components/CreateComm";
import JoinCommunity from "./components/JoinCommunity";
import FetchUsers from "./components/FetchUsers";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/home" element={<Home/>} />
            <Route exact path="/community" element={<Community/>} />
            <Route exact path="/create-community" element={<CreateComm/>} />
            <Route exact path="/join-community" element={<JoinCommunity/>} />
            <Route exact path="/fetch-users" element={<FetchUsers/>} />
            <Route exact path="/sign-up" element={<SignUp/>} />
            </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
