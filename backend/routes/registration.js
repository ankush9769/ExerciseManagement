import { Router } from 'express';
import bcrypt from 'bcrypt';
import Client from '../model/client.model.js';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
const router = Router();
dotenv.config();


router.post("/registration", (req, res) => {       //registration
    const { name, email, password } = req.body;
    const hashpassword = bcrypt.hashSync(password, 10);
    const newclient = new Client({
        name: name,
        email: email,
        password: hashpassword
    })
    newclient.save()
        .then((data) => {
            res.json({ message: `Client created successfully`, data })
        })
        .catch((err) => res.json({ message: `Error creating client=${err}` }))
});



router.post("/login", async (req, res) => {        //login
    const { email, password } = req.body
    try {
        const user = await Client.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(404).json({ message: "Invalid password" })
        }
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        console.log("login successfully")
        res.cookie("authtoken", token, {
            httpOnly: true,
            secure: true,
            // sameSite:None,
            maxAge: 3600000          //1hr
        }).json({ message: "login successfully", token, user: { id: user._id, name: user.name, email: user.email } })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" })
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("authtoken", {
      httpOnly: true,
      secure: true,       // set to false if you're on localhost without HTTPS
      sameSite: "None",   // or "Lax" if you're not using cross-site cookies
    }).json({ message: "Logged out successfully" });
  });

router.get("/verify", (req, res) => {              //verification
    const token = req.cookies.authtoken
    if (!token) return res.status(401).json({ message: "Please login to access this resource" })
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        res.json({isAuthendicated:true , user : decode})
    }
    catch(err){
        res.status(401).json({ message: "invalid token" })
    }
});


export default router;