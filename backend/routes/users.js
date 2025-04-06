import Router from 'express';
import User from '../model/users.model.js'
const router = Router();

router.get("/", (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("error:" + err))
});

router.post("/add", (req, res) => {
    let { username } = req.body;
    const newuser = new User({
        username
    })
    newuser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json("error:" + err))
});

export default router;
