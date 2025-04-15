import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClientDashboard = () => {
    const [User, setUser] = useState(null);
    const [lists, setLists] = useState([]);
    const [username,setUsername] =useState(null)

    useEffect(() => {
        axios.get('http://localhost:5000/client/verify', { withCredentials: true })
            .then(res => {
                setUser(res.data.user); // 👈 This is the user object from backend
                setUsername(res.data.user.name)
                console.log(res.data.user)
                console.log("fetching exercise for this user=",res.data.user.name)
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (username) {
            console.log("requesting lists for user",username);
            axios.get(`http://localhost:5000/exercise/${username}`)
                .then(res => { 
                    setLists(res.data.exercises);
                    console.log(res.data.exercises)
                })
                .catch(err => console.log("mera error",err));    
        }
    },[username])

    if (!User) return <p>Loading user info...</p>;

    return (
        <div className="container">
            <h1>Welcome, {User.name} 👋</h1>
            <p>Email: {User.email}</p>
            {/* Add more user info here if needed */}
            <div className='container'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">SR.</th>
                            <th scope="col">description</th>
                            <th scope="col">duration</th>
                            <th scope="col">date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lists.map((list, index) => (
                            <tr key={list._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{list.description}</td>
                                <td>{list.duration}</td>
                                <td>{new Date(list.date).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/edit/${list._id}`} className="btn btn-outline-primary ">edit</Link>
                                    <button className="btn btn-outline-danger ms-3" >delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default ClientDashboard;
