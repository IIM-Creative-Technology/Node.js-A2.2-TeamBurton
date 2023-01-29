import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import http from 'http';

import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/test')

import RegisterRoute from "./routes/register.js";
import ConnexionRoute from "./routes/connexion.js";
import DeletionRoute from "./routes/delete.js";

const port = 3000

const app = express()
app.use(bodyParser.json())
app.use(cors())

const myServer = http.createServer(app)

const io = new Server(myServer, {
    cors: {
        origin: '*'
    }
})

io.on("connection", socket => {
    console.log(`User connected : ${socket.id}`)
})

app.use('/api/users', RegisterRoute)
app.use('/api/users', ConnexionRoute)
app.use('/api/users', DeletionRoute)

myServer.listen(port, () => {
    console.log(`Server listening on http://127.0.0.1:${port}`)
})