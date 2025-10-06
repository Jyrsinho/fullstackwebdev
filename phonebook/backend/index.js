require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const Person = require("./models/person.js");
const {response} = require("express");


app.use(express.static('dist'));
app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - body=:body'));

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger);


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

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    console.log("Creating new person to DB", person)
    person.save()
        .then(savedperson=> {
            console.log('person saved!')
            response.json(savedperson);
    })
})

app.delete('/api/phoneNumbers/:id', (request, response, next) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id)
    .then(result=> {
        if (result) {
            console.log("Removed succesfully", result)
        } else {
            console.log("No such ID in DB", result)
        }
        response.status(204).end()
    })
        .catch(error => next(error));
})


const unknownEndPoint = (request, response) => {
    response.status(404).send('unknown endpoint');
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({error: "malformatted id"});
    }

    next(error)
}

app.use(errorHandler);

app.use(unknownEndPoint);

const Port = process.env.PORT || 3001;
app.listen(Port)
console.log("Listening on port " + Port);
