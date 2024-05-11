
// NOT COMPLETE

const button = document.getElementById('import_btn')
const input = document.getElementById('input')

const string = JSON.stringify({phrase: input.value})

button.addEventListener("click", importWallet);


async function importWallet(){
    console.log(JSON.stringify(input.value))
    await fetch('http://localhost:8000/importWallet', 
    {
        method: "POST",
        headers: 
        {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({phrase: input.value})
    });

}