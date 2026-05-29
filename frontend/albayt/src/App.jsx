import { useState } from "react";
//We used the same imports we practiced in class
//the (navigate) redirects the user from one page to another
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

// These are the multi-step booking pages
import Book1 from "./components/Book1";
import Book2 from "./components/Book2";
import Book3 from "./components/Book3";
import Book4 from "./components/Book4";
import Book5 from "./components/Book5";
import Book6 from "./components/Book6";

import Living from "./components/Living";
import Bedroom from "./components/Bedroom";
import HomeDecor from "./components/HomeDecor";

// we added this component to make the page scroll to the top when changing routes
import ScrollToTop from "./components/ScrollToTop";

// we used the index.css not the app.css like we did in class
import "./index.css";

// this object represents the empty/default booking form data; we use it when the user starts booking and when we reset booking after finishing
const emptyBookingData = {
  fullName: "",
  phoneNumber: "",
  email: "",
  plan: "",
  style: "",
  floorPlanFile: null,
  floorPlanFileName: "",
  bookingDate: "",
  bookingTime: "",
};

function RequireLogin({ children }) {
  // Added for our project: checks if the user is saved in the browser after login. because without localStorage, React would forget the user when the page is refreshed.
  // We do not use Axios here because this is not a request to PHP
  const savedUser = localStorage.getItem("user");

  //if no user is saved then redirect them to login so the user cant book without logging in
  if (!savedUser) {
    return <Navigate to="/login" state={{ from: "/book1" }} replace />;
  }

  // If the user is logged in, show the protected page
  return children;
}

function App() {
  // bookingData stores all the information selected/entered in Book1 to Book6
  const [bookingData, setBookingData] = useState(emptyBookingData);

  // we added this function to clear the booking data after the appointment is completed
  const resetBookingData = () => {
    setBookingData(emptyBookingData);
  };

  // we used Figma first to design and understand the requirements of the client and for visualization
  return (
    //we used Router for navigation and keeping the idea of single html page
    //we kept the Header outside Routes because the header should stay in all pages
    <Router>
      <ScrollToTop />
      <Header />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              {/* These components together build the homepage */}
              <Hero />
              <About />
              <Collection />
              <Services />
              <HowItWorks />
              <ReadyTo />
            </>
          }
        />

        {/* Projects page
          Projects connects to PHP using Axios to get project data. */}
        <Route path="/projects" element={<Projects />} />
        
        {/* Project details page
            :id is a dynamic route parameter, we added it to avoid duplicating the component for each project */}
        <Route path="/project-details/:id" element={<ProjectDetails />} />
        
        {/* Contact page.
            React sends form data to PHP using Axios, the PHP file saves the message in MySQL and sends an email notification */}
        <Route path="/contact" element={<Contact />} />
        
        {/* Login page
            React sends login data to PHP, and PHP returns JSON, logged-in user is saved in localStorage as explained above */}
        <Route path="/login" element={<Login />} />
        
        {/* Signup page
            React sends form data to PHP through an HTTP POST request, and the PHP backend saves the new user in MySQL */}
        <Route path="/signup" element={<SignUp />} />
        
        {/* Appointments page
            React requests data from PHP, PHP reads MySQL, and React displays the result. users can view and cancel their own appointments. */}
        <Route path="/appointments" element={<Appointments />} />

        {/* Book Appointment */}
        {/* If the user visits /book, direct them to the first booking step */}
        <Route path="/book" element={<Navigate to="/book1" />} />

        {/* Booking Pages */}
        <Route
          path="/book1"
          // users must log in before booking an appointment
          element={
            <RequireLogin>
              <Book1
                bookingData={bookingData}
                setBookingData={setBookingData}
              />
            </RequireLogin>
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

        {/* book6 is the final confirmation page */}
        <Route
          path="/book6"
          element={
            <Book6
              bookingData={bookingData}
              resetBookingData={resetBookingData}
            />
          }
        />

        {/* Extra collection pages to show pictures for the living,bedroom, and decor from albayt company*/}
        <Route path="/living" element={<Living />} />
        <Route path="/bedroom" element={<Bedroom />} />
        <Route path="/homedecor" element={<HomeDecor />} />
      </Routes>

      {/* Footer is also shown on all pages */}
      <Footer />
    </Router>
  );
}

export default App;
