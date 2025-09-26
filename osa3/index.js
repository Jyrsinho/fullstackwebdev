const express = require('express');
const app = express();

let persons = [
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
    res.send(persons);

})

app.get('/phoneNumbers', (req, res) => {
    res.send(persons);
})


app.get('/phoneNumbers/:id', (req, res) => {
    const id = req.params.id;
    const phoneNumber = persons.find(phoneNumber => phoneNumber.id === id);

    if (!phoneNumber) {
        res.status(404).send('Given ID Not Found');
    }

    res.send(phoneNumber);
})


app.get('/info', (req, res) => {
    const info = `
    <div>
        <p>Phonebook has info for ${persons.length} people.</p>
        <p>${Date.now()}</p>
    `;
    res.send(info);
})

app.post("/phoneNumbers", (request, response) => {
    console.log("persons prePost", persons);
    const body = request.body;
    console.log("request body", request.body)

    if (!body.name || !body.number) {
        return response.status(400).send('Content is missing');
    }

    if (persons.find(phoneNumber => phoneNumber.name === body.name)) {
        console.log("Given name is already in use.");
        return response.status(400).send({
            error: 'Given name is already in use'
        });
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateID(),
    }

    persons = persons.concat([person]);
    console.log("persons postPost", persons);
    response.json(person);
})

app.delete('/phoneNumbers/:id', (req, res) => {
    const id = req.params.id;

    persons = persons.filter(phoneNumber => phoneNumber.id !== id);
    res.status(204).end();

})

const generateID = () => {
    return Math.floor(Math.random() * 1000000);
}

const Port = 3001;
app.listen(Port)
console.log(`Server running on port ${Port}`)
