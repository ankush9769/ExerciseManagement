import { Router } from 'express';
import bcrypt from 'bcrypt';
import Client from '../model/client.model.js';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"
const router = Router();
dotenv.config();

router.post("/registration", (req, res) => {       //registration
    const { name, email, password } = req.body;
    const hashpassword = bcrypt.hashSync(password, process.env.JWT_SECRET);
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



router.get("/login", async (req, res) => {        //login
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
            maxAge: 3600000          //1hr
        }).json({ message: "login successfully", token, user: { id: user._id, name: user.name, email: user.email } })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" })
    }
});

router.post("/logout", (req, res) => {              //logout
    res.clearCookie("authToken").json({ message: "Logged out successfully" });
});


export default router;