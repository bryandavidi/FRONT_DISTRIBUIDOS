import React from "react";
import {Route, Routes } from "react-router-dom";

import CourseList from "./Components/CourseList.js";
import CourseModals from "./Components/CoursesModals.js";
import InscriptionList from "./Components/InscriptionList.js";
import InscriptionModals from "./Components/InscriptionModals.js";
import StudentList from "./Components/StudentList.js";
import StudentModals from "./Components/StudentModals.js";
import Login from "./Components/Login.js";

import NavBarHome from "./layouts/Navbar.js";
 
function App(){
    return(
        <Routes>
                <Route path = "/menu" element ={<NavBarHome />}>
                    <Route path = "estudiantes" element ={<StudentList/>}/>
                    <Route path = "estudiantes/crear" element ={<StudentModals/>}/>
                    <Route path = "materias" element ={<CourseList />}/>
                    <Route path = "materias/crear" element ={<CourseModals/>}/>
                    <Route path = "inscripciones" element ={<InscriptionList />}/>
                    <Route path = "inscripciones/crear" element ={<InscriptionModals/>}/>
                </Route>
                <Route path = "/" element ={<Login />}/>
        </Routes>      
    );
}

export default App;