import React from 'react';
import { Component, useState } from 'react';
import {Button} from 'react-bootstrap'
import '../css/Home.css';
import Header from './Header.js';
import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { HOME_URL } from "../constants";
import { func } from 'prop-types';

const Home = () => {

    const [homeData, setHomeData] = useState();

    axios.get(HOME_URL)
    .then(res => {
        console.log(res.data);
        setHomeData(res.data);
        console.log('Data', this.homeData);
    });


        return ( 
            <div>
                <Header/>
                {/* <div className="Home">
                    <Row>
                        <Col>
                            <Card className="cardStyle">
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="cardStyle">
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="cardStyle">
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div> */}


            </div>
          );
}

export default Home;
