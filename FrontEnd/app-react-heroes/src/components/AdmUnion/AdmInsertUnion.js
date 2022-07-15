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

const AdmInsertUnion = (props) => {

    //react-hook-form (validacion) =>
    const {register, formState: { errors }, handleSubmit} = useForm()

    const[dato,setDato] = useState({

        idHeroe:"",
        idPoderes:"",


    })


    useEffect(() => {

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


    const insertar = async(dato) => {

        try{

            const response = await axios("http://localhost:8080/SuperHeroes/UnionServlet",{

                method:"GET",
                params:{

                    action:"insertar",
                    idHeroe:dato.idHeroe,
                    idPoderes:dato.idPoderes,
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


    return(

        <Fragment>

            <Navigation></Navigation>

            <br></br>

            <Container className="body">

            <Alert variant="success">

            <Alert.Heading className="alertTitle">FORMULARIO REGISTRO DE UNION</Alert.Heading>

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


            <br></br>
            <br></br>

            <Row>

                <Col>
                    <Button variant="success" type="submit"  size="lg"  className="botonGrande">REGISTER</Button>&nbsp;&nbsp;
                    <Button variant="danger" type="button" size="lg" href="/principalUnion" className="botonGrande">RETURN</Button>
                </Col>  
                
            </Row>

            </Form>

            </Alert>

            </Container>

        </Fragment>    


    )


}

export default AdmInsertUnion