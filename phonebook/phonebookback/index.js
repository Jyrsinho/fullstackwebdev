const express = require('express');
const morgan = require('morgan');
const app = express();
const Person = require("./models/person");

app.use(express.static('dist'));
app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - body=:body'));


app.get('/api/phoneNumbers', (req, res) => {
    Person.find({})
        .then((people) => {
            res.json(people);
    })
})


app.get('/api/phoneNumbers/:id', (req, res) => {
    const id = req.params.id;
    const phoneNumber = persons.find(phoneNumber => phoneNumber.id === id);

    if (!phoneNumber) {
        res.status(404).send('Given ID Not Found');
    }

    res.send(phoneNumber);
})


app.get('/api/info', (req, res) => {
    const info = `
    <div>
        <p>Phonebook has info for ${persons.length} people.</p>
        <p>${Date.now()}</p>
    `;
    res.send(info);
})

app.post("/api/phoneNumbers", (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).send('Content is missing');
    }

    if (persons.find(phoneNumber => phoneNumber.name === body.name)) {
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
    response.json(person);
})

app.delete('/api/phoneNumbers/:id', (req, res) => {
    const id = req.params.id;

    persons = persons.filter(phoneNumber => phoneNumber.id !== id);
    res.status(204).end();

})

const generateID = () => {
    return Math.floor(Math.random() * 1000000);
}

const Port = 3001;
app.listen(Port)
console.log("Listening on port " + Port);
