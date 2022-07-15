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


const AdmInsertHeroe = (props) => {

    //react-hook-form (validacion) =>
    const {register, formState: { errors }, handleSubmit} = useForm()

    const[dato,setDato] = useState(null)

    const [heroe, setHeroe] = useState({

        nombre:'',
        bio:'',
        img:'',
        aparicion:'',
        casa:'',
        escalaPoder:'',
        
    })

    useEffect(() => {

        

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

            
        insertar(heroe)

        event.preventDefault();
        event.target.reset();

    
    }

    //Metodo para insertar Datos =>
    const insertar = async(heroe) => {

        try{

            const response = await axios("http://localhost:8080/SuperHeroes/HeroesServlet",{

                method:"GET",
                params:{

                    action:"insertar",
                    nombre:heroe.nombre,
                    bio:heroe.bio,
                    img:heroe.img,
                    aparicion:moment(heroe.aparicion).format('YYYY-MM-DD'), 
                    casa:heroe.casa,
                    escalaPoder:heroe.escalaPoder,
                    //Se autocompletan =>
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

    const getDatos = async() => {

        try{

            const response = await fetch("http://localhost:8080/SuperHeroes/HeroesServlet?action=buscarAll", {

                method:"GET",

            })
            
            const resJson = await response.json()

            console.log("DATOS API => ", resJson)

            setDato(resJson)


        }catch(error){

            console.log("Error => ", error);

        }


    }

    //Validacion Personalizada que no permite que se ingresen 2 nombres iguales a la BD =>
    const validarNombre = async(nombre) => {

        try{

            const response = await fetch("http://localhost:8080/SuperHeroes/HeroesServlet?action=buscarAll", {

                method:"GET",

            })
            
            const resJson = await response.json()

            console.log("DATOS API => ", resJson)

            let validar = true

            for(let i = 0; i < resJson.length; i++){

                if(resJson[i].nombre === nombre){

                    console.log("INGRESO")

                    validar = false;
                    break;

                }

            }

            console.log("Validar Nombre => ", validar )

            //Si el dato nombre ingresado en form es igual a algun nombre de la BD retorna falsa y no permite la validacion =>
            return validar


        }catch(error){

            console.log("Error => ", error)

        }

    }

    //Metodo personalizado para validar la casa del heroe =>
    const validarCasa = (casa) => {

        let validar = false;

        if(casa === "DC"){

            validar = true;

        }else if(casa === "Marvel"){

            validar = true;

        }

        //Si no se ingresa casa DC o Marvel retorna falso y no valida =>
        console.log("VALIDAR CASA => ", validar)
        return validar;

    }

    return(

        <Fragment>

                    <Navigation></Navigation>

                    <br></br>

                    <Container className="body">

                    <Alert variant="success">

                    <Alert.Heading className="alertTitle">FORMULARIO REGISTRO DE HEROE</Alert.Heading>

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
                    <br></br>

                    <Row>


                        <Col>
                            <Button variant="success" type="submit"  size="lg"  className="botonGrande">REGISTER</Button>&nbsp;&nbsp;
                            <Button variant="danger" type="button" size="lg" href="/principalHeroe" className="botonGrande">RETURN</Button>
                        </Col>  
                    </Row>

                    </Form>

                    </Alert>

                    </Container>


        </Fragment>


    )


}

export default AdmInsertHeroe;