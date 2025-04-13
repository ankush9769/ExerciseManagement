import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const Registration = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const onchangeName = (e) => {
        setName(e.target.value)
    }
    const onchangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onchangePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, password)
        const data = {
            name,
            email,
            password
        }
        axios.post('http://localhost:5000/client/registration', data)
            .then((res) => { console.log(res.data) 
                alert("Registration Successfull")
                navigate('/login');
            })
            .catch((err) => { console.log(err) });
    }

    return (
        <div className='container mt-4'>
            <form onSubmit={handleSubmit}>
                <h3 className='text-success'>Registration</h3>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="name" value={name} onChange={onchangeName} />
                </div>
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

export default Registration
