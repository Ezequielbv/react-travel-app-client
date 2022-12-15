import './NoteCard.css'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

// We are deconstructing the props object directly in the parentheses of the function
// const DB_BE_URL = "http://localhost:5005";

function NoteCard({ title, description, _id, refreshLocation }) {
  // console.log("note", { title, description, _id })
  const navigate = useNavigate();

  const deleteNote = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/notes/${_id}`)
      .then(() => {
        // console.log("deleted note: ", _id)
        refreshLocation();
        // navigate("/profile");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="NoteCard">
      <div><h3 className="note-title">{title}</h3>
      <hr/></div>
      <div>
        <p className="note-description">{description}</p>
        <hr/>
        <hr/>
        <hr/>
      </div>
      <div className="note-actionbuttons">
        <Link to={`/notes/edit/${_id}`}><button className="btn btn-info btn-sm">Edit</button></Link>
        <button className="btn btn-secondary btn-sm" onClick={deleteNote}>x</button>
      </div>
    </div>
  );
}
  
  export default NoteCard;  