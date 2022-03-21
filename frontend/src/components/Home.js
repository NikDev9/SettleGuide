import React, { useState } from 'react';
import '../css/Home.css';
import Header from './Header.js';
import "bootstrap/dist/css/bootstrap.min.css";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { HOME_URL } from "../constants";
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './Config';

const Home = () => {

    const [homeData, setHomeData] = useState([]);
    const nav = useNavigate();
    const location = useLocation();

    const fetchData = () => {
        var prov;
        try {
            prov = location.state.province;
        }
        catch {
            prov = Cookies.get('province');
        }
        console.log('prov', prov)
        const req = {'prov': prov};
        console.log('home: province: ',req)
        axios.post(HOME_URL, req)
        .then(res => {
            console.log('res data', res.data);
            setHomeData(res.data);
        });
    }

    React.useEffect(() => {
        fetchData();
    })

    const openInfo = (content) => {
        nav('/info', {
            state: {
            content: content }
        });
    }

    const showData = () => {
        if(homeData) {
            return (
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
                </div>
            );
        }
    }

    return ( 
        <div>
            <Header/>
            {/* <Chatbot /> */}
            <div className="Home">
                {showData()}
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
