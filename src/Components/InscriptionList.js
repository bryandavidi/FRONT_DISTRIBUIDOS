import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { Cookies } from "react-cookie";

const cookies = new Cookies();
const config = {
    headers:{
        Authorization: cookies.get('token')
    }
}

function inscriptionList() {
    const [search, setSearch] = useState("")
    const [inscriptions,setInscription] = useState([])

    useEffect(()=>{
        const getinscription = async() => {
            const response = await axios.get('https://54.227.225.13/inscripciones/todas',config)
            setInscription(response.data)
        }
        getinscription()
    },[]);

    const searcher = (e) =>{
        setSearch(e.target.value)
        console.log(e.target.value)
    }

    let results = []
    if(!search)
    {
        results = inscriptions
    }else{
            results = inscriptions.filter( (data)=>
            data.id_estudiante.toLowerCase().includes(search.toLocaleLowerCase())
        )
    } 

    const deleteInscription= async (id_estudiante,id_materia) => {
        var option = window.confirm('Esta seguro que desea eliminar la inscripcion seleccionada');
        if(option){
            setInscription(results.filter( data=> data.id_materia !== id_materia && data.id_estudiante!== id_estudiante))
            await axios.delete('https://54.227.225.13/inscripciones/eliminar',{headers: config.headers , data :{id_estudiante: id_estudiante, id_materia : id_materia}})
                .then(() => {
                alert("Inscripcion eliminada!");
              });
        }
        
    }

    return(
        <Container>
            <input value = {search} onChange={searcher} type = 'text' placeholder="Buscar" className="form-control"/>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID ESTUDIANTE</th>
                        <th>ID MATERIA</th>
                        <th>FECHA DE INSCRIPCION</th>
                    </tr>
                </thead>
                    <tbody>
                        {results.map(inscription =>(
                            <tr>
                                <th>{inscription.id_estudiante}</th>
                                <th>{inscription.id_materia}</th>
                                <th>{inscription.fecha_inscripcion}</th>
                                <td>
                        <Button className= "btn btn-danger"  onClick={() => deleteInscription(inscription.id_estudiante,inscription.id_materia )}>Eliminar</Button>
                        </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </Container>
    )
}

export default inscriptionList;