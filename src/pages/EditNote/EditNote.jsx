import "./EditNote.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

// const API_URL = "http://localhost:5005";

function EditNote(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const { noteId } = useParams();
  const navigate = useNavigate();

  // const {infoNote} = props.params();
  // console.log(title)
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/notes/${noteId}`)
      .then((response) => {
        const oneNote = response.data;
        setTitle(oneNote.title);
        setDescription(oneNote.description);
      })
      .catch((error) => console.log(error));
      
    }, [noteId]);
    

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description };

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/notes/${noteId}`, requestBody)
      .then((response) => {
        navigate(`/profile`)
      });
  };
  
  return (
    <div className="EditNote trav-card mt-5">
      <h1>Edit the Note</h1>

      <form onSubmit={handleFormSubmit} className="d-flex">
        <div className="edit-note-inputs">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="edit-note-inputs">
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <hr className="w-100"/>
        <hr className="w-100"/>
        <div className="edit-note-button mt-4"><button type="submit" className="btn text-white bg-col1">Update Note</button></div>
      </form>

    </div>
  );
}

export default EditNote;
