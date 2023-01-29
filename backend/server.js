
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

app.use('/api/users', RegisterRoute)
app.use('/api/users', ConnexionRoute)
app.use('/api/users', DeletionRoute)

myServer.listen(port, () => {
    console.log(`Server listening on http://127.0.0.1:${port}`)
})
