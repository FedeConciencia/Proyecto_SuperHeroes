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

const AdmDeletePoderes = (props) => {

    //Obtengo los datos pasados por search URL =>
    let {search} = useLocation();
    let query = new URLSearchParams(search)

    //Direccionar a la pagina =>
    const navigate = useNavigate()

    const[dato,setDato] = useState()

    const[idUrl, setIdUrl] = useState(query.get("id"))

    useEffect(() => {

        setIdUrl(query.get("id"))
        getDelete()

    },[query.get("id")])

    const getDelete = async() => {

        try{

            const urlId = query.get("id")

            const response = await axios(`http://localhost:8080/SuperHeroes/PoderesServlet`, {

                method:"GET",
                params:{

                    action:"eliminarLogico",
                    idPoderes:urlId,
                    fechaBaja:moment().format('YYYY-MM-DD'),


                }

            })

            const resJson = await response.data

            console.log("DATO API => ", resJson)

            alert("Dato seleccionado eliminado con exito.")

            //Redirecciono y paso los datos a traves de un search =>
            navigate(`/principalPoderes`)

        }catch(error){

            console.log("Error => ", error)

            alert("Error. No fue posible eliminar el dato seleccionado.")

        }


    }


}

export default AdmDeletePoderes