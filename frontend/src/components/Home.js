import React, { useState } from 'react';
import '../css/Home.css';
import Header from './Header.js';
import "bootstrap/dist/css/bootstrap.min.css";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { HOME_URL } from "../constants";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './Config';

const Home = () => {

    const [homeData, setHomeData] = useState([]);
    const nav = useNavigate();

    const fetchData = async () => {
        const req = {'prov': Cookies.get('province')};
        await axios.post(HOME_URL, req)
        .then(res => {
            setHomeData(res.data);
        });
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    const openInfo = (content) => {
        nav('/info', {
            state: {
            content: content }
        });
    }

    return ( 
        <div>
            <Header/>
            {/* <Chatbot /> */}
            <div className="Home">
                {homeData.map((card) => 
                    <Col>
                        <Card className="cardStyle" key={card.heading}>
                            <Card.Body>
                                <div className="cardimgdiv">
                                    <Card.Img className="cardimg" src={card.imglink} />
                                </div>
                                <Card.Title>{card.heading}</Card.Title>
                                <Card.Text>{card.shortinfo}
                                </Card.Text>
                                <button className="clickButton" onClick={() => openInfo(card.content)}>See more</button>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
                <div className="bot">
                    {/* <header className="App-header"> */}
                    <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
      {/* </header> */}
                </div>
                {/* <Chatboto /> */}
            </div>
        </div>
    );
}

export default Home;
