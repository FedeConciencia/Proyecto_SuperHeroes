import React, { useState, useEffect, Fragment } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Table from 'react-bootstrap/Table'
import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";
import Image from 'react-bootstrap/Image'
import "../assets/css/detalle.css"
import moment from 'moment';


const DetalleHeroe = (props) => {

    
    //Obtengo los datos pasados por search URL =>
    let {search} = useLocation();
    let query = new URLSearchParams(search)

    const[dato,setDato] = useState(null)

    const[poderes,setPoderes] = useState(null)

    const[url, setUrl] = useState(query.get("id"))

    useEffect(() => {

        getDato()

        setUrl(query.get("id"))

    },[query.get("id")])

    const getDato = async() => {

        try{

            const id = query.get("id")

            console.log("ID => ", id)

            if(id !== null && id !== undefined){

                const response = await fetch(`http://localhost:8080/SuperHeroes/HeroesServlet?action=buscarOne&idHeroe=${id}`, {

                    method:"GET",
                  

                })

                //Obtengo un Objeto =>
                const resJson = await response.json()

                console.log("DATOS SERVLET => ", resJson)

                console.log("Fecha => ", (resJson.aparicion))

                setDato(resJson)

                //Obtener los Poderes =>

                const responsePoderes = await fetch(`http://localhost:8080/SuperHeroes/HeroesServlet?action=obtenerPoderes&idHeroe=${id}`, {

                    method:"GET",
                  

                })

                const resJsonPoderes = await responsePoderes.json()

                console.log("Poderes Servlet => ", resJsonPoderes)

                setPoderes(resJsonPoderes)


               
            }

        }catch(error){

            console.log("Error => ", error)

        }


    }

    if(dato === null && poderes === null){

        return null

    }else if(dato !== null && poderes !== null){

        let casa = ""

        if(dato.casa === "dc"){

            casa = "dc.jpg"

        }else{

            casa = "marvel.jpg"

        }

        
        //Obtener lista de Poderes =>
        const listaPoderes = poderes.map((poder,i) => {

            return(

                <li key={i}>{poder}</li>

            )

        })


        return(

            <Fragment>

                <Navigation></Navigation>

                <br></br>

                <Alert variant="success">

                <div className="body">

                <Alert.Heading className="alertTitle">DETALLE HEROE</Alert.Heading>

                </div>

                <br></br>
                <br></br>

                <Row>

                    <Col>

                    <h3>{(dato.nombre).toString()}</h3>
                    
                    </Col>

                    <Col>
                    
                    
                    </Col>

                </Row>

                <br></br>

                <Row>

                    <Col>

                    <Image rounded="true" className='imagenDetalle' src={require(`../assets/img/${dato.img}`)} />
                    
                    </Col>

                    <Col>

                        <Row>

                            <Col>

                                
                                <h5>Biografia:</h5>
                                <br></br>
                                <h5>Fecha Aparicion:</h5>
                                <br></br>
                                <h5>Poderes:</h5>
                                <br></br>
                                <h5>Casa:</h5>
                                <br></br>

                        
                            </Col>

                            <Col>

                        
                                <h5>{dato.bio}</h5>
                                <br></br>
                                <h5>{moment(`${dato.aparicion.year}-${dato.aparicion.month}-${dato.aparicion.day}`).format('YYYY-MM-DD')}</h5>
                                <br></br>
                                <h5>{listaPoderes}</h5>
                                <br></br>
                                <Image rounded="true" className='imagenLogo' src={require(`../assets/img/${casa}`)}/>

                            </Col>


                        </Row>
                    
                    
                    </Col>

                </Row>

                <br></br>
                <br></br>

                <Row className="body">

                    <Col>

                    <Button variant="danger" size="lg" href="/grillaHeroe">VOLVER</Button>
                    
                    </Col>

                </Row>

                </Alert> 

            </Fragment>

        )

    }


}

export default DetalleHeroe;