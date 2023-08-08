const express = require('express');

// Import our modular routers for /notes
const notesRouter = require('./notesRoute');


const appNotes = express();

appNotes.use('/api/notes', notesRouter);


module.exports = appNotes;
