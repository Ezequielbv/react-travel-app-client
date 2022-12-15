import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg text-white">

      <Link to="/" className="nav-link text-white">
        <button>Home</button>
      </Link>
      <Link to="/form" className="nav-link text-white">
        <button>New Location</button>
      </Link>
      <Link to="/my-map" className="nav-link text-white">
        <button className="btn text-white">Fly to my locations!</button>
      </Link>
      <Link to="/all-users-map" className="nav-link text-white">
        <button className="btn text-white">Show all users locations</button>
      </Link>

      <div className="navbar-nav ml-auto flex-row">
        {isLoggedIn && (
          <>
            <span>Hello {user && user.name}</span>

            <button className="btn btn-secondary" onClick={logOutUser}>Logout</button>

            <Link to="/profile" className="nav-link">
              <button className="btn text-white">Profile</button>
              {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
            </Link>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup" className="nav-link">
              {" "}
              <button className="btn text-white">Sign Up</button>{" "}
            </Link>
            <Link to="/login" className="nav-link">
              {" "}
              <button className="btn text-white">Login</button>{" "}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
