const btn = document.getElementById("btn");
const btnSocket = document.getElementById("btnSocket");
const div = document.getElementById("div");

btn.addEventListener("click", () => {
    fetch("http://localhost:3000/", {
        method: "POST",
        body: JSON.stringify({
            "school": "ENS",
        }),
        headers: {
        "Content-Type": "application/json;charset=utf-8"
        }
    }).then(res => {
        return res.json()
    }).then(response => {
        console.log(response);
    })
});

const socket = io("http://localhost:3000");

btnSocket.addEventListener("click", () => {
    socket.emit("message", 
    {
        msg: "Hello helloo"
    })
});

socket.on("data", (data) => {
    console.log(socket.id); 
    const div2 = document.createElement('div');
    div2.classList.add('thMsg')

    const div3 = document.createElement('div');
    div3.classList.add('text')

    const img = document.createElement('img');
    img.src = "../img/profil.png";

    const user = document.createElement('user');
    user.innerText = "User";

    const p = document.createElement('p');
    p.innerText = data.msg;

    div2.append(img);

    div3.append(user);
    div3.append(p);

    div2.append(img);
    div2.append(div3);

    div.append(div2);
})

const form = document.getElementById("form")
const textmsg = document.getElementById('ecrire')
const sectionchat = document.getElementById('chat')
const mesf = document.getElementById('message')

form.onsubmit = function(e) {
	e.preventDefault(); // On évite le recharchementde la page lors de la validation du formulaire
    // On crée notre objet JSON correspondant à notre message
    let themessage = textmsg.value

    let message = {
	 	text : `${themessage}`
	}

	socket.emit('chat-message', message); // On émet l'événement avec le message associé
    textmsg.value(''); // On vide le champ texte

    socket.emit('chat-message', message);
};


socket.on('chat-message', (message) => {

    const p = document.createElement('p');
    p.innerText = message.text;

    mesf.append(p);
  });