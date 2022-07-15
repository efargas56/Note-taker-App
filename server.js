const fs = require('fs');

const path = require('path');

const PORT = 3001;

const express = require('express');

const app = express();

const notesDb = require('./db.json')


app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, notes.html))
})