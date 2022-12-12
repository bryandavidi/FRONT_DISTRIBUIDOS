import React, { useState } from 'react';
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

function CourseModals() {
  const [show, setShow] = useState(true);
  const [id, setId] = useState(0);
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [creditos, setCreditos] = useState(0);
  const [cupos, setCupos] = useState(0);
  const [estado, setEstado] = useState('');

  const data = {
    id_materia : id ,codigo_materia: codigo,nombre_materia:nombre,creditos_materia:creditos,cupos:cupos,estado_activo:cast(estado)
  }

  function cast(str){
    var isSet;
    if (str.toLowerCase() === 'true') {
        isSet = true;
    }
    
    if (str.toLowerCase() === 'false') {
        isSet = false;
    }
    return isSet;
  }

  const course = () =>{
    console.log(data)
    axios.post('https://54.227.225.13/materias/crear', data ,config).then(() => {
      alert("Materia Creada!");
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
          <Modal.Title>Crear Materia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID materia</Form.Label>
              <Form.Control type="number" placeholder="Ejemplo : 201910225" onChange={(e)=> setId(e.target.value)} autoFocus/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Codigo materia</Form.Label>
              <Form.Control type="text" placeholder="Ejemplo : 1193148979" onChange={(e)=> setCodigo(e.target.value)} autoFocus/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre materia</Form.Label>
              <Form.Control type="text" placeholder="Ejemplo : Sistemas distribuidos" onChange={(e)=> setNombre(e.target.value)} autoFocus/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Creditos</Form.Label>
              <Form.Control type="number" placeholder="Ejemplo : 4" onChange={(e)=> setCreditos(e.target.value)} autoFocus/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cupos</Form.Label>
              <Form.Control type="number" placeholder="Ejemplo : 20" onChange={(e)=> setCupos(e.target.value)} autoFocus/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Estado</Form.Label>
              <select className="form-select" defaultValue={'DEFAULT'} aria-label="Default select example" onChange={(e)=> setEstado(e.target.value)}>
                <option selected>Estado de la materia</option>
                <option value = 'true' >Activa</option>
                <option value = 'false'>Desactiva</option>
            </select>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={course}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CourseModals;