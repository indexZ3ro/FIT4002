import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SoloSession from "./SoloSession";
import TeamSession from "./TeamSession";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import Homepage from "./pages/Homepage";
import CreateTeamMatrix from "./pages/CreateTeamMatrix";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Home" element={<Homepage />} />
            <Route path="/CreateTeamMatrix" element={<CreateTeamMatrix />} />
            <Route path="/SoloSession" element={<SoloSession />} />
            <Route path="/TeamSession" element={<TeamSession />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
