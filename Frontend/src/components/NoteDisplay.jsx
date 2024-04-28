import axios from 'axios';
import './Styles.css';
import { BASE_DOMAIN } from '../common/constants';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Edit, Trash2, ArrowLeftCircle, Save } from 'react-feather';

const NoteView = ({ notes, setNotes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({});
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const getNoteById = async (id) => {
    try {
      const response = await axios.get(`${BASE_DOMAIN}/notes/${id}/`);
      if (response.status == 200) {
        setNote(response.data.data);
        setTitle(response.data.data.title);
        setContent(response.data.data.content);
      }
    } catch (error) {
      if (error.response.status === 404) {
        toast.error('Note not found', {
          toastId: 'note-not-found'
        });
      } else {
        toast.error('Failed to fetch note', {
          toastId: 'fetch-note-error'
        });
      }
      navigate('/');
      console.error(error);
    }
  };

  const handleDeleteNote = async () => {
    try {
      const response = await axios.delete(`${BASE_DOMAIN}/notes/${note.id}/`);
      if (response.status === 204) {
        toast.success('Note deleted successfully', {
          toastId: 'note-deleted'
        });
        const updatedNotes = notes.filter((n) => n.id !== note.id);
        setNotes(updatedNotes);
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to delete note', {
        toastId: 'delete-note-error'
      });
      console.error(error);
    }
  }

  const handleUpdateNote = async () => {
    try {
      if (!title || !content) return;
      const updatedNote = { ...note, title, content };
      const response = await axios.put(`${BASE_DOMAIN}/notes/${updatedNote.id}/`, updatedNote);
      if (response.status === 200) {
        toast.success('Note updated successfully', {
          toastId: 'note-updated'
        });
        const updatedNotes = [...notes];
        updatedNotes[updatedNotes.findIndex((n) => n.id === updatedNote.id)] = updatedNote;
        setNotes(updatedNotes);
        setIsEditing(false);
      }
    } catch (error) {
      toast.error('Failed to update note', {
        toastId: 'update-note-error'
      });
      console.error(error);
    }
  };


  // Fetch note when the component is mounted
  useEffect(() => {
    if (!id) return;
    getNoteById(id);
  }, []);

  return (
    <div className='note-view-container'>
      <div className='note-view-buttons'>
        <button
          className='back-button'
          onClick={() => navigate('/')}
        > <ArrowLeftCircle size={18} />
          Back</button>
        <button
          className='edit-note-button'
          onClick={() => setIsEditing(true)}
          style={{ display: isEditing ? 'none' : 'flex' }}
        > <Edit size={18} />
          Edit Note</button>

        <button
          className='delete-note-button'
          onClick={handleDeleteNote}
        >
          <Trash2 size={18} />
          Delete Note
        </button>
      </div>

      <section className='note-view'>
        {isEditing ? (
          <div className='note-edit-form'>
            <input className='note-form-title' type="text" value={title} onChange={handleTitleChange} />
            <textarea className='note-form-content' value={content} onChange={handleContentChange} />
            <button className='note-form-submit' onClick={handleUpdateNote}
              disabled={!title || !content || (title === note.title && content === note.content)}
            > <Save size={18} />
              Save</button>
          </div>
          
        ) : (
          <div className='note-display'>
            <h2
              className='note-title'
            >{note.title}</h2>
            <p
              className='note-content'
            >{note.content}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default NoteView;