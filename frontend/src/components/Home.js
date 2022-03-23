import React, { useState } from 'react';
import '../css/Home.css';
import Header from './Header.js';
import "bootstrap/dist/css/bootstrap.min.css";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { HOME_URL } from "../constants";
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './Config';

const Home = () => {

    //getter setter for page content
    const [homeData, setHomeData] = useState([]);
    const nav = useNavigate();
    const location = useLocation();

    //fetches data for home page by calling django API
    const fetchData = () => {
        var prov;
        try {
            prov = location.state.province;
        }
        catch {
            prov = Cookies.get('province');
        }
        const req = {'prov': prov};
        axios.post(HOME_URL, req)
        .then(res => {
            setHomeData(res.data);
        });
    }

    React.useEffect(() => {
        fetchData();
    })

    //called by clicking on an information card and opens new page that displays more info. Sends content to another component using props.
    const openInfo = (content) => {
        nav('/info', {
            state: {
            content: content }
        });
    }

    //toggles between closing and opening Guide Bot 
    const closeBot = () => {
        const targetDiv = document.getElementById("guidebot");
        const button = document.getElementById("botBtn");
        if (targetDiv.style.display !== "none") {
            targetDiv.style.display = "none";
            button.textContent = "Open Guide Bot";
          } else {
            targetDiv.style.display = "block";
            button.textContent = "Close Guide Bot";
          }
    }

    //renders content on the page
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

    //renders chatbot and calls showData() to render page contents
    return ( 
        <div>
            <Header/>
            <div className="Home">
                {showData()}
                <div className="bot" id="guidebot">
                    <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
                </div>
                <button className="botbutton" id="botBtn" onClick={() => closeBot()}>Close Guide Bot</button>
            </div>
        </div>
    );
}

export default Home;
