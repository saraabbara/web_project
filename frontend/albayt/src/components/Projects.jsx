import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projectsData";
import arrowImg from "../assets/images/arrow.png";

const filters = ["All", "Residential", "Commercial", "Hospitality"];

function Projects() {
  let [activeFilter, setActiveFilter] = useState("All");

  let filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <main className="projects-page">
      <section className="projects-hero">
        <p className="projects-label">SELECTED WORK</p>

        <h1 className="projects-title">Projects</h1>

        <p className="projects-description">
          A curated portfolio of palaces, residences and hospitality interiors.
        </p>
      </section>

      <section className="projects-filter-bar">
        <div className="projects-filters">
          {filters.map((filter, i) => (
            <button
              key={i}
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

      <section className="projects-gallery-section">
        <div className="projects-gallery">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/project-details/${project.id}`}
              className={`project-card project-card-${project.layout}`}
            >
              <img
                src={project.image}
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