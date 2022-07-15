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


const AdmUpdateHeroe = (props) => {

    
    //Validar formulario con Libreria useForm =>
    const {register, formState: { errors }, handleSubmit, setValue} = useForm({

    })


    //Obetener Parametros x URL router-dom 6.3 =>
    const params = useParams();


    const[dato,setDato] = useState(null)

    const[heroe,setHeroe] = useState({

        nombre:'',
        bio:'',
        img:'',
        aparicion:'',
        casa:'',
        escalaPoder:'',
        fechaAlta:'',
        fechaBaja:'',
        estado:'',

    })

    useEffect(() => {

        getDato()
        getHeroes()

    },[])

    //Metodo para obtener los datos ingresados en el form =>
    const handleInputChange = (event) => {

        setHeroe({

            ...heroe,
            [event.target.name] : event.target.value

        })

    }

        //Metodo para gestionar el envio de datos al Servlet y BD =>
        const enviarDatos = (heroe, event) => {

            
            actualizar(heroe)
    
            event.preventDefault();
            event.target.reset();
    
        
        }

        //Metodo para actualizar los datos ingresados en el form =>
        const actualizar = async(heroe) => {

            try{

                const idURL = params.id

                const response = await axios("http://localhost:8080/SuperHeroes/HeroesServlet",{

                    method:"GET",
                    params:{

                        action:"actualizar",
                        idHeroe:idURL,
                        nombre:heroe.nombre,
                        bio:heroe.bio,
                        img:heroe.img,
                        aparicion:heroe.aparicion,
                        casa:heroe.casa,
                        escalaPoder:heroe.escalaPoder,
                        fechaAlta:heroe.fechaAlta,
                        fechaBaja:heroe.fechaBaja,
                        estado:heroe.estado,

                    }

                })

                const resJson = await response.data

                console.log("DATOS API => ", resJson)

                alert("Los datos fueron actualizados con exito.")

            }catch(error){

                console.log("Error => ", error)

                alert("Error. No es posible actualizar los datos.")


            }



        }



        //Metodo para obtener los datos desde la Base (buscarOne) y mostrar en el form =>
        const getDato = async() => {

            try{

                const idHeroe = params.id

                const response = await fetch(`http://localhost:8080/SuperHeroes/HeroesServlet?action=buscarOne&idHeroe=${idHeroe}`, {

                    method:"GET",

                })

                const resJson = await response.json()

                console.log("DATO API BUSCAR_ONE => ", resJson)

                //Pasar los datos obtenidos al form con setValue =>

                setValue("nombre", resJson.nombre)
                setValue("bio", resJson.bio)
                setValue("img", resJson.img)
                setValue("aparicion", moment(`${resJson.aparicion.year}-${resJson.aparicion.month}-${resJson.aparicion.day}`).format('YYYY-MM-DD'))
                setValue("casa", resJson.casa)
                setValue("escalaPoder", resJson.escalaPoder)
                setValue("fechaAlta", moment(`${resJson.fechaAlta.year}-${resJson.fechaAlta.month}-${resJson.fechaAlta.day}`).format('YYYY-MM-DD'))
                setValue("fechaBaja", moment(`${resJson.fechaBaja.year}-${resJson.fechaBaja.month}-${resJson.fechaBaja.day}`).format('YYYY-MM-DD'))
                setValue("estado", resJson.estado)

            }catch(error){

                console.log("Error => ", error)

            }

        }


        //Metodo para obtener todos los heroes y verificar posteriormente el nombre =>
        const getHeroes = async() => {

            try{

                const response = await fetch("http://localhost:8080/SuperHeroes/HeroesServlet?action=buscarAll",{

                    method:"GET",

                })

                const resJson = await response.json()

                setDato(resJson)

                console.log("DATOS ALL => ",resJson)

            }catch(error){

                console.log("Error => ", error)

            }


        }

        //Si casa ingresada es distino DC o Marvel devuelve false e invalida =>
        const validarCasa = (casa) => {

            let validar = true;

            if(casa !== "DC" && casa !== "Marvel"){

                validar = false;

            }

            return validar

        }

        //Si estado ingresado es distino activo o inactivo devuelve false e invalida =>
        const validarEstado = (estado) => {

            let validar = true;

            if(estado !== "activo" && estado !== "inactivo"){

                validar = false;

            }

            return validar

        }

        //Metodo para validar que el nombre ingresado no exista en la base de datos y este activo =>
        const validarNombre = (nombre) => {

            let validar = true;

            const id = params.id

            console.log("Validar id (nombre) => ", id)

            for(let i = 0; i < dato.length; i ++){

                if((dato[i].idHeroe).toString() !== (id).toString()){

                    if(dato[i].nombre === nombre && dato[i].estado === "activo"){

                        validar = false
                        break

                    }

                }


            }

            return validar


        }
    


    if(dato === null){

        return(

            <Fragment>

                <Navigation></Navigation>

                <br></br>

                <div className="body">

                <Alert variant="success">

                <Alert.Heading className="alertTitle">Error. No se encontraron Datos</Alert.Heading>

                <br></br>
                <br></br>  

                </Alert>

                </div>

            </Fragment>

        )


    }else{

        return(

            <Fragment>

                <Navigation></Navigation>

                <br></br>

                <Container className="body">

                <Alert variant="success">

                <Alert.Heading className="alertTitle">FORMULARIO ACTUALIZACION DE HEROE</Alert.Heading>

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
                        
                        <label className="my-2">Bio: </label>

                    </Col>

                    <Col>
                        
                        <input 
                            type="text"
                            name="bio"
                            onChange={handleInputChange}
                            placeholder="Ingrese la Biografia"
                            className="form-control my-2"
                            {...register("bio", { 

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
                        {errors.bio && errors.bio.message}
                        </span>

                    </Col>

                </Row>

                <br></br>

                <Row>

                    <Col className="col-md-3">
                        
                        <label className="my-2">Img: </label>

                    </Col>

                    <Col>
                        
                        <input 
                            type="text"
                            name="img"
                            onChange={handleInputChange}
                            placeholder="Ingrese la imagen"
                            className="form-control my-2"
                            {...register("img", { 

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
                        {errors.img && errors.img.message}
                        </span>

                    </Col>

                </Row>

                <br></br>

                <Row>

                    <Col className="col-md-3">
                        
                        <label className="my-2">Fecha_Aparicion: </label>

                    </Col>

                    <Col>
                        
                        <input 
                            type="date"
                            name="aparicion"
                            onChange={handleInputChange}
                            placeholder="Ingrese la Fecha Aparicion"
                            className="form-control my-2"
                            {...register("aparicion", { 

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
                        {errors.aparicion && errors.aparicion.message}
                        </span>

                    </Col>

                </Row>

                <br></br>

                <Row>

                    <Col className="col-md-3">
                        
                        <label className="my-2">Casa: </label>

                    </Col>

                    <Col>
                        
                        <input 
                            type="text"
                            name="casa"
                            onChange={handleInputChange}
                            placeholder="Ingrese la Casa DC o Marvel"
                            className="form-control my-2"
                            {...register("casa", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },

                                validate:{

                                    validate1:validarCasa,

                                }


                            })}   

                        >
                        </input>

                    </Col>

                    <Col className="col-md-3">

                            
                        <span className="text-danger text-small d-block mb-2">
                        {errors.casa && errors.casa.message}
                        </span>

                        <span className="text-danger text-small d-block mb-2">
                        {
                            errors.casa && errors.casa.type === "validate1" && (
                                <div className="error">Error. Casa ingesada incorrecta !!!</div>
                            )
                        }
                        </span>

                    </Col>

                </Row>

                <br></br>

                <Row>

                    <Col className="col-md-3">
                        
                        <label className="my-2">Escala_Poder: </label>

                    </Col>

                    <Col>
                        
                        <input 
                            type="number"
                            name="escalaPoder"
                            onChange={handleInputChange}
                            placeholder="Ingrese la escala de poder 1-10"
                            className="form-control my-2"
                            min="1"
                            max="10"
                            {...register("escalaPoder", { 

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
                        {errors.escalaPoder && errors.escalaPoder.message}
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
                        <Button variant="danger" type="button" size="lg" href="/principalHeroe" className="botonGrande">RETURN</Button>
                    </Col>  

                </Row>


                </Form>

                </Alert>

                </Container>

            </Fragment>

        )

    }

}

export default AdmUpdateHeroe