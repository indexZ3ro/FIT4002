import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SoloSession from './soloSession';
import Sidebar from './Components/sidebar';
import './App.css';

function App() {
  return (
    
      <div className="App">
        
        <Router>
          <Sidebar/>
          <Routes>
            <Route path="/soloSession" component={SoloSession} />
              

          </Routes>
        </Router>

        

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React TEST PUSH TEST
          </a>
        </header>
      </div>
    
  );
}

export default App;
