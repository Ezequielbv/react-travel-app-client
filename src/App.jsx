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
import Forecast                   from "./components/Forecast/Forecast";
import Profile                   from "./pages/ProfilePage/ProfilePage";
import GenerateMap                from './components/GenerateMap/GenerateMap';
import LocationForm               from "./pages/LocationForm/LocationForm";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

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
          path="/map"
          element={
            <GenerateMap />
          }
        />
        <Route 
          path="/form"
          element={
            <LocationForm />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
