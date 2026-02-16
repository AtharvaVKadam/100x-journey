import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./src/Signin"; // Import it
import { Dashboard } from "./s/Dashboard";
import { Signup } from "."; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;