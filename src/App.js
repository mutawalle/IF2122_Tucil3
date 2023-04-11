import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import InputApiPage from "./pages/inputApi/InputApiPage";
import InputFilePage from "./pages/inputFile/InputFilePage";


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/api" element={<InputApiPage/>}/>
        <Route path="/file" element={<InputFilePage/>}/> */}
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
