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

const AdmUpdateUnion = (props) => {

    //Validar formulario con Libreria useForm =>
    const {register, formState: { errors }, handleSubmit, setValue} = useForm({

    })


    //Obetener Parametros x URL router-dom 6.3 =>
    const params = useParams();


    const[dato,setDato] = useState({

        idHeroe:"",
        idPoderes:"",
        fechaAlta:"",
        fechaBaja:"",
        estado:"",

    })

    const[union,setUnion] = useState(null)

    useEffect(() => {

        
        getUnion()


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

    const getUnion = async() => {

        try{

            const id = params.id

            const response = await axios("http://localhost:8080/SuperHeroes/UnionServlet",{

                method:"GET",
                params:{

                    action:"buscarOne",
                    idUnion:id,

                }


            })

            const resJson = await response.data

            console.log("DATOS API BUSCAR_ONE => ", resJson)

            //Pasar los datos obtenidos al form con setValue =>

            setValue("idHeroe", resJson.idHeroe)
            setValue("idPoderes", resJson.idPoderes)
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

            const response = await axios(`http://localhost:8080/SuperHeroes/UnionServlet`, {

                method:"GET",
                params:{

                    action:"actualizar",
                    idUnion:id,
                    idHeroe:dato.idHeroe,
                    idPoderes:dato.idPoderes,
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



    //Metodo para validar si existe idHeroe, teniendo en cuenta que buscarOne no devuelve idHeroe =>
    const validarIdHeroe = async(idHeroe) => {

        let validar = true
        let heroe = {}

        try{
            
            const response = await axios("http://localhost:8080/SuperHeroes/HeroesServlet",{

                method:"GET",
                params:{

                    action:"buscarOne",
                    idHeroe:idHeroe,

                }

            })

            const resJson = await response.data

            console.log("DATOS API => ", resJson)

            heroe = resJson


        }catch(error){

            console.log("Error => ", error)

        }

        
        if(heroe === null || heroe === undefined){

            validar = false

        }else{

            if(heroe.estado === "inactivo"){

                validar = false

            }else{

                validar = true

            }


        }

        return validar

    }

    //Metodo para validar si existe idPoderes, teniendo en cuenta que buscarOne no devuelve idPoderes =>
    const validarIdPoderes = async(idPoderes) => {

        let validar = true
        let poder = {}

        try{
            
            const response = await axios("http://localhost:8080/SuperHeroes/PoderesServlet",{

                method:"GET",
                params:{

                    action:"buscarOne",
                    idPoderes:idPoderes,

                }

            })

            const resJson = await response.data

            console.log("DATOS API => ", resJson)

            poder = resJson


        }catch(error){

            console.log("Error => ", error)

        }

        
        if(poder === null || poder === undefined){

            validar = false

        }else{

            if(poder.estado === "inactivo"){

                validar = false

            }else{

                validar = true

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

            <Alert.Heading className="alertTitle">FORMULARIO ACTUALIZACION DE UNION</Alert.Heading>

            <br></br>
            <br></br>  

            <Form onSubmit={handleSubmit(enviarDatos)}>


                
            <Row>

                <Col className="col-md-3">
                    
                    <label className="my-2">Id_Heroe: </label>

                </Col>

                <Col>
                    
                    <input 
                        type="number"
                        name="idHeroe"
                        onChange={handleInputChange}
                        placeholder="Ingrese el idHeroe"
                        className="form-control my-2"
                        {...register("idHeroe", { 

                            required:{
                                value: true,
                                message: 'Campo Obligatorio' 
                            },

                            validate:{

                                validate1:validarIdHeroe,

                            }

                           
                        })}   

                    >
                    </input>

                </Col>

                <Col className="col-md-3">

                        
                    <span className="text-danger text-small d-block mb-2">
                        {errors.idHeroe && errors.idHeroe.message}
                    </span>

                    <span className="text-danger text-small d-block mb-2">
                        {
                            errors.idHeroe && errors.idHeroe.type === "validate1" && (
                                <div className="error">El idHeroe ingresado no existe !!!</div>
                            )
                        }
                    </span>

                  
                </Col>

            </Row>

            <br></br>

            <Row>

                <Col className="col-md-3">
                    
                    <label className="my-2">Id_Poderes: </label>

                </Col>

                <Col>
                    
                    <input 
                        type="number"
                        name="idPoderes"
                        onChange={handleInputChange}
                        placeholder="Ingrese el idPoderes"
                        className="form-control my-2"
                        {...register("idPoderes", { 

                            required:{
                                value: true,
                                message: 'Campo Obligatorio' 
                            },

                            validate:{

                                validate1:validarIdPoderes,

                            }

                           
                        })}   

                    >
                    </input>

                </Col>

                <Col className="col-md-3">

                        
                    <span className="text-danger text-small d-block mb-2">
                    {errors.idPoderes && errors.idPoderes.message}
                    </span>

                    <span className="text-danger text-small d-block mb-2">
                        {
                            errors.idPoderes && errors.idPoderes.type === "validate1" && (
                                <div className="error">El idPoderes ingresado no existe !!!</div>
                            )
                        }
                    </span>

                  
                </Col>

            </Row>

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
                    <Button variant="danger" type="button" size="lg" href="/principalUnion" className="botonGrande">RETURN</Button>
                </Col>  
                
            </Row>

            </Form>

            </Alert>

            </Container>

        </Fragment>


    )


}

export default AdmUpdateUnion