import projectIcon from "../assets/images/project-icon.png";
import { useEffect, useState } from "react";
// useParams gets the project id from the URL
import { Link, useParams } from "react-router-dom";
// Imports Axios to get project data from PHP
import axios from "axios";

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

import spanish1 from "../assets/images/spanish1.jpg";
import spanish2 from "../assets/images/spanish2.jpg";
import spanish3 from "../assets/images/spanish3.jpg";
import spanish4 from "../assets/images/spanish4.jpg";

import hospital1 from "../assets/images/hospital1.jpg";
import hospital2 from "../assets/images/hospital2.jpg";
import hospital3 from "../assets/images/hospital3.jpg";

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

//same logic as projects.jsx
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

//we did one component to avoid duplication for each single project
function ProjectDetails() {
  // Gets the project id from the url like: /project-details/villa
  const { id } = useParams();

  // Stores the selected project after it is loaded from PHP
  const [project, setProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sends a GET request to PHP
    axios
      .get("http://localhost:8000/projects.php")
      .then((response) => {
        //for testing
        console.log("Project details from PHP:", response.data);

        // If php returns projects successfully, find the one that matches the URL id
        if (response.data.success) {
          const selectedProject = response.data.projects.find(
            (item) => item.id === id,
          );

          //we save the selected project, if no selected save null
          setProject(selectedProject || null);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log("Project details error:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2 style={{ padding: "160px 40px" }}>Loading project...</h2>;
  }

  // Shows a not found message if the project id does not match any project
  if (!project) {
    return (
      <main className="project-details-page">
        <section className="project-details-not-found">
          <h1>Project not found</h1>

          <Link to="/projects" className="main-btn project-back-btn">
            BACK TO PROJECTS
          </Link>
        </section>
      </main>
    );
  }

  // Moves to the next image in the gallery (to make it interactive for the user)
  function nextImage() {
    setActiveImage((previous) =>
      previous === project.gallery.length - 1 ? 0 : previous + 1,
    );
  }

  // Moves to the previous image in the gallery
  function previousImage() {
    setActiveImage((previous) =>
      previous === 0 ? project.gallery.length - 1 : previous - 1,
    );
  }

  return (
    <main className="project-details-page">
      <section
        className="project-details-hero"
        style={{ backgroundImage: `url(${imageMap[project.image]})` }}
      >
        <div className="project-details-hero-content">
          <Link to="/projects" className="details-back-link">
            ← BACK TO PROJECTS
          </Link>

          <p className="details-category">{project.category}</p>

          <h1 className="details-title">{project.title}</h1>

          <p className="details-meta">
            {project.location} · {project.year}
          </p>
        </div>
      </section>

      <section className="project-details-body">
        <div className="project-details-intro">
          <div className="details-preview-image">
            <img src={imageMap[project.image]} alt={project.title} />
          </div>

          <div className="details-about-box">
            <div className="details-about-icon">
              <img src={projectIcon} alt="" id="project-icon" />
            </div>

            <p className="details-about-label">ABOUT THE PROJECT</p>

            <p className="details-about-text">{project.description}</p>

            <div className="details-about-line"></div>
          </div>
        </div>

        {/* Image slider */}
        <div className="details-slider">
          <img
            src={imageMap[project.gallery[activeImage]]}
            alt={project.title}
            className="details-slider-image"
          />

          {/* Previous image button */}
          <button
            type="button"
            className="slider-arrow slider-left"
            onClick={previousImage}
          >
            ‹
          </button>

          {/* Next image button */}
          <button
            type="button"
            className="slider-arrow slider-right"
            onClick={nextImage}
          >
            ›
          </button>
        </div>


        {/* Gallery thumbnails */}
        <div className="details-thumbnails">
          {project.gallery.map((image, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveImage(i)}
              className={
                activeImage === i
                  ? "details-thumbnail active-thumbnail"
                  : "details-thumbnail"
              }
            >
              <img src={imageMap[image]} alt={project.title} />
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProjectDetails;
