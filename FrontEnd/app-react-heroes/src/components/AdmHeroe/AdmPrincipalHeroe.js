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



const AdminPrincipalHeroe = (props) => {

    const[dato,setDato] = useState(null)

    useEffect(() => {

        getDatos()


    },[])

    const getDatos = async() => {

        try{

            const response = await axios("http://localhost:8080/SuperHeroes/HeroesServlet", {

                method:"GET",
                params:{

                    action:"buscarAll"

                }


            })

            const resJson = await response.data 

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

                <Alert.Heading className="alertTitle">ADMINISTRADOR PRINCIPAL HEROE</Alert.Heading>

                <br></br>
                <br></br>  

                
                <Table className="tabla" striped bordered hover variant="dark">

                    <thead>

                        <tr>

                            <th className="celdaChica">Indice</th>
                            <th className="celdaGrande">Nombre</th>
                            <th className="celdaGrande">Bio</th>
                            <th className="celdaGrande">Img</th>
                            <th className="celdaGrande">Aparicion</th>
                            <th className="celdaChica">Casa</th>
                            <th className="celdaChica">Escala_Poder</th>
                            <th className="celdaGrande">Fecha_Alta</th>
                            <th className="celdaGrande">Fecha_Baja</th>
                            <th className="celdaGrande">Estado</th>
                            <th className="celdaGrande">Acciones</th>


                        </tr>


                    </thead>

                    <tbody>

                        { dato.map((heroe, i) => (

                        <tr key={i}>

                           <td className="celdaChica">{i+1}</td>
                           <td className="celdaGrande">{heroe.nombre}</td>
                           <td className="celdaGrande">{heroe.bio}</td>
                           <td className="celdaGrande">{heroe.img}</td>
                           <td className="celdaGrande">{moment(`${heroe.aparicion.year}-${heroe.aparicion.month}-${heroe.aparicion.day}`).format('YYYY-MM-DD')}</td>
                           <td className="celdaChica">{heroe.casa}</td>
                           <td className="celdaChica">{heroe.escalaPoder}</td>
                           <td className="celdaGrande">{moment(`${heroe.fechaAlta.year}-${heroe.fechaAlta.month}-${heroe.fechaAlta.day}`).format('YYYY-MM-DD')}</td>
                           <td className="celdaGrande">{moment(`${heroe.fechaBaja.year}-${heroe.fechaBaja.month}-${heroe.fechaBaja.day}`).format('YYYY-MM-DD')}</td>
                           <td className="celdaGrande">{heroe.estado}</td>
                           <td className="celdaAcciones">
                            <Button variant="warning" size="sm" href={`/updateHeroe/${heroe.idHeroe}`} className="botonChico">UPDATE</Button>
                            <br></br>
                            <br></br>
                            <Button variant="danger" size="sm" href={`/deleteHeroe?id=${heroe.idHeroe}`} className="botonChico">DELETE</Button>
                           </td>


                        </tr>

                        ))}

                    </tbody>


                </Table>    

                <Button variant="success" size="lg" href={`/insertHeroe`} className="botonGrande">INSERT</Button>&nbsp;&nbsp;
                <Button variant="primary" size="lg" href={`/adminPrincipal`} className="botonGrande">RETURN</Button>


                </Alert>

                </div>

            </Fragment>

        )    

    }    

}

export default AdminPrincipalHeroe;