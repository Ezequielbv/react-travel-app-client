import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import GetWeather from './components/LocationBoard/GetWeather';
import Forecast from "./components/Forecast/Forecast";
import Profile from "./pages/ProfilePage/ProfilePage";
import GenerateMap from './components/GenerateMap/GenerateMap';
import GenerateMapUser from "./components/GenerateMapUser/GenerateMapUser";
import GenerateMapHome from "./components/GenerateMapHome/GenerateMapHome";
import LocationForm from "./pages/LocationForm/LocationForm";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="home-container">
              <HomePage />
              <GenerateMapHome />
            </div>
          }
        />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/test"
          element={
            <div className="container">
              <Profile />
              <GetWeather />
              <Forecast />
            </div>
          }
        />
        <Route
          path="/my-map"
          element={
            <GenerateMapUser />
          }
        />
        <Route
          path="/all-users-map"
          element={
            <GenerateMap />
          }
        />
        <Route
          path="/form"
          element={
            <div className="form-container">
              <LocationForm />
              <GenerateMapHome />
            </div>
          }
        />
        {/* <Route
          path="/hometest"
          element={
            <GenerateMapHome />
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
