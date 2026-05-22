import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import arrowImg from "../assets/images/arrow.png";

import villaImg from "../assets/images/project-villa.png";
import palacePoolImg from "../assets/images/project-palace-pool.png";
import palaceInteriorImg from "../assets/images/project-palace-interior.png";
import hospitalImg from "../assets/images/project-hospital.png";
import mallImg from "../assets/images/project-mall.png";
import majlisImg from "../assets/images/project-majlis.png";

const filters = ["All", "Residential", "Commercial", "Hospitality"];

const imageMap = {
  villa: villaImg,
  palacePool: palacePoolImg,
  palaceInterior: palaceInteriorImg,
  hospital: hospitalImg,
  mall: mallImg,
  majlis: majlisImg,
};

function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/projects.php")
      .then((response) => {
        console.log("Projects from PHP:", response.data);

        if (response.data.success) {
          setProjects(response.data.projects);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log("Projects error:", error);
        setLoading(false);
      });
  }, []);

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

      <section className="projects-filter-bar">
        <div className="projects-filters">
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

      <section className="projects-gallery-section">
        <div className="projects-gallery">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/project-details/${project.id}`}
              className={`project-card project-card-${project.layout}`}
            >
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