import React, { useState, useEffect, Fragment } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Table from 'react-bootstrap/Table'
import Navigation from "./Navigation";

const Batalla = (props) => {


    const[info,setInfo] = useState(null)

    const[dato,setDato] = useState({

        heroe1:"",
        heroe2:"",

    })

    useEffect(() => {

        getDatos()

    },[dato])

    //ESTE METODO SE PUEDE USAR PARA CAPTURAR LA INFORMACION INGRESADA EN EL FORM:
    const handleInputChange = (event) => {

        console.log("SELECCION ONCHANGE => ", dato.heroe1)
        console.log("SELECCION ONCHANGE => ", dato.heroe2)

        setDato({

            ...dato,
            [event.target.name] : event.target.value

        })

    }

    const getDatos = async() => {

        try{

            const response = await fetch("http://localhost:8080/SuperHeroes/HeroesServlet?action=buscarAll", {

                method:"GET"

            })

            const resJson = await response.json()

            console.log("DATOS SERVLET => ", resJson)

            setInfo(resJson)


        }catch(error){

            console.log("Error => ", error)

        }


    }

    const luchar = async() => {

        console.log("SELECCION H1 => ", await dato.heroe1)
        console.log("SELECCION H2 => ", await dato.heroe2)

        let hero1 = null;
        let hero2 = null;
        
        for(let i = 0; i < info.length; i++){

            if(info[i].nombre === dato.heroe1){

                hero1 = info[i]
            }

            if(info[i].nombre === dato.heroe2){

                hero2 = info[i]
            }

        }

        console.log("HEROE_1 => ", hero1)

        console.log("HEROE_2 => ", hero2)

        if(dato.heroe1 !== "" && dato.heroe2 !== ""){

            if(hero1.escalaPoder > hero2.escalaPoder){

                document.getElementById("ganador").innerHTML = "GANADOR " + hero1.nombre

            }else if(hero1.escalaPoder < hero2.escalaPoder){

                document.getElementById("ganador").innerHTML = "GANADOR " + hero2.nombre

            }else{

                document.getElementById("ganador").innerHTML = "EMPATE" 

            }

        }else{

            document.getElementById("ganador").innerHTML = "ERROR DEBE SELECCIONAR HEROE_1 Y HEROE_2" 

        }    


    }

    if(info === null){

        return null

    }else{

        return(

            <Fragment>

                <Navigation></Navigation>

                <br></br>

                <div className="body">

                <Alert variant="success">

                <Alert.Heading className="alertTitle">BATALLA HEROES</Alert.Heading>

                <br></br>
                <br></br>  

                <Table className="tabla" striped bordered hover variant="dark">

                    <tbody>

                        <tr>

                            <td>Heroe_1</td>
                            <td>
                                

                                <select name="heroe1"  onChange={handleInputChange}>


                                    <option value="">SELECCIONAR UNA OPCION</option>

                                {info.map((heroe,i) => (

                                    <option  key={heroe.idHeroe} value={heroe.nombre}>{heroe.nombre}</option>


                                ))} 

                                </select>

                                  
                            </td>
                            <td>VS</td>
                            <td>Heroe_2</td>
                            <td>
                               
                            <select name="heroe2"  onChange={handleInputChange}>

                                <option value="">SELECCIONAR UNA OPCION</option>

                                {info.map((heroe,i) => (

                                    <option  key={heroe.idHeroe} value={heroe.nombre}>{heroe.nombre}</option>


                                ))} 

                            </select>

                            </td>


                        </tr>

                        <tr>

                            <td colSpan={5}>
                                
                                <Button variant="danger" size="lg" onClick={luchar}>LUCHAR</Button>
                                
                            </td>        

                        </tr>

                        <tr>

                            <td colSpan={5}>
                                
                                <h3 name="ganador" id="ganador"></h3>
                                
                            </td>        

                        </tr>


                    </tbody>


                </Table>

                </Alert>

                </div>

            </Fragment>

        )

    }


}

export default Batalla;