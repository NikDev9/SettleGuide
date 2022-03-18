import { ALL_COMM_URL, JOIN_COMM_URL } from "../constants";
import axios from "axios";
import React, { useState } from "react";
import Header from "./Header";
import '../css/JoinComm.css';
import Community from "./Community";
import Cookies from "js-cookie";

const JoinCommunity = () => {

    const userId = Cookies.get("userId");
    const [comm, setComm] = useState([]);

    const fetchCommunity = () => {
        axios.get(ALL_COMM_URL)
        .then(res => {
            setComm(res.data);
        })
    }

    React.useEffect(() => {
        fetchCommunity();
    });

    const joinRequest = (id) => {
        console.log('hi');
        const req = {"userId": userId, "commId": id};
        console.log('req: ', req);
        axios.post(JOIN_COMM_URL, req)
        .then(res => {
            alert('The request has been sent');
        })
    }

    return (
        <div>
            <Header />
            <div class="container1 d-flex justify-content-center">
                <ul class="list-group1 listGroup mt-5 text-white">
                    {comm.map((ch) =>
                    <li class="list-group-item listComm d-flex justify-content-between align-content-center">
                        <div class="d-flex flex-row"> <img src="https://images.app.goo.gl/n1tVzERbiqC6RLhg9" width="40" />
                            <div class="ml-2">
                                <h6 class="mb-0">{ch.name}</h6>
                                <div class="about"><span>{ch.info}</span></div>
                            </div>
                        </div>
                        <button class="joinbutton" onClick={() => joinRequest(ch.chId)}>Join</button>
                    </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default JoinCommunity;