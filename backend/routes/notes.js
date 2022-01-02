const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Creating Note: POST "/api/notes/addnote". Login required
//              Params: { title: String, description: String(min 5 char), tag: String(optional) }
//              header: auth-token (loged in user)
//              Success(200) Status: saveNote (object)
//              Status(500): msg => "Some error occured" (for internal server errors)
router.post(
  "/addnote",
  fetchuser,
  [
    body("title").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;
    try {
      // Creating new note
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();

      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 2: Fetching All Notes of User: GET "/api/notes/fetchnotes". Login required
//              header: auth-token (loged in user)
//              Success(200) Status: notes (object)
//              Status(500): msg => "Some error occured" (for internal server errors)
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 3: Updating an existing Note: PUT "/api/notes/updatenote". Login required
//              header: auth-token (loged in user)
//              Success(200) Status: note (updated object)
//              Status(500): msg => "Some error occured" (for internal server errors)
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  try {
    // Find note to update
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("NOT Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Updating the Note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 4: Deleting existing Note: DELETE "/api/notes/deletenote". Login required
//              header: auth-token (loged in user)
//              Success(200) Status: "Successfully Deleted" + note(object)
//              Status(500): msg => "Some error occured" (for internal server errors)
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // The note to be deleted
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    // Verify user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note deleted Successfully", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
