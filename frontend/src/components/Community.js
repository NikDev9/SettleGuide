import React, { Component, useState } from 'react';
import '../css/Community.css';
import Header from './Header';
import { COMM_URL } from '../constants';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';

const Community = () => {

  const [comm, setCommData] = useState([]);
  const show = true;

  const fetchData = () => {
    axios.get(COMM_URL)
    .then(res => {
        setCommData(res.data);
    });
  }

  fetchData();

  // React.useEffect(() => {
  //   fetchData();
  // }, [])

  const getChannelData = () => {
    console.log('hi');
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
      <div class="mesgs">
          <div class="msg_history">
            <div class="incoming_msg">
              <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p>Test which is a new approach to have all
                    solutions</p>
                  <span class="time_date"> 11:01 AM    |    June 9</span></div>
              </div>
            </div>
            <div class="outgoing_msg">
              <div class="sent_msg">
                <p>Test which is a new approach to have all
                  solutions</p>
                <span class="time_date"> 11:01 AM    |    June 9</span> </div>
            </div>
            <div class="incoming_msg">
              <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p>Test, which is a new approach to have</p>
                  <span class="time_date"> 11:01 AM    |    Yesterday</span></div>
              </div>
            </div>
            <div class="outgoing_msg">
              <div class="sent_msg">
                <p>Apollo University, Delhi, India Test</p>
                <span class="time_date"> 11:01 AM    |    Today</span> </div>
            </div>
            <div class="incoming_msg">
              <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p>We work directly with our designers and suppliers,
                    and sell direct to you, which means quality, exclusive
                    products, at a price anyone can afford.</p>
                  <span class="time_date"> 11:01 AM    |    Today</span></div>
              </div>
            </div>
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <input type="text" class="write_msg" placeholder="Type a message" />
              <button class="msg_send_btn" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
            </div>
          </div>
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
                <ListGroup.Item action onClick={getChannelData()}>
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{channel.name}</div>
                    {channel.lastMsg}
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