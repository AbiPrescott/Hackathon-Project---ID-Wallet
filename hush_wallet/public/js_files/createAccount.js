
const cw_button = document.getElementById("cw_button") //'cw' stands for 'create wallet'
const input = document.getElementById('password')

cw_button.addEventListener('click', createPassword)

///////////////////////////// DEFINITIONS OF FUNCTIONS /////////////////////////////////
async function createPassword() {
    const password = input.value
    await fetch('http://localhost:8000/createPassword', 
        { 
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({password: password})
        })
        .then(response => {return response.json()})
        .then(data => {
            // password is saved on client instead of server like in MetaMask
            localStorage.setItem('password', data.hashed_password); 
            localStorage.setItem('salt', data.salt)
            return console.log('logged salt and password')
        })
    window.location.href = 'accountPage.html'
} 