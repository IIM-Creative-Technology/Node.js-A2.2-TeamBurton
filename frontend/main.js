const socket = io('http://127.0.0.1:3000')
const url = "http://127.0.0.1:3000/"

const registerForm = document.getElementById('register-form')
if (registerForm !== null) {
    registerForm.onsubmit = (e) => {
        e.preventDefault()
        const name = document.getElementById('reg-name').value
        const email = document.getElementById('reg-email').value
        const password = document.getElementById('reg-password').value
        fetch(`${url}api/users/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        }).then(response => {
            return response.json()
        }).then(data => {
            messageDisplay(data)
        })
    }
}

const loginForm = document.getElementById('login-form')
if (loginForm !== null) {
    loginForm.onsubmit = (e) => {
        e.preventDefault()
        const email = document.getElementById('log-email').value
        const password = document.getElementById('log-password').value
        fetch(`${url}api/users/connexion`, {
            method: "POST",
            headers: {
                "content-type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => {
            return response.json()
        }).then(data => {
            // data.message === 'Login Successful' ? window.location = 'index.html' : console.log(data.message)
            messageDisplay(data)
        })
    }
}

const deleteForm = document.getElementById('delete-form')
if (deleteForm !== null) {
    deleteForm.onsubmit = (e) => {
        e.preventDefault()
        const email = document.getElementById('del-email').value
        const password = document.getElementById('del-password').value
        fetch(`${url}api/users/delete`, {
            method: "POST",
            headers: {
                "content-type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => {
            return response.json()
        }).then(data => {
            // data.message === 'Login Successful' ? window.location = 'index.html' : console.log(data.message)
            messageDisplay(data)
        })
    }
}

const delButton = document.getElementById('del-button')
if (delButton !== null) {
    delButton.onclick = () => {
        deleteForm.style.display === 'block' ? deleteForm.style.display = 'none' : deleteForm.style.display = 'block'
    }
}

function messageDisplay(data) {
    const resultMessage = document.getElementById('result-message')
    resultMessage.innerText = data.message
}