import { useState } from "react"
import { PROJECTS } from "../data/projects"
import { CERTIFICATES } from "../data/certificates"
import Tooltip from "../components/Tooltip"

function Projects() {
  const [path, setPath] = useState(["home"])
  const [sortBy, setSortBy] = useState("recent")

  const current = path[0]
  const selectedId = path[1]

  const getData = () => {
    if (current === "projects") return PROJECTS
    if (current === "certificates") return CERTIFICATES
    return []
  }

  const getSortedData = () => {
    const data = getData()
    if (current !== "certificates") return data

    const sorted = [...data]
    if (sortBy === "recent") {
      return sorted.reverse()
    } else if (sortBy === "name") {
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === "issuer") {
      return sorted.sort((a, b) => a.issuer.localeCompare(b.issuer))
    }
    return sorted
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

      {current === "certificates" && !selectedItem && (
        <div className="sort-controls">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="recent">Recent</option>
            <option value="name">Name</option>
            <option value="issuer">Issuer</option>
          </select>
        </div>
      )}

      {/* ===== CONTENT ===== */}

      {/* HOME (FOLDERS) */}
      {current === "home" && (
        <div className="folder-grid">
          <div className="folder-card" onClick={() => setPath(["projects"])} >
            <img src="/assets/folder.png" alt="" />
            <h3>Projects</h3>
          </div>

          <div className="folder-card" onClick={() => setPath(["certificates"])} >
            <img src="/assets/folder.png" alt="" />
            <h3>Certificates</h3>
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {(current === "projects" || current === "certificates") && !selectedItem && (
        <div className="file-list">
          {getSortedData().map(item => (
            <div key={item.id} className="file-row"onClick={() => setPath([current, item.id])} >
              
              <img src="/assets/folder-open.png" alt="" />

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