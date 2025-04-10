import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()


const protect = (req,res,next)=>{
    const token = req.cookies.authToken;
    if (!token) return res.status(401).send('Access denied. No token provided.');
    try{
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode.id;
    next();
    }
    catch(err){
        console.log("error:"+err);
        res.status(401).send('Invalid token');
    }
}
export default protect;