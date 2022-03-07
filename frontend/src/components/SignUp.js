import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/SignUp.css';
import { USER_URL } from "../constants";
import axios from 'axios';

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      username: "",
      isAdmin: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {

    axios.get(USER_URL)
      .then(res => {
        console.log(res.data)
      })

    axios.post(USER_URL, this.state)
    .then(res => {
        this.setState({
            data: this.state
        })
        console.log('componentDidMount', this.state);
    })
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this.state);
    this.componentDidMount();

    console.log("The form was submitted with the following data:");
    console.log('handleSubmit', this.state);
  }

  render() {
    return (
      <div className="SignUp">
        <div className="appForm">
      <div className="formCenter">
        <form onSubmit={this.handleSubmit} className="formFields">
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
              value={this.state.username}
              onChange={this.handleChange}
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
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
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
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <button className="formFieldButton">Sign Up</button>{" "}
            <Link to="/sign-in" className="formFieldLink">
              I'm already member
            </Link>
          </div>
        </form>
      </div>
      </div>
      </div>
    );
  }
}
export default SignUp;
