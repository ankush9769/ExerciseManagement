import React, { useState , useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');


  useEffect(()=>{
    axios.get(`http://localhost:5000/exercise/${id}`)
    .then(response => {
      setUsername(response.data.username);
      setDescription(response.data.description);
      setDuration(response.data.duration);
      setDate(response.data.date.slice(0, 10)); // ✅ Format for input type=date
    })
    .catch(error => {console.log("error during the editing the exercise"+ error);})
  },[id]);

  const onchangeUsername = (e) => {
    setUsername(e.target.value);
  }
  const onchangeDescription = (e) => {
    setDescription(e.target.value);
  }
  const onchangeDuration = (e) => {
    setDuration(e.target.value);
  }
  const onchangeDate = (e) => {
    setDate(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const Exercise = { username, description, duration, date }
    console.log(Exercise)

    axios.post(`http://localhost:5000/exercise/update/${id}`, Exercise)
      .then(res =>{ 
        console.log("added successfully" + res.data)
        alert('Exercise updated successfully!');
        navigate('/list')
      })
      .catch(err => console.log(err))

    setUsername('')
    setDescription('')
    setDuration('')
    setDate('')
  }
  return (
    <div className='container mt-4'>
      <form onSubmit={handleSubmit}>
        <legend className="mb-3">Edit your Exercise</legend>
        <div className="mb-3">
          <label className="form-label">username</label>
          <input type="text" className="form-control" placeholder="username" value={username} onChange={onchangeUsername} />
        </div>
        <div className="mb-3">
          <label className="form-label">description</label>
          <input type="text" className="form-control" placeholder="description" value={description} onChange={onchangeDescription} />
        </div>
        <div className="mb-3">
          <label className="form-label">duration</label>
          <input type="Number" className="form-control" placeholder="duration" value={duration} onChange={onchangeDuration} />
        </div>
        <div className="mb-3">
          <label className="form-label">date</label>
          <input type="date" className="form-control" placeholder="date" value={date} onChange={onchangeDate} />
        </div>
        <button type="submit" className="btn btn-primary" >Edit Exercise</button>
      </form>
    </div>
  )
}

export default EditExercise
