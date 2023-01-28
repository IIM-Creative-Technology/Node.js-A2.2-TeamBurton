import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {Server} from "socket.io";
import http from 'http';
import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/test');

const userSchema = {
    name: String,
    mail: String,
    password: String,
    isAdmin: Boolean,
    isVerify: Boolean,
    age: Number
};

const User = mongoose.model('User', userSchema);

// User.find()
// .then(users => { console.log(users) })
// .catch(error => { console.log("User Find Error", error) })

const app = express();
const httpServer = http.createServer(app);

const port = 3000;

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
    console.log(`A user connected. Socket id: ${socket.id}`);

    socket.on('chat-message', (message) => {
        io.emit("message", message)
        console.log('message : ' + message.text);
    });
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    console.log(`Un utilisateur s'est connecté`);
    res.json({msg: "Hello world"});
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.json(req.body);
})

httpServer.listen(port, () => {
    console.log(`Le serveur écoute sur ${port}`);
});