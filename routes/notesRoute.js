const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const path = require('path');
const fs = require('fs');
const { json } = require('express');

//get data from db folder
let jsonData;
notes.get('/', (req, res) => {
  jsonData = JSON.parse(fs.readFileSync('./db/db.json'));
   res.json(jsonData);

});


// POST /api/notes should receive a new note to save on the request body, 
// add save to db file 
notes.post('/', (req, res) => {
  // creating body for note
  const { title, text } = req.body;

  // If all the required properties are present 
  if (title && text) {
    const newNotes = {
      title,
      text,
      id: uuid(),
    };
    jsonData.push(newNotes);
  

    fs.writeFile("./db/db.json", JSON.stringify(jsonData), "utf-8", (err) => {
      err ? console.error(err) : console.info(`\n The note has been saved.`)


    })
    const response = {
      status: 'success',
      body: jsonData,
    };

   
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting notes');
  }



})

// notes DELETE Request
notes.delete('/:id', (req, res) => {

  let noteId = req.params.id;

  const filterData = jsonData.filter((value, index) => {
   
    return noteId !== value.id;
  });



  fs.writeFileSync("./db/db.json", JSON.stringify(filterData))
 
   res.json(filterData);
 
});

module.exports = notes;