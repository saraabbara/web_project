import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import Collection from "./components/Collection";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import ReadyTo from "./components/ReadyTo";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";
import Contact from "./components/Contact";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
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
              <Collection />
              <Services />
              <HowItWorks />
              <ReadyTo />
            </>
          }
        />

        <Route path="/projects" element={<Projects />} />
        <Route path="/project-details/:id" element={<ProjectDetails />} />
        <Route path="/book" element={<h1>Book Page</h1>} />
        <Route path="/appointments" element={<h1>Appointments Page</h1>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
