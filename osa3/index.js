const express = require('express');
const app = express();

const phoneNumbers = [
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

app.get('/info', (req, res) => {
    const info = `
    <div>
        <p>Phonebook has info for ${phoneNumbers.length} people.</p>
        <p>${Date.now()}</p>
    `;
    res.send(info);
})

const Port = 3001;
app.listen(Port)
console.log(`Server running on port ${Port}`)
