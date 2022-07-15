import React, { useState, useEffect, Fragment } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import Navigation from "./Navigation";
import "../assets/css/home.css"
import ImgSuper from "../assets/img/super.jpg"


const Home = (props) => {

    const [dato,setDato] = useState(null)

    useEffect(() => {

    },[])

  
    return(

        <Fragment>

            <Navigation></Navigation>

            <br></br>

            <Container className="body">

            <Alert variant="success">

            <Alert.Heading className="alertTitle">SUPERHEROES WEB 3.0</Alert.Heading>

            <br></br>
            <br></br>  

            <Row>

                <Col>

                    <Image rounded="true" className='imgPortada' src={require(`../assets/img/super.jpg`)} />
                
                </Col>


            </Row>


            <br></br> 

            <Row>

                <Col>

                    <h3 className='Titulo'>Diviertete al Maximo con los SuperHeroes de Marvel y Dc Comics.</h3>

                </Col>


            </Row>

            <br></br> 

            <Row>

                <Col>

                    <h5 className='SubTitulo'>Un superhéroe es un personaje de ficción cuyas características superan las del héroe clásico, generalmente con poderes sobrehumanos aunque no necesariamente, y entroncado con la ciencia ficción. Generados a finales de los año 1936 en la industria del comic book estadounidense, han gozado de multitud de adaptaciones a otros medios, especialmente el cine.</h5>

                </Col>


            </Row>

            <br></br> 

            <Row>

                <Col>

                  <Button size="lg" variant="danger" href="/grillaHeroe">SUPERHEROES</Button>

                </Col>


            </Row>


            </Alert>

            </Container>

        </Fragment>


    )


    


}

export default Home;