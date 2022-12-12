import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from "./ImageModals";

import { Cookies } from "react-cookie";

const cookies = new Cookies();

const config = {
    headers:{
        Authorization: cookies.get('token')
    }
}



function studentList(){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false)
    
    const handleShow = () => setShow(true);
    
    const [url, setUrl] =  useState([]);
    
    const [students,setStudent] = useState([]);
    
    const [search, setSearch] = useState("");

    useEffect( () => {
        const getstudent = async() => {
            const response= await axios.get('https://54.227.225.13/estudiantes/todos',config)
            setStudent(response.data)
        }
        getstudent()
    },[]);
    
    const searcher = (e) =>{
        setSearch(e.target.value)
    }

    let results = []
    if(!search)
    {
        results = students
    }else{
            results = students.filter( (data)=>
            data.codigo_estudiante.toLowerCase().includes(search.toLocaleLowerCase())
        )
    } 

    const deleteStudent = async (id) => {
        var option = window.confirm('Esta seguro que desea eliminar el estudiante seleccionado');
        if(option){
            setStudent(results.filter( data=> data.id_estudiante !== id))
            await axios.delete('https://54.227.225.13/estudiantes/eliminar',{headers: config.headers , data :{id_estudiante : id , container: 'imagenesira'}})
                .then(() => {
                alert("Estudiante eliminado!");
              });
        }
        
    }

    function modal( url ){
        handleShow();
        setUrl(url);
    }
    
    return (
        <>
        <Container className="container-fluid">
            <input  value = {search} onChange={searcher} type = 'text' placeholder="Buscar" className="form-control"/>
            <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>CODIGO</th>
                    <th>TIPO DE DOCUMENTO</th>
                    <th>NUMERO DE DOCUMENTO</th>
                    <th>NOMBRES</th>
                    <th>APELLIDOS</th>
                    <th>ESTADO</th>
                </tr>
            </thead>
            <tbody>
                {results.map(student =>(
                    <tr key = {student.id_estudiante}>
                        <th>{student.id_estudiante}</th>
                        <th>{student.codigo_estudiante}</th>
                        <th>{student.tipo_documento}</th>
                        <th>{student.numero_documento}</th>
                        <th>{student.nombres}</th>
                        <th>{student.apellidos}</th>
                        <th>{student.estado}</th>
                        <td>
                        <Button className="btn btn-info" onClick={()=> modal(student.imagen) }>Imagen</Button>
                        <Button className="btn btn-warning mx-1">Editar</Button>
                        <Button className= "btn btn-danger"  onClick={() => deleteStudent(student.id_estudiante)}>Eliminar</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Container>
        <Modal show = {show} handleClose={handleClose} url = {url}/>
    </>
    );
}

export default studentList;