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
    const [comm, setComm] = useState({
        "name": "",
        "msg": "",
        "info": "",
        "userId": userId,
        "name": username,
        "time": ""
    });

    const create = () => {
        const d = new Date();
        var time = d.getHours() + ':' + d.getMinutes();
        setComm({'time': time});
        console.log('Created', comm);
        axios.post(CREATE_COMM_URL, comm)
        .then(res => {
            console.log('Created');
            nav('/community');
        })
    }

    const handleChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
    
        setComm({
            ...comm,
            [name]: value
          });
        console.log('comm', comm);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        create();
        console.log('handleSubmit');
    }

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