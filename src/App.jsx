import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import Analytics from "./pages/Analytics";
import Help from "./pages/Help";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/results" element={<Results />} />
              <Route
          path="/analytics"
          element={<Analytics />}
        />
        <Route path="/help" element={<Help />} />

      

    </Routes>
  );
}

export default App;
