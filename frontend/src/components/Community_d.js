import React, { Component, useState } from 'react';
import '../css/Community.css';
import Header from './Header';
import { COMM_URL, COMM_MSG_URL, SEND_MSG_URL } from '../constants';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import Cookies from 'js-cookie';
import OutgoingMsg from './OutgoingMsg';
import IncomingMsg from './IncomingMsg';
//import { observable, observe } from "mobx";
import { useObservable } from './custom-hooks';

const Community = () => {

  const [comm, setCommData] = useState([]);
  const [messages, setMsg] = useState([]);
  const [observable, setObservableState] = useObservable(messages);
  const [userMsg, setuserMsg] = useState("");
  const [channel, setChannel] = useState(0);
  const [totalMsg, settotalMsg] = useState();
  const userId = Cookies.get("userId");
  const show = true;

  const fetchData = () => {
    const req = {"userId": Cookies.get("userId")};
    axios.post(COMM_URL, req)
    .then(res => {
      setCommData(res.data);
    });
  }

  fetchData();

//   React.useEffect(() => {
//     fetchData();
//   }, [])

  const handleChange = (event) => {
    let target = event.target;
    let value = target.value;

    setuserMsg(value);
    console.log('userMsg', userMsg);
  }

  const getChannelData = (id) => {
    const req = {"id": id};
    setChannel(id);
    axios.post(COMM_MSG_URL, req)
    .then(res => {
      setMsg(res.data.messages);
      settotalMsg(res.data.messages.length);
      console.log('totalmsg: ',totalMsg)
    });
  }

//   useEffect(() => {
//     const myObservable = observable.pipe(
//       // Here is where we'd add RxJs operators to make magic happen.
//       // https://rxjs-dev.firebaseapp.com/guide/operators
//     )

//     myObservable.subscribe({
//       next: v => {
//         setMsg(v);
//       }
//     });

  const showMsg = (msg) => {

    if(msg.userId != userId) {
      console.log('incoming');
      return <IncomingMsg msg={msg.msg} time={msg.time} />;
    }
    else {
      console.log('outgoing');
      return <OutgoingMsg msg={msg.msg} time={msg.time} />;
    }
  }

  const sendMsg = () => {
    const d = new Date();
    var time = d.getHours() + ':' + d.getMinutes();
    var name = Cookies.get('firstname');
    const req = {'msg': userMsg, 'channel': channel, 'totalMsg': totalMsg, 'time': time, 'name': name, 'userId': userId};
    console.log('channel id: ', req)
    axios.post(SEND_MSG_URL, req)
    .then(res => {
      console.log('message sent');
    });
  }

  const chatRoom = () => {
    if(show) {
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
          <div className="msg_history">
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
              <input type="text" value={userMsg} class="write_msg" placeholder="Type a message" onChange={handleChange} />
              <button class="msg_send_btn" type="button" onClick={() => sendMsg()}><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      );
    }
    else
    {
      return (
        <div class="mesgs">
        <button class="joinComm" type="button">Join community channels</button>
      </div>
      );
    }
  }

    return (
        <div>
        <Header/>
        <div className="container">
          <div className="appAside"> 
            <ListGroup>
              {comm.map((channel) =>
                <ListGroup.Item action onClick={() => getChannelData(channel.channelId)}>
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{channel.name}</div>
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