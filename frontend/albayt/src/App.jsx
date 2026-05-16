import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
            </>
          }
        />

        <Route path="/projects" element={<h1>Projects Page</h1>} />
        <Route path="/book" element={<h1>Book Page</h1>} />
        <Route path="/appointments" element={<h1>Appointments Page</h1>} />
        <Route path="/contact" element={<h1>Contact Us Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
