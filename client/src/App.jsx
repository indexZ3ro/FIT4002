import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import SoloSession from "./pages/solo_session";
import TeamSession from "./pages/team_session";
import SignUpPage from "./pages/SignupPage";
import LogInPage from "./pages/LogInPage";
import Homepage from "./pages/home";
import LandingPage from "./pages/LandingPage";
import CreateTeamMatrix from "./pages/createTeamMatrix";
import { Provider } from "react-redux";
import store from "./store/store";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import LocalChangeContext from "./contexts/LocalChangeContext";
import QuestionContext from "./contexts/QuestionContext";
import React, { useRef, useState } from "react";
import HistoryPage from "./pages/history_page";
import Settings from "./pages/settings_page";
import AboutUs from "./pages/about_us";
import InfiniteCanvas from "./pages/infiniteCanvas";

function App() {
  const [localChanges, setLocalChanges] = useState([]);
  const [localQuestions, setLocalQuestions] = useState([]);
  return (
    <Provider store={store}>
      <LocalChangeContext.Provider value={{ localChanges, setLocalChanges }}>
        <QuestionContext.Provider value={{ localQuestions, setLocalQuestions }}>
          <Router>
            <div className="App">
              <Sidebar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/LogIn" element={<LogInPage />} />
                <Route path="/Home" element={<Homepage />} />
                <Route path="/Signup" element={<SignUpPage />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route
                  path="/CreateTeamMatrix"
                  element={<CreateTeamMatrix />}
                />
                <Route path="/ACTMatrixSession/:projectId" element={<InfiniteCanvas />} />
                <Route path="/HistoryPage" element={<HistoryPage />} />
                <Route path="/Settings" element={<Settings />} />
              </Routes>
            </div>
          </Router>
        </QuestionContext.Provider>
      </LocalChangeContext.Provider>
    </Provider>
  );
}

export default App;
