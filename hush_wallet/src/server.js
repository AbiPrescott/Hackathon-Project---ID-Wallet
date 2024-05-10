
const express = require('express')
const cors = require('cors')
const crypto = require('node:crypto')

const app = express()

app.use(cors())
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
    return next();
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
    return next()

}

function hashPassword(req, res, next) {
    const password = req.body.password
    var salt = crypto.randomBytes(16) //recomended by geeksforgeeks
    const salt_string = salt.toString('hex') //turned to string because localStorage only accecpts strings
    const iterations = 600000
    const keylen = 128 //choice is arbritrary
    const digest = 'sha512' //choice is arbritrary

    const hashed_password = crypto.pbkdf2Sync(password, salt_string, iterations, keylen, digest)
    res.json({
        hashed_password: hashed_password.toString('hex'),
        salt: salt_string
    })

    return next()
}

function validatePassword(req, res, next) {
    //hash it again
    var entered_password = req.body.entered_password
    const correct_password = req.body.correct_password
    const salt = req.body.salt
    const iterations = 600000
    const keylen = 128 //choice is arbritrary
    const digest = 'sha512' //choice is arbritrary

    let hashed_password = crypto.pbkdf2Sync(entered_password, salt, iterations, keylen, digest)
    
    //validate
    if (hashed_password.toString('hex') == correct_password) {
        res.send('correct password')
        console.log('correct')
    }
    else {
        res.send('incorrect password')
        console.log('incorrect')
    }

    return next()


}



app.post('/createPassword', hashPassword)

app.post('/validatePassword', validatePassword)

app.get('/', (req, res) => {
    res.send('<p>hello</p>')
})

app.get('/wallet', generateKeys)

app.post('/importWallet', importWallet);


