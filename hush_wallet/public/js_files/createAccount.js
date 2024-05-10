//MAKE WALLET
const cw_button = document.getElementById("cw_button") //'cw' stands for 'create wallet'
cw_button.addEventListener('click', makeWallet)

//MAKE PASSWORD
const input = document.getElementById('password')
const sub_button = document.getElementById('submit')
sub_button.addEventListener('click', createPassword)



///////////////////////////// DEFINITIONS OF FUNCTIONS /////////////////////////////////
async function makeWallet() {
    const res = await fetch('http://localhost:8000/wallet', { method: "GET" });
    console.log(res)

    const properties = await res.json()

    const p1 = document.getElementById("p1")
    const p2 = document.getElementById("p2")
    const p3 = document.getElementById("p3")
    const p4 = document.getElementById("p4")

    p1.innerHTML = properties.privateKey.privateKey
    p2.innerHTML = properties.publicKey.publicKey
    p3.innerHTML = properties.walletAddress.walletAddress
    p4.innerHTML = properties.phrase.phrase
}

// password is saved on client instead of server like in MetaMask
async function createPassword() {
    const password = input.value
    await fetch('http://localhost:8000/createPassword', 
        { 
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({password: password})
        })
        .then(res => {return res.json()})
        .then(data => {
            localStorage.setItem('password', data.hashed_password);
            localStorage.setItem('salt', data.salt)
            return console.log('logged salt and password')
        })
} 