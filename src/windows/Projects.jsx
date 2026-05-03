import { useState } from "react"
import { PROJECTS } from "../data/projects"
import { CERTIFICATES } from "../data/certificates"
import Tooltip from "../components/Tooltip"

function Projects() {
  const [path, setPath] = useState(["home"])

  const current = path[0]
  const selectedId = path[1]

  const getData = () => {
    if (current === "projects") return PROJECTS
    if (current === "certificates") return CERTIFICATES
    return []
  }

  const selectedItem = getData().find(i => i.id === selectedId)

  return (
    <div className="projects-window">

      {/* ===== BREADCRUMB ===== */}
      <div className="breadcrumb">
        <span onClick={() => setPath(["home"])}>Portfolio</span>

        {current !== "home" && (
          <>
            <span className="separator">›</span>
            <span onClick={() => setPath([current])}>
              {current === "projects" ? "Projects" : "Certificates"}
            </span>
          </>
        )}

        {selectedItem && (
          <>
            <span className="separator">›</span>
            <span className="current">{selectedItem.title}</span>
          </>
        )}
      </div>

      {/* ===== CONTENT ===== */}

      {/* HOME (FOLDERS) */}
      {current === "home" && (
        <div className="folder-grid">
          <div className="folder-card" onClick={() => setPath(["projects"])} >
            <img src="src/assets/folder.png" alt="" />
            <h3>Projects</h3>
          </div>

          <div className="folder-card" onClick={() => setPath(["certificates"])} >
            <img src="src/assets/folder.png" alt="" />
            <h3>Certificates</h3>
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {(current === "projects" || current === "certificates") && !selectedItem && (
        <div className="file-list">
          {getData().map(item => (
            <div key={item.id} className="file-row"onClick={() => setPath([current, item.id])} >
              
              <img src="src/assets/folder-open.png" alt="" />

              <div className="file-info">
                <h3>{item.title}</h3>
                <p>
                  {current === "projects"
                    ? item.short
                    : `${item.issuer} • ${item.date}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL VIEW */}
      {selectedItem && (
        <div className="file-detail">
          <h2>{selectedItem.title}</h2>

          {current === "certificates" && (
            <div className="meta">
              <p><strong>Issuer:</strong> {selectedItem.issuer}</p>
              <p><strong>Date:</strong> {selectedItem.date}</p>
            </div>
          )}

          {current === "certificates" ? (
            <Tooltip text={selectedItem.description}>
              <div className="image-frame">
                <img src={selectedItem.image} alt=""/>
              </div>
            </Tooltip>
          ) : (
            current === "projects" && selectedItem.images && (
              <div className="image-gallery">
                {selectedItem.images.map((img, index) => (
                  <div key={index} className="image-frame">
                    <img src={img} alt="" />
                  </div>
                ))}
              </div>
            )
          )}

          {current === "projects" && (
            <p>{selectedItem.description}</p>
          )}

          {selectedItem.tech && (
            <div className="tech-stack">
              {selectedItem.tech.map(t => <span key={t}>{t}</span>)}
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default Projects