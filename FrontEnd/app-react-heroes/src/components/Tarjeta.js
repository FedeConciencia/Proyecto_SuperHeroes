import React, { useState, useEffect, Fragment } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Table from 'react-bootstrap/Table'
import Navigation from "./Navigation";
import Card from 'react-bootstrap/Card'
import '../assets/css/tarjeta.css'


const Tarjeta = (props) => {

    const[dato,setDato] = useState()

    
    useEffect(() => {

        obtenerPoderes()

    },[])


    //Metodo para obtener el array de poderes =>
    const obtenerPoderes = async() => {

        try{

            const response = await axios("http://localhost:8080/SuperHeroes/HeroesServlet", {

                method:"GET",
                params:{

                    action:"obtenerPoderes",
                    idHeroe: props.id, // Pasamos el idHeroe que tenemos en las props

                }

            })

            const resJson = await response.data

            console.log("DATOS PODERES TARJETA => ", resJson)

            //Lista los poderes obtenidos desde el array =>
            const power = resJson.map((poder,i) => {

                return(

                    <li key={i}>{poder}</li>

                )

            })

            setDato(power)

        }catch(error){

            console.log("Error => ", error)

        }


    }

    

    return (  

        <Fragment>

            <Container className="body">

            <br></br>
      
            <Card style={{ width: '21rem' }}>
            <Card.Img className="imagenCard" variant="top" src={require(`../assets/img/${props.imagen}`)} />
            <Card.Body>
                
                <Card.Title>{ props.nombre }</Card.Title>
                <Card.Text>{dato}</Card.Text>
                <Card.Text></Card.Text>
                <Card.Text></Card.Text>
                
                <Button variant="primary" href={`/detalleHeroe?id=${props.id}`}>VER DETALLE</Button>
            </Card.Body>
            </Card>

            </Container>

        </Fragment>

    );


}

export default Tarjeta;