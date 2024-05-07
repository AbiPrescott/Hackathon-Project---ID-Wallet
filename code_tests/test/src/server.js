
const express = require('express');
const path = require('path');
const ethers = require('ethers')

const app = express();

app.use(express.static('../public'))
app.use(express.json())

app.listen(8000, () => {
    console.log('Server is running at port 8000');
})

async function generateKeys (req, res, next) {
    const wallet = ethers.Wallet.createRandom();
    const privateKey = wallet.privateKey
    const publicKey = wallet.publicKey
    const walletAddress = wallet.address
    const phrase = wallet.mnemonic.phrase


    res.json({
        privateKey:{privateKey},
        publicKey:{publicKey},
        walletAddress:{walletAddress},
        phrase:{phrase}
    });
    next(); 
}

async function importWallet (req, res, next) {
    const { phrase } = req.body

    const wallet = ethers.Wallet.fromMnemonic(phrase);
    const privateKey = wallet.privateKey
    const publicKey = wallet.publicKey
    const walletAddress = wallet.address

    console.log(phrase)
    console.log(wallet.privateKey)
    console.log(wallet.address)

    res.json({
        privateKey:{privateKey},
        publicKey:{publicKey},
        walletAddress:{walletAddress},
    })
    next()

}

app.get('/', (req, res) => {
   res.send('<p>hello</p>') 
})

app.get('/wallet', generateKeys)

app.post('/importWallet', importWallet);

