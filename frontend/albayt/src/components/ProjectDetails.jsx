import projectIcon from "../assets/images/project-icon.png";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projectsData";

function ProjectsDetails() {
  let { id } = useParams();

  let project = projects.find((item) => item.id === id);

  let [activeImage, setActiveImage] = useState(0);

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
      previous === project.gallery.length - 1 ? 0 : previous + 1,
    );
  }

  function previousImage() {
    setActiveImage((previous) =>
      previous === 0 ? project.gallery.length - 1 : previous - 1,
    );
  }

  return (
    <main className="project-details-page">
      <section
        className="project-details-hero"
        style={{ backgroundImage: `url(${project.image})` }}
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
            <img src={project.image} alt={project.title} />
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
            src={project.gallery[activeImage]}
            alt={project.title}
            className="details-slider-image"
          />

          <button className="slider-arrow slider-left" onClick={previousImage}>
            ‹
          </button>

          <button className="slider-arrow slider-right" onClick={nextImage}>
            ›
          </button>
        </div>

        <div className="details-thumbnails">
          {project.gallery.map((image, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={
                activeImage === i
                  ? "details-thumbnail active-thumbnail"
                  : "details-thumbnail"
              }
            >
              <img src={image} alt={project.title} />
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProjectsDetails;
