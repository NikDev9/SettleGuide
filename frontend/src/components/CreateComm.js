import React, { useState } from "react";
import '../css/Createcomm.css';
import Header from "./Header";
import axios from 'axios';
import { CREATE_COMM_URL } from "../constants";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CreateComm = () => {

    const nav = useNavigate();
    const userId = Cookies.get("userId");
    const username = Cookies.get("name");
    //community object
    const [comm, setComm] = useState({
        "name": "",
        "msg": "",
        "info": "",
        "userId": userId,
        "name": username,
        "time": ""
    });

    //calls django API to save the newly created API. After the creation is successful, user is navigated to another page
    const create = () => {
        const d = new Date();
        var time = d.getHours() + ':' + d.getMinutes();
        setComm({'time': time});
        axios.post(CREATE_COMM_URL, comm)
        .then(res => {
            nav('/community');
        })
    }

    //called as soon as there is a change in user input
    const handleChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
    
        //sets values of keys of the comm variable 
        setComm({
            ...comm,
            [name]: value
        });
    }

    //called when the form is submitted and calls create() to create the community
    const handleSubmit = (event) => {
        event.preventDefault();
        create();
    }

    //page rendering
    return (
        <div>
            <Header />
        <div className="createcomm">
          <div className="appForm">
            <div className="formCenter">
            <h2 className="heading">Create new community</h2>
            <form className="formFields" onSubmit={handleSubmit}>
                <div className="formField">
                <label className="formFieldLabel" htmlFor="name">
                    Community name
                </label>
                <input
                    type="text"
                    className="formFieldInput"
                    placeholder="Enter community's name"
                    name="name"
                    value={comm.name}
                    onChange={handleChange}
                />
                </div>
    
                <div className="formField">
                <label className="formFieldLabel" htmlFor="info">
                    Description
                </label>
                <input
                    type="text"
                    className="formFieldInput"
                    placeholder="Enter description"
                    name="info"
                    value={comm.info}
                    onChange={handleChange}
                />
                </div>
                <div className="formField">
                <label className="formFieldLabel" htmlFor="info">
                    Initial message
                </label>
                <input
                    type="text"
                    className="formFieldInput"
                    placeholder="Enter your first message"
                    name="msg"
                    value={comm.msg}
                    onChange={handleChange}
                />
                </div>
    
                <div className="formField">
                <button className="formFieldButton buttonM">Create community</button>{" "}
                </div>
    
            </form>
            </div>
        </div>
        </div>
        </div>
      );

}

export default CreateComm;