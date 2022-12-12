import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import  Form  from "react-bootstrap/Form";
import axios from 'axios';
import { Cookies } from 'react-cookie'

import '../css/Login.css';


export const Login = () =>{

    const [body, setBody] = useState({usuario : '', contrasena:''})
    const [token, seToken] = useState('')

    const inputChange = ({target}) =>{
        const {name, value} = target
        setBody({
            ...body,
            [name]:value
        })
    }
    
    const onSubmit = () => {
        axios.post('https://54.227.225.13/auth/login',body)
        .then(data => seToken(data.data.token))
        .catch(response=> console.log(response));
        validate()
    }

    function validate(){
        if(token){
            const cookies = new Cookies();
            cookies.set('token',token,{path:'/'});
            window.location.href="./menu";
        }
    }

    return(
        <Container id="main-container" className="d-grid h-100">
            <Form id="sign-in-form" className="text-center p-3 w-100">
                <img className="mb-4 sesion-logo" 
                src = "https://cdn-icons-png.flaticon.com/512/929/929422.png"
                alt= "sesion"
                />

                <Form.Group className="mb-1">
                    <Form.Control type="text" size="lg" placeholder="usuario" autoComplete="usuario" name="usuario" value={body.usuario} onChange={inputChange} required={true} />
                    
                </Form.Group>
                <div className="invalid-feedback">
                        Ingrese un usuario
                    </div>

                <Form.Group className="mb-3">
                <Form.Control type="password" size="lg" placeholder="contrasena" autoComplete="contrasena" name="contrasena" value={body.contrasena} onChange={inputChange} />
                </Form.Group>

                <div className="d-grid">
                    <Button variant="primary" size="lg" onClick={onSubmit}>Iniciar sesion </Button>
                </div>
                <p className="mt-5">&copy; Sistemas distribuidos 2022-2</p>
            </Form>
        </Container>
    );
}

export default Login;