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

  const fetchData = () => {
    const req = {"userId": Cookies.get("userId")};
    axios.post(COMM_URL, req)
    .then(res => {
      setCommData(res.data);
    });
  }

  React.useEffect(() => {
    fetchData();
  }, [])

  const handleChange = (event) => {
    let target = event.target;
    let value = target.value;

    setuserMsg(value);
    console.log('userMsg', userMsg);
  }

  const getChannelData = (id, name) => {
    setShow(true);
    console.log('channel data', id);
    console.log('show', show);
    const req = {"id": id};
    setChannel(id);
    setChannelName(name);
    axios.post(COMM_MSG_URL, req)
    .then(
      res => {console.log('comm_msg', res.data.messages);
      setMsg(res.data.messages);
      settotalMsg(res.data.messages.length);
      var objDiv = document.getElementById("msgDiv");
      objDiv.scrollTop = objDiv.scrollHeight;
      //chatRoom();
    });
    // .then(res => {
    //   //const messages = useObservableSuspense(res.data.messages);
    //   setMsg(res.data.messages);
    //   //console.log('messages', messages.props.msg);
    //   settotalMsg(res.data.messages.length);
    // });
  }

  const showMsg = (msg) => {

    if(msg.userId != userId)
      return <IncomingMsg msg={msg.msg} time={msg.time} username={msg.username} />;
    else
      return <OutgoingMsg msg={msg.msg} time={msg.time} />;
  }

  const sendMsg = () => {
    const d = new Date();
    var time = d.getHours() + ':' + d.getMinutes();
    var name = Cookies.get('firstname');
    const req = {'msg': userMsg, 'channel': channel, 'totalMsg': totalMsg, 'time': time, 'name': name, 'userId': userId};
    console.log('req', req);
    axios.post(SEND_MSG_URL, req)
    .then(res => {
      console.log('message sent');
      setuserMsg('');
      getChannelData(channel, channelName);
    });
  }

  const openjoincommPage = () => {
    nav('/join-community');
  }

  const chatRoom = () => {
    console.log('chatroom')
    if(show) {
      console.log('chatroom1')
      return (
      // <div class="chatRoom">
      //   <div className="room-chat">
      //     <div className="message left">Hello</div>
      //     <div className="message right">Hello</div>
      //   </div>
      //   <form>
      //     <input className="input-chat" placeholder="Type a message" autoFocus={true} />
      //   </form>
      //   </div> 
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
      console.log('chatroom2')
      return (
        <div class="mesgs">
        <button className="joinComm" type="button" onClick={() => openjoincommPage()}>Click here to join community channels</button>
      </div>
      );
    }
  }

    return (
        <div>
        <Header/>
        <div className="container">
          <div className="appAside">
            <h2 className="chnlHead">Your channels</h2> 
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
          </div>
          <div>
            {chatRoom()}
          </div>
        </div>
      </div>
    );
  }

export default Community;