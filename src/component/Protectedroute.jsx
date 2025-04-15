import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';

const Protectedroute = ({ children }) => {
    const [isAuth, setIsAuth] = useState(null)
    useEffect(() => {
        axios.get('http://localhost:5000/client/verify', { withCredentials: true })
            .then(() => setIsAuth(true))
            .catch(() => setIsAuth(false))
    },[])
    if (isAuth === null) return <p> Loading</p>
    if (!isAuth){
        return <Navigate to="/login"/>
    }
    return children;
}

export default Protectedroute
