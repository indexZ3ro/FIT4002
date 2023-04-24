import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SoloSession from './SoloSession';
import Sidebar from './Components/Sidebar';
import './App.css';
import Homepage from './Homepage';

function App() {
  return (
        <Router>
          <div className="App">
            <Sidebar/>
            
            <Routes>
              <Route path="/" element={ <Homepage/> } />
              <Route path="/SoloSession" element={< SoloSession />} />
            </Routes>
          </div>
        </Router> 
  );
}

export default App;