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

    const openInfo = () => {
        nav('/info');
    }

    return ( 
        <div>
            <Header/>
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
                                <button className="clickButton" onClick={() => openInfo()}>See more</button>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </div>
        </div>
    );
}

export default Home;
