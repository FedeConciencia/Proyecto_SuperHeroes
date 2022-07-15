import React, { useState, useEffect, Fragment } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Table from 'react-bootstrap/Table'
import Navigation from "../Navigation";
import { useLocation } from "react-router-dom";
import moment from 'moment';
import {useNavigate} from 'react-router-dom';

const AdmDeleteHeroe = (props) => {

    //Obtengo los datos pasados por search URL =>
    let {search} = useLocation();
    let query = new URLSearchParams(search)

    //Permite direccionar a la pagina =>
    const navigate = useNavigate();

    const[dato,setDato] = useState(null)

    const[url,setUrl] = useState(query.get("id"))


    useEffect(() => {

        setUrl("id")
        getDelete()
       

    },[query.get("id")])


    const getDelete = async() => {

        try{

            //Se Obtiene el id pasado por URL =>
            const idUrl = query.get("id")

            console.log("ID URL => ", idUrl)

            const response = await axios(`http://localhost:8080/SuperHeroes/HeroesServlet`, {

                method:"GET",
                params:{

                    action:"eliminarLogico",
                    idHeroe:idUrl,
                    fechaBaja:moment().format('YYYY-MM-DD'),

                }

            })

            const resJson = await response.data

            alert("El registro seleccionado fue eliminado con exito.")

            //Redirecciono y paso los datos a traves de un search =>
            navigate(`/principalHeroe`)


        }catch(error){


            console.log("Error => ", error)
            alert("Error. No fue posible eliminar el registro.")

        }    


    }



}

export default AdmDeleteHeroe;