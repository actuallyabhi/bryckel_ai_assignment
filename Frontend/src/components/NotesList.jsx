import React from 'react';
import "./Styles.css";
import { useNavigate } from 'react-router-dom';

const NotesList = ({ notes}) => {
  const navigate = useNavigate();
  
  const onNoteSelect = (id) => {
    navigate(`/note/${id}/`);
  };

  return (
    <div className='notes-list-container'>
     {notes.length > 0 ? (
        <ul className='note-list'>
          {notes.map((note) => (
            <li key={note.id} onClick={() => onNoteSelect(note.id)}
            className='note-list-item'
            >
               <h2>{note.title}</h2>
             </li>
          ))}
        </ul>
      ) : (
        <p
          className='no-notes'
        >No notes available</p>
      )}
    </div>
  );
};

export default NotesList;