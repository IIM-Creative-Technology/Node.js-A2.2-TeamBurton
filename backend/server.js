import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import http from 'http';

const app = express()
const port = 3000
const myServer = http.createServer(app)
const io = new Server(myServer, {
    cors: {
        origin: '*'
    }
})

app.use(bodyParser.json())
app.use(cors())

myServer.listen(port, () => {
    console.log(`Server listening on http://127.0.0.1:${port}`)
})