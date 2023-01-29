const div = document.getElementById("div");

const form = document.getElementById("form")
const textmsg = document.getElementById('ecrire')
const zonemsg = document.getElementById('zonemsg')

const socket = io("http://localhost:3000");


form.onsubmit = function(e) {
	e.preventDefault(); 

  let themessage = textmsg.value
  let message = {
    text : `${themessage}`
  }

  if (themessage.length !== 0) {
	  socket.emit('chat-message', message);
    textmsg.value = '';
  }

};

socket.on('message', (message) => {

  const div2 = document.createElement('div');
  div2.classList.add('thTxt')
  const div3 = document.createElement('div');
  div3.classList.add('thMsg')

  const img = document.createElement('img');
  img.src = "../img/profil.png";

  const user = document.createElement('p');
  user.classList.add('mesTxt')
  user.innerText = 'User';

  const p = document.createElement('p');
  p.innerText = message.text;

  div2.append(user);
  div2.append(p);
  
  div3.append(img);
  div3.append(div2);
  

  div.append(div3);


  });


console.log(data)