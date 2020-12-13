import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercise-list.component";
import ExerciseEdit from "./components/exercise-edit.component";
import ExerciseCreate from "./components/exercise-create.component";
import UserCreate from "./components/user-create.component";


function App() {
  return (
    <Router> 
      <div className="container"> 
        <Navbar />
        <Route path="/" exact component={ExerciseList} />
        <Route path="/edit/:id" exact component={ExerciseEdit} />
        <Route path="/create" exact component={ExerciseCreate} />
        <Route path="/user" exact component={UserCreate} />
      </div>
    </Router>
  );
}

export default App;
