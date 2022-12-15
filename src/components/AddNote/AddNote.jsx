import './AddNote.css';
import { useState } from "react";
import axios from "axios";

// const API_URL = "http://localhost:5005";


function AddNote(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const { locationId } = props;
    const requestBody = { title, description, locationId };
    // console.log({ title, description, locationId })

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/notes`, requestBody)
      .then((response) => {
          console.log("passed");
        setTitle("");
        setDescription("");

        props.refreshLocation();
      })
      .catch((error) => console.log(error));
  };

  
  return (
    <div className="add-note">
      <h4>Add New Note</h4>
      
      <form className="form-note-wrapper" onSubmit={handleSubmit}>
        <div className="form-note-content form-title">
            <label>Title:</label>
            <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        </div>

        <div className="form-note-content form-description">
            <label>Description:</label>
            <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </div>

        <button className="btn mt-3 text-white bg-col6" type="submit">Add Note</button>
      </form>
    </div>
  );
}

export default AddNote;