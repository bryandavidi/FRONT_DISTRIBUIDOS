import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const config = {
    headers:{
        Authorization: cookies.get('token')
    }
}

function StudentModals() {
  const[show, setShow] = useState(true);
  const[id, setId] = useState(0);
  const[codigo, setCodigo] = useState(0);
  const[tipo, setTipo] = useState('');
  const[documento, setDocumento] = useState('');
  const[nombres, setNombres] = useState('');
  const[apellidos, setApellidos] = useState('');
  const[estado, setEstado] = useState('');
  const[file, setFile] = useState(null);


  const student = async() =>{
    const formData = new FormData();
    formData.append('file' , file)
    formData.append('container' , 'imagenesira')
    formData.append('id_estudiante' , id,)
    formData.append('codigo_estudiante' , codigo)
    formData.append('tipo_documento' , tipo)
    formData.append('numero_documento' , documento)
    formData.append('nombres' , nombres)
    formData.append('apellidos' , apellidos)
    formData.append('estado' , estado)

    await axios.post('https://54.227.225.13/estudiantes/crear',formData,config)
    .then(() => {
      alert("Estudiante Creado!");
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
          <Modal.Title>Crear estudiante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='form'>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Id Estudiante</Form.Label>
              <Form.Control type="number" placeholder="Ejemplo : 9999" value={id} onChange={(e)=> setId(e.target.value)} autoFocus/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Codigo Estudiante</Form.Label>
              <Form.Control type="number" placeholder="Ejemplo : 201910225" value={codigo} onChange={(e)=> setCodigo(e.target.value)} autoFocus/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tipo de documento</Form.Label>
              <select value={tipo} className="form-select" aria-label="Default select example" onChange={(e)=> setTipo(e.target.value)}>
                <option selected>Seleccione un tipo de documento</option>
                <option value="Cedula">Cedula</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="Tarjeta de identidad">Tarjeta de identidad</option>
            </select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Numero de documento</Form.Label>
              <Form.Control type="text" placeholder="Ejemplo : 1193148979" value={documento} onChange={(e)=> setDocumento(e.target.value)} autoFocus/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombres</Form.Label>
              <Form.Control type="text" placeholder="Ejemplo : Bryan David" value={nombres} onChange={(e)=> setNombres(e.target.value)} autoFocus/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control type="text" placeholder="Ejemplo : Ibañez Gutierrez" value={apellidos} onChange={(e)=> setApellidos(e.target.value)} autoFocus/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Estado</Form.Label>
              <select className="form-select" aria-label="Default select example" onChange={(e)=> setEstado(e.target.value)} value={estado}>
                <option selected>Estado</option>
                <option value="Matriculado">Matriculado</option>
                <option value="No Matriculado">No Matriculado</option>
                </select>      
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Fotografia</Form.Label>
              <Form.Control type="file"  onChange={(e)=> setFile(e.target.files[0])} autoFocus/>
            </Form.Group>

          </Form>       
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type='submit' variant="primary" onClick={student}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StudentModals;