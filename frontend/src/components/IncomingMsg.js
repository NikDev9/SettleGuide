import '../css/Community.css';

const IncomingMsg = ({msg, time, username}) => {

    return (
        <div className="incoming_msg">
          <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
          <div className="received_msg">
            <div className="received_withd_msg">
              <p className="username">{username}</p>
              <p>{msg}</p>
              <span className="time_date">{time}</span>
            </div>
          </div>
        </div>
    );

}

export default IncomingMsg;