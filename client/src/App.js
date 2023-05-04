import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SoloSession from "./pages/SoloSession";
import TeamSession from "./pages/TeamSession";
import Sidebar from "./Components/Sidebar/Sidebar";
import SignUpPage from "./pages/SignupPage";
import WelcomePage from "./pages/WelcomePage";
import LogInPage from "./pages/LogInPage";
import Homepage from "./pages/Homepage";
import CreateTeamMatrix from "./pages/CreateTeamMatrix";
import { Provider } from "react-redux";
import store from "./store/store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Sidebar />
          <Routes>
            <Route path="/" element={<LogInPage />} />
            <Route path="/Home" element={<Homepage />} />
            <Route path="/Signup" element={<SignUpPage />} />
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
