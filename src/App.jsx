import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./component/Navbar";
import EditExercise from "./component/EditExercise";
import CreateExercise from "./component/CreateExercise";
import CreateUser from "./component/CreateUser";
import ExerciseList from "./component/ExerciseList";
import Login from "./component/Login";
import Registration from "./component/Registration";
import ClientDashboard from "./component/ClientDashboard";
import Protectedroute from "./component/Protectedroute";

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Navbar />
        <Routes>
          <Route path="/" element={<Registration/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Protectedroute><ClientDashboard/></Protectedroute>}/>
          <Route path="/list" element={<ExerciseList />} />
          <Route path="/edit/:id" element={<EditExercise />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/createuser" element={<CreateUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
