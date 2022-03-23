import React, { useState } from 'react';
import '../css/Community.css';
import Header from './Header';
import { COMM_URL, COMM_MSG_URL, SEND_MSG_URL } from '../constants';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import Cookies from 'js-cookie';
import OutgoingMsg from './OutgoingMsg';
import IncomingMsg from './IncomingMsg';
import { useNavigate } from 'react-router-dom';

const Community = () => {

  const [comm, setCommData] = useState([]);
  const [messages, setMsg] = useState([]);
  const [userMsg, setuserMsg] = useState("");
  const [channel, setChannel] = useState(0);
  const [channelName, setChannelName] = useState(0);
  const [totalMsg, settotalMsg] = useState();
  const [show, setShow] = useState(false);
  const userId = Cookies.get("userId");
  const nav = useNavigate();

  //fetches all the communities that the user is member of
  const fetchData = () => {
    const req = {"userId": Cookies.get("userId")};
    axios.post(COMM_URL, req)
    .then(res => {
      //setter for variable comm
      setCommData(res.data);
    });
  }

  //used for calling the function once
  React.useEffect(() => {
    fetchData();
  }, [])

  const handleChange = (event) => {
    let target = event.target;
    let value = target.value;

    //sets variable message and stores the recent message sent by the user
    setuserMsg(value);
  }

  //renders the community list, implements iterator pattern in javascript. Also calls function to fetch a community's messages when clicked
  const showCommunityList = () => {

    if(comm != '') {
      return (
        <ListGroup>
          {comm.map((channel) =>
            <ListGroup.Item action onClick={() => getChannelData(channel.channelId, channel.name)}>
              <div className="ms-2 me-auto">
                <div className="fw-bold">{channel.name}</div>
                  {channel.info}
              </div>
            </ListGroup.Item>
          )}
        </ListGroup>
      );
    }
    else {
      return (
        <h2 className="noComm">Become a member of a community to get useful information.</h2>
      );
    }

  }

  //fetches community's messages and sets show to true so that the messages can be displayed
  const getChannelData = (id, name) => {
    setShow(true);
    const req = {"id": id};
    setChannel(id);
    setChannelName(name);
    axios.post(COMM_MSG_URL, req)
    .then(
      res => {
      setMsg(res.data.messages);
      settotalMsg(res.data.messages.length);
      var objDiv = document.getElementById("msgDiv");
      objDiv.scrollTop = objDiv.scrollHeight;
    });
  }

  const showMsg = (msg) => {

    //if the current message in the iterator is not the user's message then show as incoming message
    if(msg.userId != userId)
      return <IncomingMsg msg={msg.msg} time={msg.time} username={msg.username} />;
    else
      //otherwise call outgoingMsg component
      return <OutgoingMsg msg={msg.msg} time={msg.time} />;
  }

  //sends message to database by calling API
  const sendMsg = () => {
    const d = new Date();
    var time = d.getHours() + ':' + d.getMinutes();
    var name = Cookies.get('firstname');
    const req = {'msg': userMsg, 'channel': channel, 'totalMsg': totalMsg, 'time': time, 'name': name, 'userId': userId};
    axios.post(SEND_MSG_URL, req)
    .then(res => {
      setuserMsg('');
      getChannelData(channel, channelName);
    });
  }

  const openjoincommPage = () => {
    nav('/join-community');
  }

  //renders messages of a community
  const chatRoom = () => {
    if(show) {
      return (
      <div className="mesgs">
        <h3 className="channelHead">{channelName}</h3>
          <div className="msg_history" id="msgDiv">
            <div className='msgs'>
            {messages.map((msg) =>
              <div>
              {showMsg(msg)}
              </div>
            )}
            </div>
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <input type="text" value={userMsg} className="write_msg" placeholder="Type a message" onChange={handleChange} />
              <button class="msg_send_btn" type="button" onClick={() => sendMsg()}>Send</button>
            </div>
          </div>
        </div>
      );
    }
    else
    {
      return (
        <div class="mesgs">
        <button className="joinComm" type="button" onClick={() => openjoincommPage()}>Want to join more communities? Click here</button>
      </div>
      );
    }
  }

  //this is the first thing that is rendered when this page is opened. It calls showCommunityList to display community list 
  return (
    <div>
      <Header/>
      <div className="container">
        <div className="appAside">
          <h2 className="chnlHead">Your communities</h2> 
          {showCommunityList()}
        </div>
      <div>
        {chatRoom()}
      </div>
        </div>
    </div>
  );
}

export default Community;