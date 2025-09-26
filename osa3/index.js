const express = require('express');
const app = express();

let phoneNumbers = [
            {
                "name": "Dan Abramov",
                "number": "12-43-234345",
                "id": "3"
            },
            {
                "name": "Mary Poppendieck",
                "number": "39-23-6423122",
                "id": "4"
            },
            {
                "id": "02df",
                "name": "Kalle",
                "number": "200"
            },
            {
                "id": "111b",
                "name": "Kalle2",
                "number": "0400"
            },
            {
                "id": "f2d3",
                "name": "Kalle400",
                "number": "300"
            },
            {
                "id": "55f4",
                "name": "Jyri",
                "number": "0400"
            },
            {
                "id": "13f2",
                "name": "Aatami",
                "number": "400"
            }
]



app.use(express.json());

app.get('/', (req, res) => {
    res.send(phoneNumbers);

})

app.get('/phoneNumbers', (req, res) => {
    res.send(phoneNumbers);
})


app.get('/phoneNumbers/:id', (req, res) => {
    const id = req.params.id;
    const phoneNumber = phoneNumbers.find(phoneNumber => phoneNumber.id === id);

    if (!phoneNumber) {
        res.status(404).send('Given ID Not Found');
    }

    res.send(phoneNumber);
})


app.get('/info', (req, res) => {
    const info = `
    <div>
        <p>Phonebook has info for ${phoneNumbers.length} people.</p>
        <p>${Date.now()}</p>
    `;
    res.send(info);
})

app.delete('/phoneNumbers/:id', (req, res) => {
    const id = req.params.id;

    phoneNumbers = phoneNumbers.filter(phoneNumber => phoneNumber.id !== id);
    res.status(204).end();

})

const Port = 3001;
app.listen(Port)
console.log(`Server running on port ${Port}`)
