import React from 'react';
import axios from 'axios';
import { BASE_DOMAIN } from '../common/constants';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FilePlus, ArrowLeftCircle } from 'react-feather';



const NoteForm = ({ notes, setNotes }) => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const handleCreateNote = async () => {
    if (!title || !content) return;
    const newNote = {
      title,
      content
    };
    const response = await axios.post(`${BASE_DOMAIN}/notes/`, newNote);
    if (response.status === 201) {
      setNotes([...notes, response.data.data]);
      toast.success('Note created successfully', {
        toastId: 'note-created'
      });
      navigate('/');
    } else {
      toast.error('Failed to create note', {
        toastId: 'create-note-error'
      });
    }
  };


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className='note-form-container'>

      <input 
        className='note-form-title'
        type="text" placeholder="Note Title" value={title} onChange={handleTitleChange} />
      <textarea 
        className='note-form-content'
        placeholder="Note Content" value={content} onChange={handleContentChange} />
      <button onClick={handleCreateNote}
        className='note-form-submit'
        disabled={!title || !content}
      >
         <FilePlus size={18} /> Create
        </button>
    </div>
  );
};

export default NoteForm;