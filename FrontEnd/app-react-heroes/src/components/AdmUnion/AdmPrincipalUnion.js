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
import { useTransition } from 'react';

const AdmPrincipalUnion = (props) => {

    const[dato,setDato] = useState(null)

    useEffect(() => {

        getDatos()

    },[])

    const getDatos = async() => {

        try{

            const response = await fetch("http://localhost:8080/SuperHeroes/UnionServlet?action=buscarAll",{

                method:"GET",

            })

            const resJson = await  response.json()

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

            <Alert.Heading className="alertTitle">ADMINISTRADOR PRINCIPAL UNION</Alert.Heading>

            <br></br>
            <br></br>  

            <Table className="tabla" striped bordered hover variant="dark">

                <thead>

                    <tr>

                        <th className="celdaChica">Indice</th>
                        <th className="celdaChica">IdHeroe</th>
                        <th className="celdaChica">IdPoderes</th>
                        <th className="celdaGrande">FechaAlta</th>
                        <th className="celdaGrande">FechaBaja</th>
                        <th className="celdaGrande">Estado</th>
                        <th className="celdaGrande">Acciones</th>

                    </tr>


                </thead>

                <tbody>

                {dato.map((union,i) => (

                    <tr key={i}>

                        <td className="celdaChica">{i+1}</td>
                        <td className="celdaChica">{union.idHeroe}</td>
                        <td className="celdaChica">{union.idPoderes}</td>
                        <td className="celdaGrande">{moment(`${union.fechaAlta.year}-${union.fechaAlta.month}-${union.fechaAlta.day}`).format('YYYY-MM-DD')}</td>
                        <td className="celdaGrande">{moment(`${union.fechaBaja.year}-${union.fechaBaja.month}-${union.fechaBaja.day}`).format('YYYY-MM-DD')}</td>
                        <td className="celdaGrande">{union.estado}</td>
                        <td className="celdaAcciones">
                            <Button variant="warning" size="sm" className='botonChico' href={`/updateUnion/${union.idUnion}`}>UPDATE</Button>&nbsp;&nbsp;
                            <Button variant="danger" size="sm" className='botonChico' href={`/deleteUnion?id=${union.idUnion}`}>DELETE</Button>
                        </td>
                  


                    </tr>

                ))}    


                </tbody>


            </Table>

            <Button variant="success" size="lg" className='botonGrande' href={`/insertUnion`}>INSERT</Button>&nbsp;&nbsp;
            <Button variant="primary" size="lg" className='botonGrande' href={`/adminPrincipal`}>RETURN</Button>

            </Alert>
           
           </div>

           </Fragment>

            
        )

    }

}

export default AdmPrincipalUnion