import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Imports Axios to get project data from PHP
import axios from "axios";

// Imports the arrow icon used on each project card
import arrowImg from "../assets/images/arrow.png";

import villaImg from "../assets/images/project-villa.png";
import palacePoolImg from "../assets/images/project-palace-pool.png";
import palaceInteriorImg from "../assets/images/project-palace-interior.png";
import hospitalImg from "../assets/images/project-hospital.png";
import mallImg from "../assets/images/project-mall.png";
import majlisImg from "../assets/images/project-majlis.png";

import hamra1 from "../assets/images/hamra1.jpg";
import hamra2 from "../assets/images/hamra2.jpg";
import hamra3 from "../assets/images/hamra3.jpg";
import hamra4 from "../assets/images/hamra4.jpg";

import hospital1 from "../assets/images/hospital1.jpg";
import hospital2 from "../assets/images/hospital2.jpg";
import hospital3 from "../assets/images/hospital3.jpg";

import spanish1 from "../assets/images/spanish1.jpg";
import spanish2 from "../assets/images/spanish2.jpg";
import spanish3 from "../assets/images/spanish3.jpg";
import spanish4 from "../assets/images/spanish4.jpg";

import res1 from "../assets/images/res1.png";
import res2 from "../assets/images/res2.jpeg";
import res3 from "../assets/images/res3.jpeg";
import res4 from "../assets/images/res4.jpg";

import n1 from "../assets/images/n1.jpg";
import n2 from "../assets/images/n2.jpg";
import n3 from "../assets/images/n3.jpg";
import n4 from "../assets/images/n4.jpg";

import villa1 from "../assets/images/villa1.jpg";
import villa2 from "../assets/images/villa2.jpg";
import villa3 from "../assets/images/villa3.jpg";
import villa4 from "../assets/images/villa4.jpg";

// Stores the filter buttons shown above the project gallery
const filters = ["All", "Residential", "Commercial", "Hospitality"];

// Matches image names from PHP with the imported React images then php sends image keys as text, and React uses this object to find the real image file
const imageMap = {
  villa: hamra1,
  hamra2: hamra2,
  hamra3: hamra3,
  hamra4: hamra4,

  hospital1: hospital1,
  hospital2: hospital2,
  hospital3: hospital3,

  spanish1: spanish1,
  spanish2: spanish2,
  spanish3: spanish3,
  spanish4: spanish4,

  res1: res1,
  res2: res2,
  res3: res3,
  res4: res4,

  n1: n1,
  n2: n2,
  n3: n3,
  n4: n4,

  villa1: villa1,
  villa2: villa2,
  villa3: villa3,
  villa4: villa4,

  palacePool: palacePoolImg,
  palaceInterior: palaceInteriorImg,
  hospital: hospitalImg,
  mall: mallImg,
  majlis: majlisImg,
};

// Projects component displays all projects and lets the user filter them
function Projects() {
  // Stores the selected filter
  const [activeFilter, setActiveFilter] = useState("All");

  // Stores projects loaded from PHP
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sends a GET request to php
    axios
      .get("http://localhost:8000/projects.php")
      .then((response) => {
        // for testing
        console.log("Projects from PHP:", response.data);

        // If success
        if (response.data.success) {
          setProjects(response.data.projects);
        }

        // Stops the loading message
        setLoading(false);
      })
      .catch((error) => {
        // Shows an error if React could not connect to PHP
        console.log("Projects error:", error);

        setLoading(false);
      });
  }, []);

  // Filters projects based on the selected category
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  if (loading) {
    return <h2 style={{ padding: "160px 40px" }}>Loading projects...</h2>;
  }

  return (
    <main className="projects-page">
      <section className="projects-hero">
        <p className="projects-label">SELECTED WORK</p>

        <h1 className="projects-title">Projects</h1>

        <p className="projects-description">
          A curated portfolio of palaces, residences and hospitality interiors.
        </p>
      </section>

      {/* Filter buttons section */}
      <section className="projects-filter-bar">
        <div className="projects-filters">
          {/* Loops through the filters array and creates one button for each filter */}
          {filters.map((filter, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter
                  ? "project-filter active-project-filter"
                  : "project-filter"
              }
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Project gallery section */}
      <section className="projects-gallery-section">
        <div className="projects-gallery">
          {/* Loops through the filtered projects and creates one clickable project card for each project */}
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/project-details/${project.id}`}
              className={`project-card project-card-${project.layout}`}
            >
              {/* Project image */}
              <img
                src={imageMap[project.image]}
                alt={project.title}
                className="project-card-image"
              />

              <div className="project-card-overlay">
                <span className="project-tag">{project.category}</span>

                <div className="project-card-info">
                  <p className="project-location">
                    {project.location} · {project.year}
                  </p>

                  <h2 className="project-card-title">{project.title}</h2>
                </div>

                {/* Arrow icon for opening the project */}
                <span className="project-arrow">
                  <img
                    src={arrowImg}
                    alt="Open project"
                    className="project-arrow-img"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Projects;