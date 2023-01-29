import express from "express"
import path from "path"
import session from 'express-session';
// somewhere in your initialization file
let app = express()


app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
  }),
);
import sharedsession from "express-socket.io-session"
import { Server } from "socket.io"
import { createServer } from 'http'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const httpServer = createServer(app)



app.get('/', function(req, res) {
	res.sendFile(path.resolve(__dirname + '/../frontend/tic-tac-toe.html'))
})

app.get('/tic-tac-toe.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.resolve(__dirname, '../frontend/tic-tac-toe.css'));
  });

  
  
app.get('/tic-tac-toe.js', (req, res) => {
res.setHeader('Content-Type', 'application/javascript');
res.sendFile(path.resolve(__dirname, '../frontend/tic-tac-toe.js'));
});



//server.maxConnections = 4;

let io = new Server(httpServer,{
	cors:{
		origin:"*"
	}
})
io.use(sharedsession(session))

function isWinner(board) {
	let winners = [
		[
			0,
			1,
			2
		],
		[
			3,
			4,
			5
		],
		[
			6,
			7,
			8
		],
		[
			0,
			3,
			6
		],
		[
			1,
			4,
			7
		],
		[
			2,
			5,
			8
		],
		[
			0,
			4,
			8
		],
		[
			2,
			4,
			6
		]
	]

	for (let i = 0; i < winners.length; i++) {
		let winner = winners[i]

		if (!(board[winner[0]] && board[winner[1]] && board[winner[2]])) continue

		if (board[winner[0]] == board[winner[1]] && board[winner[1]] == board[winner[2]]) return true
	}

	return false
}

let letter = 'X'

let userCount = 0

let board = []

let turn = 'X'
let letters = { X: 'O', O: 'X' }

io.on('connection', function(socket) {
	if (userCount >= 2) {
		socket.emit('max_players', 'There are currently 2 players already playing. Please try agin later.')
		socket.disconnect()
	}

	socket.handshake.session.letter = letter
	socket.handshake.session.save()
	userCount++

	letter = 'O'

	socket.on('click', function(id) {
		if (board[parseInt(id)] || turn != socket.handshake.session.letter) return

		board[parseInt(id)] = turn
		io.emit('click', [
			id,
			turn
		])

		if (isWinner(board)) {
			io.emit('winner', `${turn} wins!`)
			io.emit('reset', null)
			board = []
		}

		turn = letters[turn]
	})

	socket.on('reset', function(stuff) {
		io.emit('reset', null)
		board = []
	})

	socket.on('disconnect', function() {
		letter = socket.handshake.session.letter
		userCount--
		io.emit('reset', null)
	})
})

httpServer.listen(3000, () => {
	console.log("zdqd")
})