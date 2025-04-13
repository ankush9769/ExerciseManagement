import React,{ useState } from 'react'
import axios from 'axios'

const CreateUser = () => {
  const [username, setUsername] = useState('');

  const onchangeUsername = (e)=>{
    setUsername(e.target.value);
  }
  const handleSubmit = ()=>{
    console.log(username);

    let Username ={username}

    axios.post("http://localhost:5000/user/add",Username)
    .then(res => console.log("user created sunccessfully"+res.data))
    .catch(err =>console.log(err))

    setUsername('')
    window.location="/list";

  }
  return (
    <div className='container mt-4'>
            <form onSubmit={handleSubmit}>
                <legend className="mb-3">Add user</legend>
                <div className="mb-3">
                    <label className="form-label">username</label>
                    <input type="text" className="form-control" placeholder="username" value={username} onChange={onchangeUsername} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    
        
      
   
  )
}

export default CreateUser
