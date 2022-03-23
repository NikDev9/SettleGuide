import { ALL_COMM_URL, JOIN_COMM_URL } from "../constants";
import axios from "axios";
import React, { useState } from "react";
import Header from "./Header";
import '../css/JoinComm.css';
import Cookies from "js-cookie";

const JoinCommunity = () => {

    const userId = Cookies.get("userId");
    const [comm, setComm] = useState([]);

    //Suggests communities that the user is not part of
    const fetchCommunity = async() => {
        const req = {"userId": userId}
        await axios.post(ALL_COMM_URL, req)
        .then(res => {
            setComm(res.data);
        })
    }

    React.useEffect(() => {
        fetchCommunity();
    }, []);

    //calls API to send user's join request
    const joinRequest = (id) => {
        const req = {"userId": userId, "commId": id};
        axios.post(JOIN_COMM_URL, req)
        .then(res => {
            alert('The request has been sent');
        })
        fetchCommunity();
    }

    //renders list of communities. Calls joinRequest() when user clicks on join button
    const showComm = () => {
        if(comm != '') {
            return (
                <ul class="list-group1 listGroup mt-5 text-white">
                    {comm.map((ch) =>
                        <li class="list-group-item listComm d-flex justify-content-between align-content-center">
                            <div class="d-flex flex-row"> <img height="50" width="50" src="https://i.pinimg.com/originals/43/9a/cf/439acfdbade09dd7208517d0838e1598.jpg" />
                                <div class="ml-2 listhead">
                                    <h6 class="mb-0">{ch.name}</h6>
                                    <div class="about"><span>{ch.info}</span></div>
                                </div>
                            </div>
                            <button class="joinbutton" onClick={() => joinRequest(ch.chId)}>Join</button>
                        </li>
                    )}
                </ul>
            );
        }
        else {
            return (
                <h2 className="noComm">Become a member of a community to get useful information. Loading...Please Wait</h2>
            );
        }
    }

    //calls showComm() to render communities
    return (
        <div>
            <Header />
            <div class="container1 d-flex justify-content-center">
                {showComm()}
            </div>
        </div>
    );
}

export default JoinCommunity;