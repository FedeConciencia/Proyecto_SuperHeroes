import React, { useState, useEffect, Fragment } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Table from 'react-bootstrap/Table'
import Navigation from "../Navigation";
import "../../assets/css/principalCrud.css"
import moment from 'moment';


const AdmPrincipalPoderes = (props) => {

    const[dato, setDato] = useState(null)

    useEffect(() => {

        getDatos()

    },[])


    //Metodo para obtener todos los poderes =>
    const getDatos = async() => {

        try{

            const response = await fetch("http://localhost:8080/SuperHeroes/PoderesServlet?action=buscarAll", {

                method:"GET",

            })

            const resJson = await response.json()

            console.log("DATOS API => ", resJson)

            setDato(resJson)


        }catch(error){

            console.log("Error => ", error)

        }

    }

    if(dato === null){

        return(

            <Fragment>

            <Navigation/>

            <br></br>

            <Container className="body">

            <Alert variant="success">

            <Alert.Heading className="alertTitle">Error. No existen datos disponibles.</Alert.Heading>

            <br></br>
            <br></br>  

            </Alert>
           
            </Container>

            </Fragment>

        )    


    }else{


        return(

            <Fragment>

            <Navigation/>

            <br></br>

            <div className="body">

            <Alert variant="success">

            <Alert.Heading className="alertTitle">ADMINISTRADOR PRINCIPAL PODERES</Alert.Heading>

            <br></br>
            <br></br>  

            <Table className="tabla" striped bordered hover variant="dark">


                <thead>

                    <tr>

                        <th className="celdaChica">Indice</th>
                        <th className="celdaGrande">Nombre</th>
                        <th className="celdaGrande">Fecha_Alta</th>
                        <th className="celdaGrande">Fecha_Baja</th>
                        <th className="celdaGrande">Estado</th>
                        <th className="celdaGrande">Acciones</th>


                    </tr>



                </thead>

                <tbody>

                    { dato.map((poder, i) =>   (

                        <tr key={i}>

                            <td className="celdaChica">{i+1}</td>
                            <td className="celdaGrande">{poder.nombre}</td>
                            <td className="celdaGrande">{moment(`${poder.fechaAlta.year}-${poder.fechaAlta.month}-${poder.fechaAlta.day}`).format('YYYY-MM-DD')}</td>
                            <td className="celdaGrande">{moment(`${poder.fechaBaja.year}-${poder.fechaBaja.month}-${poder.fechaBaja.day}`).format('YYYY-MM-DD')}</td>
                            <td className="celdaGrande">{poder.estado}</td>
                            <td className="celdaAcciones">
                                <Button variant="warning" size="sm" className='botonChico' href={`/updatePoderes/${poder.idPoderes}`}>UPDATE</Button>&nbsp;&nbsp;
                                <Button variant="danger" size="sm" className="botonChico" href={`/deletePoderes?id=${poder.idPoderes}`}>DELETE</Button>
                            </td>


                        </tr>

                    ))}


                </tbody>


            </Table>

            <Button variant="success" size="lg"  href="/insertPoderes" className="botonGrande">INSERT</Button>&nbsp;&nbsp;
            <Button variant="primary" size="lg"  href="/adminPrincipal" className="botonGrande">RETURN</Button>

            </Alert>
           
            </div>

            </Fragment>

        )    


    }



}

export default AdmPrincipalPoderes