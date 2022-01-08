import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "61d151b8f6e5628a7ccb7772",
      user: "61d042b002f9d859d9cea7f2",
      title: "Study",
      description: "study for 4-5 hours",
      tag: "General",
      date: "2022-01-02T07:18:16.334Z",
      __v: 0,
    },
    {
      _id: "61d597a286591e40792c331bd",
      user: "61d042b002f9d859d9cea7f2",
      title: "Project2",
      description: "work on iNoteBook frontend React application",
      tag: "MERN stack",
      date: "2022-01-05T13:05:38.641Z",
      __v: 0,
    },
    {
      _id: "61d151b8f6e56238a7ccb7772",
      user: "61d042b002f9d859d9cea7f2",
      title: "Study",
      description: "study for 4-5 hours",
      tag: "General",
      date: "2022-01-02T07:18:16.334Z",
      __v: 0,
    },
    {
      _id: "61d597a2386591e40792c31bd",
      user: "61d042b002f9d859d9cea7f2",
      title: "Project2",
      description: "work on iNoteBook frontend React application",
      tag: "MERN stack",
      date: "2022-01-05T13:05:38.641Z",
      __v: 0,
    },{
      _id: "61d151b8f36e5628a7ccb7772",
      user: "61d042b002f9d859d9cea7f2",
      title: "Study",
      description: "study for 4-5 hours",
      tag: "General",
      date: "2022-01-02T07:18:16.334Z",
      __v: 0,
    },
    {
      _id: "61d3597a286591e40792c31bd",
      user: "61d042b002f9d859d9cea7f2",
      title: "Project2",
      description: "work on iNoteBook frontend React application",
      tag: "MERN stack",
      date: "2022-01-05T13:05:38.641Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  // Add new note
  const addNote = (title, description, tag) => {

    const note = {
      _id: "61d3597a286591e40792c31bd22",
      user: "61d042b002f9d859d9cea7f2",
      title: title,
      description: description,
      tag: tag,
      date: "2022-01-05T13:05:38.641Z",
      __v: 0,
    }

    setNotes(notes.concat(note));
  }

  return (
    <NoteContext.Provider value={{notes, addNote}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
