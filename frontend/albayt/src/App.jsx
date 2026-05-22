import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
import Appointments from "./components/Appointments";

import Book1 from "./components/Book1";
import Book2 from "./components/Book2";
import Book3 from "./components/Book3";
import Book4 from "./components/Book4";
import Book5 from "./components/Book5";
import Book6 from "./components/Book6";

import "./index.css";

function App() {
  const [bookingData, setBookingData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    plan: "",
    style: "",
    floorPlanFile: null,
    floorPlanFileName: "",
    bookingDate: "",
    bookingTime: "",
  });

  const [apiStatus, setApiStatus] = useState("Testing PHP connection...");

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8000/users.php"),
      axios.get("http://localhost:8000/appointments.php"),
      axios.get("http://localhost:8000/contact.php"),
    ])
      .then(([usersResponse, appointmentsResponse, contactResponse]) => {
        console.log("Users PHP:", usersResponse.data);
        console.log("Appointments PHP:", appointmentsResponse.data);
        console.log("Contact PHP:", contactResponse.data);

        setApiStatus("React is connected to PHP!");
      })
      .catch((error) => {
        console.log("PHP connection error:", error);
        setApiStatus("React is NOT connected to PHP");
      });
  }, []);

  return (
    <Router>
      <Header />

      {/* <p style={{ textAlign: "center", padding: "10px", fontWeight: "bold" }}>
        {apiStatus}
      </p> */}

      <Routes>
        {/* Home Page */}
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

        {/* Normal Pages */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/project-details/:id" element={<ProjectDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Book Appointment */}
        <Route path="/book" element={<Navigate to="/book1" />} />

        <Route path="/appointments" element={<Appointments />} />

        {/* Booking Pages */}
        <Route
          path="/book1"
          element={
            <Book1 bookingData={bookingData} setBookingData={setBookingData} />
          }
        />

        <Route
          path="/book2"
          element={
            <Book2 bookingData={bookingData} setBookingData={setBookingData} />
          }
        />

        <Route
          path="/book3"
          element={
            <Book3 bookingData={bookingData} setBookingData={setBookingData} />
          }
        />

        <Route
          path="/book4"
          element={
            <Book4 bookingData={bookingData} setBookingData={setBookingData} />
          }
        />

        <Route
          path="/book5"
          element={
            <Book5 bookingData={bookingData} setBookingData={setBookingData} />
          }
        />

        <Route path="/book6" element={<Book6 bookingData={bookingData} />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
