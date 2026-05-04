import { useState } from "react"

const FILES = [
  {
    id: "fact1",
    title: "jim stats.txt",
    content: `
    - Bench: 205lbs || 93kg
    - Squat: 265lbs || 120kg
    - Deadlift: i <3 my back
    - Pull-ups: +30kg weighted
    `,
    type: "text"
  },
]

function Recycle() {
  const [path, setPath] = useState(["files"])

  const selectedId = path[1]

  const selectedItem = FILES.find(f => f.id === selectedId)

  return (
    <div className="projects-window">

      {/* ===== BREADCRUMB ===== */}
      <div className="breadcrumb">
        <span onClick={() => setPath(["files"])}>Recycle Bin</span>

        {selectedItem && (
          <>
            <span>›</span>
            <span className="current">{selectedItem.title}</span>
          </>
        )}
      </div>

      {/* ===== FILE LIST ===== */}
      {!selectedItem && (
        <div className="file-list">
          {FILES.map(file => (
            <div
              key={file.id}
              className="file-row"
              onClick={() => setPath(["files", file.id])}
            >
              <img src="src/assets/scrap.png" alt="" />

              <div className="file-info">
                <h3>{file.title}</h3>
                <p>{file.type.toUpperCase()} File</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== FILE VIEWER ===== */}
      {selectedItem && (
        <div className="file-detail">
          <h2>{selectedItem.title}</h2>

          {selectedItem.type === "text" && (
            <div className="notepad-frame">
              <pre>{selectedItem.content}</pre>
            </div>
          )}

          {selectedItem.type === "image" && (
            <div className="image-frame">
              <img src={selectedItem.content} alt={selectedItem.title} />
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default Recycle