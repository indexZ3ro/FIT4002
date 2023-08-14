import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'
import db from './firebase'
import SoloSession from './pages/solo_session'
import TeamSession from './pages/team_session'
import SignUpPage from './pages/sign_up'
import LogInPage from './pages/login'
import Homepage from './pages/home'
import CreateTeamMatrix from './pages/create_team_matrix'
import { Provider } from 'react-redux'
import store from './store/store'
import Sidebar from './Components/Sidebar/Sidebar'
import './App.css'

function App () {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<LogInPage />} />
            <Route path='/Home' element={<Homepage />} />
            <Route path='/Signup' element={<SignUpPage />} />
            <Route path='/CreateTeamMatrix' element={<CreateTeamMatrix />} />
            <Route path='/SoloSession' element={<SoloSession />} />
            <Route path='/TeamSession' element={<TeamSession />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
