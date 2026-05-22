import projectIcon from "../assets/images/project-icon.png";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import villaImg from "../assets/images/project-villa.png";
import palacePoolImg from "../assets/images/project-palace-pool.png";
import palaceInteriorImg from "../assets/images/project-palace-interior.png";
import hospitalImg from "../assets/images/project-hospital.png";
import mallImg from "../assets/images/project-mall.png";
import majlisImg from "../assets/images/project-majlis.png";

const imageMap = {
  villa: villaImg,
  palacePool: palacePoolImg,
  palaceInterior: palaceInteriorImg,
  hospital: hospitalImg,
  mall: mallImg,
  majlis: majlisImg,
};

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/projects.php")
      .then((response) => {
        console.log("Project details from PHP:", response.data);

        if (response.data.success) {
          const selectedProject = response.data.projects.find(
            (item) => item.id === id
          );

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

  function nextImage() {
    setActiveImage((previous) =>
      previous === project.gallery.length - 1 ? 0 : previous + 1
    );
  }

  function previousImage() {
    setActiveImage((previous) =>
      previous === 0 ? project.gallery.length - 1 : previous - 1
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

        <div className="details-slider">
          <img
            src={imageMap[project.gallery[activeImage]]}
            alt={project.title}
            className="details-slider-image"
          />

          <button
            type="button"
            className="slider-arrow slider-left"
            onClick={previousImage}
          >
            ‹
          </button>

          <button
            type="button"
            className="slider-arrow slider-right"
            onClick={nextImage}
          >
            ›
          </button>
        </div>

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