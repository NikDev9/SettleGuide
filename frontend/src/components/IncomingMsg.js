import '../css/Community.css';

const IncomingMsg = ({msg, time}) => {

    return (
        <div className="incoming_msg">
          <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
          <div className="received_msg">
            <div className="received_withd_msg">
              <p>{msg}</p>
              <span className="time_date">{time}</span>
            </div>
          </div>
        </div>
    );

}

export default IncomingMsg;