import App                                from "./App";
import React                              from "react";
import ReactDOM                           from "react-dom/client";
import { BrowserRouter as Router }        from "react-router-dom";
import { AuthProviderWrapper }            from "./context/auth.context";
import { WeatherProviderWrapper }         from "./context/weather.context";
import { ForecastProviderWrapper }        from "./context/forecast.context";
import { MapProviderWrapper }             from "./context/map.context";
import "./index.css";
import 'semantic-ui-css/semantic.min.css'

 ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProviderWrapper>
      <WeatherProviderWrapper>
        <ForecastProviderWrapper>
{/*           <MapProviderWrapper> */}
            <App />
         {/*  </MapProviderWrapper> */}
        </ForecastProviderWrapper>
      </WeatherProviderWrapper>
    </AuthProviderWrapper>
  </Router>
);
