import "./App.css";
import { Routes, Route }          from "react-router-dom";
import HomePage                   from "./pages/HomePage/HomePage";
import ProfilePage                from "./pages/ProfilePage/ProfilePage";
import SignupPage                 from "./pages/SignupPage/SignupPage";
import LoginPage                  from "./pages/LoginPage/LoginPage";
import Navbar                     from "./components/Navbar/Navbar";
import IsPrivate                  from "./components/IsPrivate/IsPrivate";
import IsAnon                     from "./components/IsAnon/IsAnon";
import GetWeather                 from './components/LocationBoard/GetWeather';
import GenerateMapUser            from './components/GenerateMapUser/GenerateMapUser'
import Forecast                   from "./components/Forecast/Forecast";
import Profile                    from "./pages/ProfilePage/ProfilePage";
import GenerateMap                from './components/GenerateMap/GenerateMap';
import GenerateMapForm            from './components/GenerateMapForm/GenerateMapForm';
import WeatherInfo                from './components/WeatherInfo/WeatherInfo';
import LocationForm               from "./pages/LocationForm/LocationForm";
import EditNote                   from "./pages/EditNote/EditNote";

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
              <GenerateMapForm />
            </div>
          }
        />
        <Route 
          path="/test-weather"
          element={
            <WeatherInfo />
          }
        />
        <Route exact path="/notes/edit/:noteId" element={<EditNote />} />
      </Routes>
    </div>
  );
}

export default App;
