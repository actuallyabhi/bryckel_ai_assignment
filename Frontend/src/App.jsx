import React, { useEffect } from 'react';
import axios from 'axios';
import "./App.css";
import { BASE_DOMAIN } from './common/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom';
import NotesList from './components/NotesList'
import NoteView from './components/NoteDisplay'
import NoteForm from './components/NoteForm';

const App = () => {
  const [notes, setNotes] = React.useState([]);


  const getNotes = async () => {
    try {
      const response = await axios.get(`${BASE_DOMAIN}/notes/`);
      if (response.status === 200) {
        setNotes(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);


  return (
    <React.Fragment>
      <Router>
      <div className="container">
        <nav>
          <h1>Notes App</h1>
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="active">Home</NavLink>
            </li>
            <li>
              <NavLink to="/create-note" activeClassName="active">Create Note</NavLink>
            </li>
          </ul>
        </nav>

          <Routes>
            <Route path="/" element={<NotesList notes={notes} />} />
            <Route path="/create-note" element={<NoteForm 
              notes={notes}
              setNotes={setNotes}
            />} />
            <Route path="/note/:id" element={<NoteView 
              notes={notes}
              setNotes={setNotes}
            />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.Fragment>
  );
};

export default App;