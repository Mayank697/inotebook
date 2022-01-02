const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const { route } = require("./auth");

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

module.exports = router;
