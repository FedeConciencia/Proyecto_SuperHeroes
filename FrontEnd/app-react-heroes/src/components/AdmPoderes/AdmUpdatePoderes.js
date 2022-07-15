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
import { useLocation, useParams } from "react-router-dom";


const AdmUpdatePoderes = (props) => {

    //Validar formulario con Libreria useForm =>
    const {register, formState: { errors }, handleSubmit, setValue} = useForm({

    })


    //Obetener Parametros x URL router-dom 6.3 =>
    const params = useParams();

    const[dato,setDato] = useState({

        nombre:"",
        fechaAlta:"",
        fechaBaja:"",
        estado:"",


    })

    const[poderes,setPoderes] = useState(null)

    const[poder,setPoder] = useState(null)

    useEffect(() => {

        getPoderes()
        getPoder()

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

            
        actualizar(dato)

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

    const getPoder = async() => {

        try{

            const id = params.id

            const response = await fetch(`http://localhost:8080/SuperHeroes/PoderesServlet?action=buscarOne&idPoderes=${id}`, {

                method:"GET",


            })

            const resJson = await response.json()

            console.log("DATO API BUSCAR_ONE => ", resJson)

            //Pasar los datos obtenidos al form con setValue =>

            setValue("nombre", resJson.nombre)
            setValue("fechaAlta", moment(`${resJson.fechaAlta.year}-${resJson.fechaAlta.month}-${resJson.fechaAlta.day}`).format('YYYY-MM-DD'))
            setValue("fechaBaja", moment(`${resJson.fechaBaja.year}-${resJson.fechaBaja.month}-${resJson.fechaBaja.day}`).format('YYYY-MM-DD'))
            setValue("estado", resJson.estado)


        }catch(error){

            console.log("Error => ", error)


        }

    }

    const actualizar = async(dato) => {

        try{

            const id = params.id

            const response = await axios("http://localhost:8080/SuperHeroes/PoderesServlet", {

                method:"GET",
                params:{

                    action:"actualizar",
                    idPoderes:id,
                    nombre:dato.nombre,
                    fechaAlta:dato.fechaAlta,
                    fechaBaja:dato.fechaBaja,
                    estado:dato.estado,


                }



            })

            const resJson = await response.data

            console.log("DATO API => ", resJson)

            alert("Los datos fueron actualizados con exito.")

        }catch(error){

            console.log("Error => ", error)

            alert("Error. No es posible actualizar los datos.")


        }


    }

    const validarNombre = (nombre) => {

        let validar = true

        const id = params.id

        for(let i = 0; i < poderes.length; i++){

            if((poderes[i].idPoderes).toString() !== (id).toString()){

                if(poderes[i].nombre === nombre){

                    validar = false
                    break

                }


            }

        }

        return validar

    }


    const validarEstado = (estado) => {

        let validar = true

        if(estado !== "activo" && estado !== "inactivo"){

            validar = false

        }

        return validar


    }



    return(


        <Fragment>

                    <Navigation></Navigation>

                    <br></br>

                    <Container className="body">

                    <Alert variant="success">

                    <Alert.Heading className="alertTitle">FORMULARIO ACTUALIZACION DE PODERES</Alert.Heading>

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

                <Row>

                    <Col className="col-md-3">
                        
                        <label className="my-2">Fecha_Alta: </label>

                    </Col>

                    <Col>
                        
                        <input 
                            type="date"
                            name="fechaAlta"
                            onChange={handleInputChange}
                            placeholder="Ingrese la Fecha de Alta"
                            className="form-control my-2"
                            {...register("fechaAlta", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },


                            })}   

                        >
                        </input>

                    </Col>

                    <Col className="col-md-3">

                            
                        <span className="text-danger text-small d-block mb-2">
                        {errors.fechaAlta && errors.fechaAlta.message}
                        </span>

                    </Col>

                </Row>

                <br></br>

                <Row>

                    <Col className="col-md-3">
                        
                        <label className="my-2">Fecha_Baja: </label>

                    </Col>

                    <Col>
                        
                        <input 
                            type="date"
                            name="fechaBaja"
                            onChange={handleInputChange}
                            placeholder="Ingrese la Fecha de Baja"
                            className="form-control my-2"
                            {...register("fechaBaja", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },


                            })}   

                        >
                        </input>

                    </Col>

                    <Col className="col-md-3">

                            
                        <span className="text-danger text-small d-block mb-2">
                        {errors.fechaBaja && errors.fechaBaja.message}
                        </span>

                    </Col>

                </Row>

                <br></br>

                <Row>

                    <Col className="col-md-3">
                        
                        <label className="my-2">Estado: </label>

                    </Col>

                    <Col>
                        
                        <input 
                            type="text"
                            name="estado"
                            onChange={handleInputChange}
                            placeholder="Ingrese el estado (activo-inactivo)"
                            className="form-control my-2"
                            {...register("estado", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },

                                validate:{

                                    validate1:validarEstado,

                                }


                            })}   

                        >
                        </input>

                    </Col>

                    <Col className="col-md-3">

                            
                        <span className="text-danger text-small d-block mb-2">
                        {errors.estado && errors.estado.message}
                        </span>

                        <span className="text-danger text-small d-block mb-2">
                        {
                            errors.estado && errors.estado.type === "validate1" && (
                                <div className="error">Error. Estado ingresado incorrecto !!!</div>
                            )
                        }
                        </span>

                    </Col>

                </Row>

                    <br></br>
                    <br></br>

                <Row>


                    <Col>
                        <Button variant="success" type="submit"  size="lg"  className="botonGrande">UPDATE</Button>&nbsp;&nbsp;
                        <Button variant="danger" type="button" size="lg" href="/principalPoderes" className="botonGrande">RETURN</Button>
                    </Col>  
                    
                </Row>

                </Form>

                </Alert>

                </Container>


        </Fragment>



    )


}

export default AdmUpdatePoderes