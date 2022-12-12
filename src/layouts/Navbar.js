import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet, Link } from 'react-router-dom';
import { Cookies } from "react-cookie";

const cookies = new Cookies();

function removeCookie(name){
    cookies.remove(name)
}

function NavBarHome (){
    return(
        <div>
         <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Estudiantes" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to='estudiantes' >Mostrar estudiantes</NavDropdown.Item>
                    <NavDropdown.Item as = {Link} to="estudiantes/crear">Crear estudiante</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Materias" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to = 'materias'>Mostrar materias</NavDropdown.Item>
                    <NavDropdown.Item as = {Link} to="materias/crear">Crear materia</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Inscripciones" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to='inscripciones'>Mostrar Inscripciones</NavDropdown.Item>
                    <NavDropdown.Item as = {Link} to="inscripciones/crear">Crear Inscripcion</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to='/' onClick={removeCookie('token')}>Cerrar sesión</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Outlet/>
        </div>
    );
}

export default NavBarHome;