import React, {Component, Fragment, useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Label from "react-bootstrap/FormLabel";
import {useNavigate} from 'react-router-dom';


const Navigation = (props) => {

    let navigate = useNavigate()

    const[dato,setDato] = useState({

        busqueda:"",

    })

    useEffect(() => {


    },[])

    //ESTE METODO SE PUEDE USAR PARA CAPTURAR LA INFORMACION INGRESADA EN EL FORM:
    const handleInputChange = (event) => {

        setDato({

            ...dato,
            [event.target.name] : event.target.value

        })

    }

    const obtenerBusqueda = () => {

        if(dato.busqueda === ""){

            alert("Error. Debe ingresar datos en la busqueda.")

        }else{

            console.log("Dato busqueda => ", dato.busqueda)

            //Redirecciono y paso los datos a traves de un search =>
            navigate(`/grillaHeroe/?busqueda=${dato.busqueda}`)



        }

    }


    return (

        <Fragment>

        <Navbar bg="primary" variant="dark">

            <Navbar.Brand href="/">HOME</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="/grillaHeroe">SUPERHEROES</Nav.Link>
            <Nav.Link href="/batalla">BATALLA</Nav.Link>
            <Nav.Link href="/adminPrincipal">ADMINISTRADOR</Nav.Link>
            </Nav>
            <Form className="d-flex">
                <Form.Label>NOMBRE:</Form.Label>&nbsp;&nbsp;
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    name="busqueda"
                    onChange={handleInputChange}
                />&nbsp;&nbsp;
                <Button variant="outline-success" onClick={obtenerBusqueda}>SEARCH</Button>&nbsp;&nbsp;
            </Form>

               
        </Navbar>

        </Fragment>  

    );  


}

export default Navigation;