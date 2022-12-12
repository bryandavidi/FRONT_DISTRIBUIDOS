import React , { useState,  useEffect } from "react";
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

function courseList() {
    const [courses,setCourses] = useState([])
    const [search, setSearch] = useState("")

    useEffect(()=>{
        const getCourse = async() => {
            const response = await axios.get('https://54.227.225.13/materias/todas',config)
            setCourses(response.data)
        }
        getCourse()
    },[]);

    const searcher = (e) =>{
        setSearch(e.target.value)
    }

    let results = []
    if(!search)
    {
        results = courses
    }else{
            results = courses.filter( (data)=>
            data.codigo_materia.toLowerCase().includes(search.toLocaleLowerCase())
        )
    } 

    const deleteCourse = async (id) => {
        var option = window.confirm('Esta seguro que desea eliminar la materia seleccionada');
        if(option){
            setCourses(results.filter( data=> data.id_materia !== id))
            await axios.delete('https://54.227.225.13/materias/eliminar',{headers: config.headers , data :{id_materia : id}})
                .then(() => {
                alert("Materia eliminada!");
              });
        }
        
    }
    return(
        <Container>
            <input value = {search} onChange={searcher} type = 'text' placeholder="Buscar" className="form-control"/>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CODIGO</th>
                        <th>NOMBRE</th>
                        <th>CREDITOS</th>
                        <th>CUPOS</th>
                        <th>ESTADO</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map( course =>(
                        <tr key = {course.id_materia}>
                        <th>{course.id_materia}</th>
                        <th>{course.codigo_materia}</th>
                        <th>{course.nombre_materia}</th>
                        <th>{course.creditos_materia}</th>
                        <th>{course.cupos}</th>
                        <th>{course.estado_activo.toString()}</th>
                        <td>
                        <Button className="btn btn-warning mx-1">Editar</Button>
                        <Button className= "btn btn-danger"  onClick={() => deleteCourse(course.id_materia)}>Eliminar</Button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}

export default courseList;