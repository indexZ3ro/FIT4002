import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'
import SoloSession from './pages/solo_session'
import TeamSession from './pages/team_session'
import SignUpPage from './pages/SignupPage'
import LogInPage from './pages/LogInPage'
import Homepage from './pages/home'
import LandingPage from "./pages/LandingPage";
import CreateTeamMatrix from './pages/create_team_matrix'
import { Provider } from 'react-redux'
import store from './store/store'
import Sidebar from './Components/Sidebar/Sidebar'
import './App.css'
import LocalChangeContext from './contexts/LocalChangeContext';
import QuestionContext from './contexts/QuestionContext';
import React, { useRef, useState } from 'react';
import HistoryPage from "./pages/HistoryPage";

function App () {
  const [localChanges, setLocalChanges] = useState([]);
  const [localQuestions, setLocalQuestions] = useState([]);
  return (
    <Provider store={store}>
      <LocalChangeContext.Provider value={{ localChanges, setLocalChanges }}>
        <QuestionContext.Provider value={{ localQuestions, setLocalQuestions }}>
          <Router>
            <div className='App'>
              <Sidebar />
              <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path="/LogIn" element={<LogInPage />} />
                <Route path='/Home' element={<Homepage />} />
                <Route path='/Signup' element={<SignUpPage />} />
                <Route path='/CreateTeamMatrix' element={<CreateTeamMatrix />} />
                <Route path='/SoloSession' element={<SoloSession />} />
                <Route path='/TeamSession' element={<TeamSession />} />
                <Route path="/HistoryPage" element={<HistoryPage />} />
              </Routes>
            </div>
          </Router>
        </QuestionContext.Provider>
      </LocalChangeContext.Provider>
    </Provider>
  )
}

export default App
