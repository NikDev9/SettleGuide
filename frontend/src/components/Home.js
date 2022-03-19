import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import '../css/Home.css';
import Header from './Header.js';
import "bootstrap/dist/css/bootstrap.min.css";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { HOME_URL } from "../constants";
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import { app } from './FirebaseConfig';

const Home = () => {

    const [homeData, setHomeData] = useState([]);
    const [images, setImages] = useState([]);
    const storageRef = getStorage(app);

    const fetchData = async () => {
        await axios.get(HOME_URL)
        .then(res => {
            setHomeData(res.data);
            homeData.map((data) => {
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
                <div className="Home">
                    {homeData.map((card, index) => 
                        <Col>
                            <Card className="cardStyle" key={card.heading}>
                            <Card.Body>
                                <div className="cardimgdiv">
                                    <Card.Img className="cardimg" src={card.link} />
                                </div>
                                <Card.Title>{card.heading}</Card.Title>
                                <Card.Text>{card.info}
                                </Card.Text>
                                <button className="clickButton">See more</button>
                            </Card.Body>
                            </Card>
                        </Col>
                        )}
                </div>


            </div>
          );
}

export default Home;
