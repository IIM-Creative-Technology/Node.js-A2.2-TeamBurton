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
    }).then(d => {
        return d.json()
    }).then(dd => {
        console.log(dd);
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

