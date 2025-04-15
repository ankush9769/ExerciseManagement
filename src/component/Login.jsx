import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  

  const onchangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onchangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password)
    const data = {
      email,
      password
    }
    axios.post('http://localhost:5000/client/login', data,{ withCredentials: true})
      .then((res) => {
        console.log(res)
        alert("login Successfull")
        navigate('/dashboard');
      })
      .catch((err) => { console.log(err) });
  }


  return (
    <div className='container mt-4'>
      <form onSubmit={handleSubmit}>
        <h3 className='text-primary'>Login</h3>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="email" value={email} onChange={onchangeEmail} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="password" value={password} onChange={onchangePassword} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
