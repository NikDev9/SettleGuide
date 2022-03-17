import '../css/Community.css';

function OutgoingMsg(props) {

    return (
        <div className="outgoing_msg">
          <div className="sent_msg">
            <p>{props.msg}</p>
            <span className="time_date">{props.time}</span>
          </div>
        </div>
    );

}

export default OutgoingMsg;