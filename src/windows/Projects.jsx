import { useState } from "react"
import { PROJECTS } from "../data/projects"

function Projects() {
  const [view, setView] = useState("list") // list | detail
  const [selected, setSelected] = useState(null)

  // Go to detail view
  const openProject = (project) => {
    setSelected(project)
    setView("detail")
  }

  // Go back to list
  const goBack = () => {
    setView("list")
    setSelected(null)
  }

  return (
    <div className="projects-window">
      {view === "list" && (
        <div className="projects-list">
          {PROJECTS.map(project => (
            <div 
              key={project.id} 
              className="project-card"
              onClick={() => openProject(project)}
            >
              <img src={project.image} alt="" />
              <div>
                <h3>{project.title}</h3>
                <p>{project.short}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "detail" && selected && (
        <div className="project-detail">
            <div className="breadcrumb">
                <span onClick={goBack}>Projects</span>
                <span className="separator">›</span>
                <span className="current">{selected.title}</span>
            </div>

            <h2>{selected.title}</h2>
            <img src={selected.image} alt="" />

            <p>{selected.description}</p>

            <div className="tech-stack">
                {selected.tech.map(t => (
                <span key={t}>{t}</span>
                ))}
            </div>
        </div>
      )}
    </div>
  )
}

export default Projects