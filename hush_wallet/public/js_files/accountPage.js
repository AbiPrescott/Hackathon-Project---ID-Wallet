
makeWallet()

///////////////////////////// DEFINITIONS OF FUNCTIONS /////////////////////////////////
async function makeWallet() {
    const p1 = document.getElementById("p1")
    const p2 = document.getElementById("p2")
    const p3 = document.getElementById("p3")
    const p4 = document.getElementById("p4")

    await fetch('http://localhost:8000/wallet', { method: "GET" })
        .then(response => {return response.json()})
        .then(data => {
            p1.innerHTML = data.privateKey
            p2.innerHTML = data.publicKey
            p3.innerHTML = data.walletAddress
            p4.innerHTML = data.phrase
        })
}
