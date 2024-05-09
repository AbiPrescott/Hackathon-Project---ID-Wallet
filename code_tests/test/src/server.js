
const express = require('express')
const path = require('path')
const ethers = require('ethers')
const crypto = require('node:crypto');
const { hexConcat } = require('ethers/lib/utils');
//const routes = require('./routes/api')
//const bodyParser = require('body-parser')

const app = express();

//app.use(bodyParser.urlencoded({extended: false}))
//app.use(express.json())
//app.use('/', routes)

app.use(express.static('../public'))
app.use(express.json())





app.listen(8000, () => {
    console.log('Server is running at port 8000');
})

async function generateKeys(req, res, next) {
    const wallet = ethers.Wallet.createRandom();
    const privateKey = wallet.privateKey
    const publicKey = wallet.publicKey
    const walletAddress = wallet.address
    const phrase = wallet.mnemonic.phrase


    res.json({
        privateKey: { privateKey },
        publicKey: { publicKey },
        walletAddress: { walletAddress },
        phrase: { phrase }
    });
    next();
}

async function importWallet(req, res, next) {
    const { phrase } = req.body

    const wallet = ethers.Wallet.fromMnemonic(phrase);
    const privateKey = wallet.privateKey
    const publicKey = wallet.publicKey
    const walletAddress = wallet.address

    console.log(phrase)
    console.log(wallet.privateKey)
    console.log(wallet.address)

    res.json({
        privateKey: { privateKey },
        publicKey: { publicKey },
        walletAddress: { walletAddress },
    })
    next()

}

function hashPassword(req, res, next) {
    var password = req.url
    var salt = crypto.randomBytes(16) //recomended by geeksforgeeks
    const iterations = 600000
    const keylen = 128 //choice is arbritrary
    const digest = 'sha512' //choice is arbritrary

    var hashed_password = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)
    res.send(hashed_password.toString('hex'))

    next()
}



app.post('/createPassword', hashPassword)

app.get('/', (req, res) => {
    res.send('<p>hello</p>')
})

app.get('/wallet', generateKeys)

app.post('/importWallet', importWallet);


