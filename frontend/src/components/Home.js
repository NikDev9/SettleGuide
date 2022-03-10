import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import '../css/Home.css';
import Header from './Header.js';
import "bootstrap/dist/css/bootstrap.min.css";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { HOME_URL } from "../constants";
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import { app } from './FirebaseConfig';

const Home = () => {

    const [homeData, setHomeData] = useState([]);
    const [images, setImages] = useState([]);
    const imgUrls = [];
    const sarray = [1, 2, 3];
    const storageRef = getStorage(app);

    const fetchData = async () => {
        await axios.get(HOME_URL)
        .then(res => {
            setHomeData(res.data);
            homeData.map((data) => {

            const imgLink = data.img;

            // getDownloadURL(ref(storageRef, imgLink))
            //     .then((url) => {
            //         console.log('first url',url);
            //         imgUrls.push(url);
            //         setImages(imgUrls);
            // console.log('inside url',imgUrls);

            //     });

            });
        
            // console.log('url',imgUrls[1]);
            // console.log('array', sarray[0]);
        });
    }

    React.useEffect(() => {
        fetchData();
    }, [])


        return ( 
            <div>
                <Header/>
                { <div className="Home">
                    {/* <Row> */}
                    {homeData.map((card, index) => 
                        <Col>
                            <Card className="cardStyle">
                            <Card.Body>
                                <img src={card.img} />
                                <Card.Title>{card.heading}</Card.Title>
                                <Card.Text>{card.info}
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                            </Card>
                        </Col>
                        )}
                        {/* <Col>
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
                    </Row> */}
                </div> }


            </div>
          );
}

export default Home;
