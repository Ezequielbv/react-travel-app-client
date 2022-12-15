import "./EditNote.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditNote(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const { noteId } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`${API_URL}/api/notes/${noteId}`)
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
      .put(`${API_URL}/api/notes/${noteId}`, requestBody)
      .then((response) => {
        navigate(`/profile`)
      });
  };
  
  return (
    <div className="EditNote">
      <h3>Edit the Note</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Note</button>
      </form>

    </div>
  );
}

export default EditNote;
