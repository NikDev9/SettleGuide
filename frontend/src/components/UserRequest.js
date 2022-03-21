import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import Header from './Header';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FETCH_REQUESTS_URL, FETCH_COMM_ADMIN_URL, APPROVE_URL, REJECT_URL } from '../constants';
import '../css/UserRequest.css';

const UserRequest = ({}) => {

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [channelName, setchName] = useState("");
  const [channelId, setchId] = useState();
  const [requests, setReq] = useState([]);
  
  const fetchData = () => {
    const req = {"userId": Cookies.get("userId")};
      axios.post(FETCH_COMM_ADMIN_URL, req)
      .then(res => {
        setData(res.data);
      });
  }

  React.useEffect(() => {
    fetchData();
  }, [])

  const selectComm = (chId, name) => {
    setShow(true);
    setchName(name);
    setchId(chId);
    const req = {'chId': chId};
    axios.post(FETCH_REQUESTS_URL, req)
      .then(res => {
        setReq(res.data);
        console.log('fetch', res.data);
        for(let i=0; i<res.data.length; i++)
          requests.push(res.data[i].requests);
    });
  }
  
  const approve = (reqId, uid) => {
    const data = {"chId": channelId, "reqId": reqId, "userId": uid}
    axios.post(APPROVE_URL, data)
      .then(res => {
        selectComm(channelId, channelName);
        console.log(res.data);
    });
  }

  const reject = (reqId, uid) => {
    const data = {"chId": channelId, "reqId": reqId, "userId": uid}
    axios.post(REJECT_URL, data)
      .then(res => {
        selectComm(channelId, channelName);
        console.log(res.data);
    });
  }

  const showUsers = () => {
    if(show) {
      return (
        <div className="mesgs">
          <h3 className="channelHead">{channelName}</h3>
          {checkforReq()}
        </div>
      );
    }
    else {
      return (
        <div class="mesgs">
          <h1 className="msgheading">Click on a community to see the user requests.</h1>
        </div>
      );
    }
  }

  const checkforReq = () => {
    if(requests != '') {
      return (
        <div className="requests">
        {requests.map((req, index) =>
          <div id="fb">
            <p><b>{req.firstname} {req.lastname}</b> <br/></p>
            <p><b>Department: </b> <span>{req.dept}</span></p>
            <p><b>Major: </b> <span>{req.major}</span></p>
            <p><b>University/college: </b> <span>{req.uni}</span></p>
            <div id="button-block">
                <div id="confirm" onClick={() => approve(index, req.userId)}>Approve</div>
                <div id="delete" onClick={() => reject(index, req.userId)}>Reject</div>
            </div>
          </div>
        )}
        </div>
      );
    }
    else {
      return (
        <h3 className="noReq">No pending requests</h3>
      );
    }
  }

  const checkforCommunities = () => {
    if(data != '') {
      return (
        <div>
        {data.map((dt) => 
          <ListGroup.Item action onClick={() => selectComm(dt.chId, dt.name)}>
            <div className="ms-2 me-auto">
              <div className="fw-bold">{dt.name}</div>
              {dt.info}
            </div>
          </ListGroup.Item>
        )}
        </div>
      );
    }
    else {
      return (
        <h3 className="noComm">Create a community to view here</h3>
      );
    }
  }

    return (
        <div>
          <Header/>
          <div className="container">
            <div className="appAside">
              <h2 className="chnlHead">Communities</h2> 
              <ListGroup>
                {checkforCommunities()}
              </ListGroup>
            </div>
            <div>
                {showUsers()}
            </div>
          </div>
        </div>
    );
}

export default UserRequest;