import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SoloSession from "./SoloSession";
import TeamSession from "./TeamSession";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import Homepage from "./Homepage";
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
                        <Route path="/SoloSession" element={<SoloSession />} />
                        <Route path="/TeamSession" element={<TeamSession />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
