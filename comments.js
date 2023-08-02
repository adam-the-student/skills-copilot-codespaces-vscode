// Create web server application
// 1. Create a web server
// 2. Register for a request event
// 3. Return a response
// 4. Listen on a port
// 5. Listen for incoming requests

const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const comments = [
    {id: 1, name: 'John', comment: 'Hello World'},
    {id: 2, name: 'Jane', comment: 'Hello World'},
    {id: 3, name: 'Jack', comment: 'Hello World'}
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/comments', (req, res) => {
    res.send(comments);
});

app.get('/api/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found');
    }
    res.send(comment);
});

app.post('/api/comments', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required(),
        comment: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const comment = {
        id: comments.length + 1,
        name: req.body.name,
        comment: req.body.comment
    };
    comments.push(comment);
    res.send(comment);
});

app.put('/api/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found');
    }

    const schema = {
        name: Joi.string().min(3).required(),
        comment: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    comment.name = req.body.name;
    comment.comment = req.body.comment;
    res.send(comment)
});