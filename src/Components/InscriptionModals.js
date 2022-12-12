import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Cookies } from "react-cookie";


const cookies = new Cookies();

const config = {
    headers:{
        Authorization: cookies.get('token')
    }
}

function InscriptionModals() {
  const [show, setShow] = useState(true);
  const [students,setStudents] = useState([])
  const [courses,setCourses] = useState([])
  const [course,setCourse] = useState('')
  const [student,setStudent] = useState('')
  const [date,setDate] = useState('')


  useEffect( () => {
    const getstudent = async() => {
        const response= await axios.get('https://54.227.225.13/estudiantes/todos',config)
        setStudents(response.data)
    }

    const getCourse = async() => {
      const response = await axios.get('https://54.227.225.13/materias/todas',config)
      setCourses(response.data)
  }
    getCourse()
    getstudent()
  },[]);

  const data = {
    id_estudiante : student , id_materia : course , fecha_inscripcion : date
  }

  const inscription = () =>{
    axios.post('https://54.227.225.13/inscripciones/crear', data ,config).then(() => {
      alert("Inscripcion Creada!");
    });
    setShow(false)
  }

  const handleClose = () =>{
    setShow(false)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Inscripcion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Codigo estudiante</Form.Label>
              <select className="form-select" defaultValue={'DEFAULT'} aria-label="Default select example" onChange={(e)=> setStudent(e.target.value)}>
                {students.map( student => (
                  <option key={student.id_estudiante} value={student.id_estudiante}>
                    {student.codigo_estudiante}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <select className="form-select" defaultValue={'DEFAULT'} aria-label="Default select example" onChange={(e)=> setCourse(e.target.value)}>
                {courses.map( course => (
                  <option key={course.id_materia} value={course.id_materia}>
                    {course.nombre_materia}
                  </option>
                ))}
              </select>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Fecha de inscripcion</Form.Label>
              <Form.Control type="date" onChange={(e)=> setDate(e.target.value)} autoFocus/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={inscription}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InscriptionModals;