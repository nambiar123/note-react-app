import React, { useEffect, useState } from "react";

import NoteContainer from "./Components/NoteContainer/NoteContainer";
import Sidebar from "./Components/Sidebar/Sidebar";
import Login from "./Components/Login/login"; 
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './actions/authActions';
import "./App.css";


function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes-app")) || []
  );

console.log(process.env.REACT_APP_BASE_URL)
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const handleLogin = (credentials) => {
    dispatch(login());
  };

  const fetchNotes = async()=>{
    const response = await fetch(baseUrl +'/notes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      console.log('notes',data.notes)
    setNotes(data.notes)
  }

  const insertNote = async(obj)=>{
    let title = obj.title;
    let text = obj.text;
    let color = obj.color;
    const response = await fetch(baseUrl +'/note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, text, color }),
      });
      const data = await response.json();

      return data.note
  }

  useEffect(() => {
    fetchNotes(); // Call fetchNotes only once when the component mounts
  }, []);
  const handleLogout = () => {
      dispatch(logout());
    // Additional logic (if any) for logging out
  };
  const addNote = async (color) => {
    const tempNotes = [...notes];

    let obj = await insertNote({title:"title",text: "",time: Date.now(),  color:color})
    console.log('obj', obj)
    tempNotes.push(obj);
   
    setNotes(tempNotes);
  };

  const deleteNote = async (_id) => {
    const tempNotes = [...notes];

    const response = await fetch(`${baseUrl}/note/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    const index = tempNotes.findIndex((item) => item._id === _id);
    if (index < 0) return;

    tempNotes.splice(index, 1);
    setNotes(tempNotes);
  };

  const updateText = async (text, _id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item._id === _id);
    if (index < 0) return;

    const response = await fetch(`${baseUrl}/note/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  text }),
    });
    tempNotes[index].text = text;
    setNotes(tempNotes);
  };

  useEffect(() => {
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="App">
     {isLoggedIn && (
        <div className="header">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    {!isLoggedIn ? (
      <Login onLogin={handleLogin} />
    ) : (
      <>
        <Sidebar addNote={addNote} />
        <NoteContainer
          notes={notes}
          deleteNote={deleteNote}
          updateText={updateText}
        />
       
      </>
    )}
  </div>
  );
}

export default App;
