import { Router } from 'express';
import Exercise from '../model/exercise.model.js';

const router = Router();

router.get("/", (req, res) => {   //to get the all exercises 
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json("error:" + err));
});

router.post("/add", (req, res) => {      // to add the new Exercise
    const { username, description, duration, date } = req.body
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    })
    newExercise.save()
        .then((exercise) => res.json(exercise + " Exercise added success"))
        .then(console.log(newExercise))
        .catch(err => res.status(400).json("error:" + err));
})

router.get("/:id", (req, res) => {      // to get the exercise by id
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json("error:" + err));
})

router.delete("/:id", (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(removedexercise => res.json("exercise deleted" + removedexercise))
        .catch(err => res.status(400).json("error:" + err));
})

router.post("/update/:id", (req, res) => {
    const { username, description, duration, date } = req.body
    Exercise.findByIdAndUpdate(req.params.id)
        .then(exercise => {
            exercise.username = username,
                exercise.description = description,
                exercise.duration = duration,
                exercise.date = date
            exercise.save()
                .then(updatedexercise => res.json("updatedExercise=" + updatedexercise))
                .catch(err => res.status(400).json("error:" + err));
        })
        .catch(err => res.status(400).json("error:" + err));
})

router.get('/:username', async (req, res) => {
    try {
        const {username} = req.params;
        console.log("Received username:", username);  // ✅ check
        
        if (!username) return res.status(400).json({ message: "username is required" })

        const exerciselist = await Exercise.find({ username });
        if (!exerciselist.length) return res.status(404).json({ message: "No exercises found" });
        res.json({ exercises: exerciselist})
    }
    catch (err) {
        console.error("Exercise Fetch Error:", err.message);
        res.status(500).json({ message: "there is problem in fetching exercise data of the  user" });
    }
})
export default router;