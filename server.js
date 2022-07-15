const fs = require('fs');

const path = require('path');

const PORT = 3001;

const express = require('express');

const app = express();

const notesDb = require('./db/db.json')


app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(notesDb.slice(1));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

function createNewNote(body, notesArray) {
    const newNote = body;
        if (!Array.isArray(notesArray))
            notesArray = [];
        
        if (notesArray.length === 0)
            notesArray.push(0);
    
        body.id = notesArray[0];
        notesArray[0]++;
    
        notesArray.push(newNote);
        fs.writeFileSync(
            path.join(__dirname, './db/db.json'),
            JSON.stringify(notesArray, null, 2)
        );
        return newNote;
}
app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, notesDb);
    res.json(newNote);
})
app.delete('/api/notes/', (req, res) => {
})
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});