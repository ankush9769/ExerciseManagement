import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/exercise')
      .then(response => {
        setExercises(response.data);
        // console.log(response.data)
      })
      .catch(error => console.error("there is something problem to retrive the list of Exercise" + error))
  }, []);

  const ondeletehandle = (id) => {             //this for delelte the execise from the list of the exercise
    axios.delete(`http://localhost:5000/exercise/${id}`)
      .then(response => {
        console.log("exercise deleted" + response.data)
        setExercises(prevExercises => prevExercises.filter(ex => ex._id !== id));    //to remove the delelted exercise from the list of the exercise(state)
      })
      .catch(error => console.error("there is something problem to delete the exercise" + error))
  }


  return (
    <div className='container'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">SR.</th>
            <th scope="col">Username</th>
            <th scope="col">description</th>
            <th scope="col">duration</th>
            <th scope="col">date</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise, index) => (
            <tr key={exercise._id}>
              <th scope="row">{index + 1}</th>
              <td>{exercise.username}</td>
              <td>{exercise.description}</td>
              <td>{exercise.duration}</td>
              <td>{exercise.date}</td>
              <td>
                <Link to={`/edit/${exercise._id}`} className="btn btn-outline-primary ">edit</Link>
                <button className="btn btn-outline-danger ms-3" onClick={()=>ondeletehandle(exercise._id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default ExerciseList
