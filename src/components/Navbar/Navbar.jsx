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
      <div class="navbar-nav ml-auto">
      {isLoggedIn && (
        <>
          <button className="btn btn-secondary" onClick={logOutUser}>Logout</button>

          <Link to="/profile" className="nav-link">
            <button className="btn text-white">Profile</button>
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
          </Link>

          <span>Hello {user && user.name}</span>
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
