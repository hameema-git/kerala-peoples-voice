import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import Analytics from "./pages/Analytics";

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

      

    </Routes>
  );
}

export default App;
