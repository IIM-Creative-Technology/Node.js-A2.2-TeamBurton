const socket = io('http://127.0.0.1:3000')
const fetch = document.getElementById('fetch')
const name = document.getElementById('name')
const email = document.getElementById('email')

fetch.addEventListener('click', () => {
    fetch('http://127.0.0.1:3000/api/user', {
        method: 'GET',
    }).then(response => response.json)
        .then(data => {
            name.innerText = `${data.lastname} ${data.firstname}`
            email.innerText = `${data.email}`
        })
})