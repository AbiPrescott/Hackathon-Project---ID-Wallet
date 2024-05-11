//////////////////////////////////// RENDERING //////////////////////////////////////
/* If password was already registered, only give option
* to enter password.
* Else, give options to create/import wallet
*/

if (localStorage.getItem("password") != null) {
    document.getElementById("create_btn").style.display = 'none'
    document.getElementById("import_btn").style.display = 'none'
}
else {
    document.getElementById("password").style.display = 'none'
}

const create_btn = document.getElementById("create_btn")
const import_btn = document.getElementById("import_btn")

create_btn.addEventListener('click', () => window.location.href = 'createAccount.html')
import_btn.addEventListener('click', () => window.location.href = 'importWallet.html')

///////////////////////////// PASSWORD VALIDATING //////////////////////////////////
const correct_password = localStorage.getItem('password')
const salt = localStorage.getItem('salt')
const input = document.getElementById('password')

input.addEventListener('keydown', event => {
    if (event.key == 'Enter') {
        const entered_password = input.value
        sendPassword(entered_password)
    }
})

///////////////////////////// DEFINITIONS OF FUNCTIONS /////////////////////////////////
async function sendPassword(entered_password) {
    await fetch('http://localhost:8000/validatePassword',
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                entered_password: entered_password,
                correct_password: correct_password,
                salt: salt
            })
        })
        .then(response => {return response.text()})
        .then(data => {
            if (data == 'incorrect password'){
                const paragraph = document.createElement('p')
                paragraph.textContent = data
                document.body.appendChild(paragraph)
            }
            else if (data == 'correct password'){
                window.location.href = 'accountPage.html'
            }
        })
    

}