import express from 'express';

const route = express.Router()

export default route.get('/', (req, res) => {
    res.json(
        {
            lastname: "DOE",
            firstname: "John",
            email: "john.doe@gmail.com"
        }
    )
})