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
import "../assets/css/grillaHeroe.css";
import Tarjeta from "../components/Tarjeta";

const GrillaHeroe = (props) => {

    //Obtengo los datos pasados por search URL =>
    let {search} = useLocation();
    let query = new URLSearchParams(search)

    const[dato,setDato] = useState(null)

    const[urlBusqueda,setUrlBusqueda] = useState(query.get("busqueda"))

    useEffect(() => {

        getDatos()

        setUrlBusqueda(query.get("busqueda"))

    },[query.get("busqueda")])

    const getDatos = async() => {

        try{

            let busquedaUrl = query.get("busqueda")

            if(busquedaUrl === null || busquedaUrl === undefined){

                console.log("SIN BUSQUEDA")

                const response = await axios("http://localhost:8080/SuperHeroes/HeroesServlet", {

                    method:"GET",
                    params:{

                        action:"buscarAll"

                    }

                })

                const resJson = await response.data

                console.log("DATOS SERVLET => ", resJson)

                setDato(resJson)


            }else if(busquedaUrl !== null && busquedaUrl !== undefined){

                console.log("CON BUSQUEDA")

                const response = await axios("http://localhost:8080/SuperHeroes/HeroesServlet", {

                    method:"GET",
                    params:{

                        action:"buscarAll"

                    }

                })

                const resJson = await response.data

                const encontrado = resJson.filter((heroe) => (heroe.nombre).toString() === (busquedaUrl).toString())

                console.log("DATO ENCONTRADO => ", encontrado)

                //Verificamos si la busqueda obtiene datos =>
                if(encontrado.length === 0){

                    setDato(null)

                }else{

                    setDato(encontrado)

                }

                
            }


        }catch(error){

            console.log("Error => ", error)

        }


    }

    if(dato === null){

        return(

            <Fragment>

                <Navigation></Navigation>

                <br></br>

                <div className="body">

                <Alert variant="success">

                <Alert.Heading className="alertTitle">NO SE ENCONTRARON DATOS. VUELVA A INTENTAR CON LA BUSQUEDA</Alert.Heading>

                <br></br>
                <br></br>  

                </Alert>

                </div>

            </Fragment>

        )

    }else{

        const cards = dato.map((heroe,i) => {

            return(

                <Tarjeta 
                
                    key={i}
                    imagen={heroe.img}
                    nombre={heroe.nombre}
                    id={heroe.idHeroe}
                

                />

            )

        })

        return(

            <Fragment>

                <Navigation></Navigation>

                <br></br>

                <Container className="body">

                <Alert variant="success">

                <Alert.Heading className="alertTitle">LISTADO DE SUPERHEROES</Alert.Heading>

                <br></br>
                <br></br>  

                <Row xs={1} md={3} className="g-4">
                    {cards}
                </Row>


                </Alert>

                </Container>

            </Fragment>

        )

    }


}

export default GrillaHeroe;