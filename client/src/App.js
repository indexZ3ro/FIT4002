import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SoloSession from './SoloSession';
import Sidebar from './Components/Sidebar';
import './App.css';
import Homepage from './Homepage';
import TextButton from './Components/Buttons/TextButton';
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
        <Router>
          <div className="App">
            <Sidebar/>
            <TextButton id="signUp"></TextButton>
            
            <Routes>
              <Route path="/" element={ <Homepage/> } />
              <Route path="/SoloSession" element={< SoloSession />} />
            </Routes>
          </div>
        </Router> 
    </Provider>
  );
}

export default App;