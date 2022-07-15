import React, { useState, useEffect, Fragment } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Table from 'react-bootstrap/Table'
import Navigation from "./Navigation";

const AdminPrincipal = (props) => {

    const[dato,setDato] = useState(null)

    useEffect(() => {


    },[])

    

    return(

        <Fragment>

            <Navigation></Navigation>

            <br></br>

            <Container className="body">

            <Alert variant="success">

            <Alert.Heading className="alertTitle">ADMINISTRADOR PRINCIPAL</Alert.Heading>

            <br></br>
            <br></br>  

            
            <Table className="tabla" striped bordered hover variant="dark">

                <thead>



                </thead>

                <tbody>

                    <tr>

                        <td><Button variant="primary" size="lg" href="/principalHeroe" className="botonGrande">ADM.HEROE</Button></td>


                    </tr>

                    <tr>

                        <td><Button variant="primary" size="lg" href="/principalPoderes" className="botonGrande">ADM.PODERES</Button></td>

                    </tr>

                    <tr>

                        <td><Button variant="primary" size="lg" href="/principalUnion" className="botonGrande">ADM.UNION</Button></td>

                    </tr>


                </tbody>


            </Table>    


            </Alert>

            </Container>

        </Fragment>

    )    

}




export default AdminPrincipal;