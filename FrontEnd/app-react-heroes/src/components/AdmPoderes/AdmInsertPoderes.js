import React, { useState, useEffect, Fragment } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Table from 'react-bootstrap/Table'
import Navigation from "../Navigation";
import Form from "react-bootstrap/Form";
import {useForm} from 'react-hook-form';
import moment from 'moment';

const AdmInsertPoderes = (props) => {

    //react-hook-form (validacion) =>
    const {register, formState: { errors }, handleSubmit} = useForm()

    const[poderes,setPoderes] = useState(null)

    const[dato,setDato] = useState({

        nombre:"",

    })

    useEffect(() => {

        getPoderes()

    },[])

     //Metodo para obtener los datos ingresados en el form =>
     const handleInputChange = (event) => {

        setDato({

            ...dato,
            [event.target.name] : event.target.value

        })

    }

    //Metodo para gestionar el envio de datos al Servlet y BD =>
    const enviarDatos = (dato, event) => {

            
        insertar(dato)

        event.preventDefault();
        event.target.reset();

    
    }


    const getPoderes = async() => {

        try{

            const response = await fetch("http://localhost:8080/SuperHeroes/PoderesServlet?action=buscarAll", {

                method:"GET",

            })

            const resJson = await response.json()

            console.log("DATOS API PODERES => ", resJson)

            setPoderes(resJson)


        }catch(error){

            console.log("Error => ", error)


        }


    }

    const insertar = async(dato) => {

        try{

            const response = await axios("http://localhost:8080/SuperHeroes/PoderesServlet",{

                method:"GET",
                params:{

                    action:"insertar",
                    nombre:dato.nombre,
                    fechaAlta:moment().format('YYYY-MM-DD'), 
                    fechaBaja:moment("1900-01-01").format('YYYY-MM-DD'), 
                    estado:"activo",


                }

            })

            const resJson = await response.data

            console.log("DATOS API => ", resJson)

            alert("Datos Insertados con Exito en la Base de Datos.")



        }catch(error){

            console.log("Error => ", error)

            alert("Error, no fue posible insertar los datos en la Base de Datos.")

        }


    }


    const validarNombre = (nombre) => {

        let validar = true

        //Verificamos el Hook Poderes que se ejecuta en el useEffect al cargar la pagina =>

        for(let i = 0; i < poderes.length; i ++){

            if(nombre === poderes[i].nombre){

                validar = false
                break

            }


        }

        return validar

    }



    return(

        <Fragment>

                    <Navigation></Navigation>

                    <br></br>

                    <Container className="body">

                    <Alert variant="success">

                    <Alert.Heading className="alertTitle">FORMULARIO REGISTRO DE PODERES</Alert.Heading>

                    <br></br>
                    <br></br>  

                    <Form onSubmit={handleSubmit(enviarDatos)}>

                    <Row>

                        <Col className="col-md-3">
                            
                            <label className="my-2">Nombre: </label>

                        </Col>

                        <Col>
                            
                            <input 
                                type="text"
                                name="nombre"
                                onChange={handleInputChange}
                                placeholder="Ingrese el Nombre"
                                className="form-control my-2"
                                {...register("nombre", { 

                                    required:{
                                        value: true,
                                        message: 'Campo Obligatorio' 
                                    },

                                    validate:{

                                        validate1:validarNombre,

                                    }

                                })}   

                            >
                            </input>

                        </Col>

                        <Col className="col-md-3">

                                
                            <span className="text-danger text-small d-block mb-2">
                            {errors.nombre && errors.nombre.message}
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                            {
                                errors.nombre && errors.nombre.type === "validate1" && (
                                    <div className="error">El nombre ingresado ya existe !!!</div>
                                )
                            }
                            </span>

                        </Col>

                    </Row>

                    <br></br>
                    <br></br>

                    <Row>


                        <Col>
                            <Button variant="success" type="submit"  size="lg"  className="botonGrande">REGISTER</Button>&nbsp;&nbsp;
                            <Button variant="danger" type="button" size="lg" href="/principalPoderes" className="botonGrande">RETURN</Button>
                        </Col>  
                        
                    </Row>

                    </Form>

                    </Alert>

                    </Container>


        </Fragment>


    )

}

export default AdmInsertPoderes