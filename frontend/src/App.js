import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Header from "./components/Header";
import Random from "./components/Random";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Routes>
            <Route exact path="/home" element={<Home/>} />
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/sign-in" element={<Login/>} />
            <Route exact path="/sign-up" element={<SignUp/>} />
            </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
