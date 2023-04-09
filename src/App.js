import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputFilePage from "./pages/InputFilePage";
import InputApiPage from "./pages/InputApiPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputFilePage/>}/>
        <Route path="/api" element={<InputApiPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
