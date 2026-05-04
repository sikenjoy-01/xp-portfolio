import { useState, useEffect } from "react"

// Window renders a draggable (desktop only) window frame.
// Props:
//   - title, icon        : title bar display
//   - children           : window body content
//   - onClose, onMinimize: control callbacks
//   - onFocus            : bring window to front
//   - onDrag             : update position (desktop only)
//   - zIndex, x, y       : stacking / position (desktop)
//   - width, height      : optional explicit size (desktop)
//   - isActive           : true when this is the topmost window
//   - draggable          : enables drag behaviour (desktop breakpoint only)
function Window({
  title, icon, children,
  onClose, onMinimize, onFocus, onDrag,
  zIndex, x, y, width, height,
  isActive,
  draggable = true,   // false on mobile / tablet
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [offset,     setOffset]     = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!draggable) return   // skip attaching events on touch layouts

    const handleMouseMove = (e) => {
      if (!isDragging) return
      onDrag(e.clientX - offset.x, e.clientY - offset.y)
    }

    const handleMouseUp = () => setIsDragging(false)

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup",   handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup",   handleMouseUp)
    }
  }, [isDragging, offset, onDrag, draggable])

  // On desktop: inline style drives position and size (drag system).
  // On mobile/tablet: CSS takes over; we only pass zIndex so stacking still works.
  const inlineStyle = draggable
    ? {
        zIndex,
        top:    y ?? 50,
        left:   x ?? 200,
        width:  width  || "auto",
        height: height || "50vh",
      }
    : { zIndex }

  return (
    <div
      className={`window${isActive ? " window--focused" : ""}`}
      style={inlineStyle}
      onMouseDown={onFocus}
    >
      {/* ── TITLE BAR ── */}
      <div
        className="title-bar"
        onMouseDown={draggable
          ? (e) => {
              setIsDragging(true)
              setOffset({ x: e.clientX - x, y: e.clientY - y })
            }
          : undefined
        }
        // Prevent text selection while dragging
        style={{ userSelect: "none" }}
      >
        <div className="title-bar-content">
          <img src={icon} alt="app icon" className="title-bar-icon" />
          <span>{title}</span>
        </div>

        <div className="title-bar-buttons">
          {/* MINIMIZE */}
          <button
            className="minimize-btn"
            onClick={(e) => { e.stopPropagation(); onMinimize() }}
            aria-label="Minimize"
          >
            _
          </button>

          {/* CLOSE */}
          <button
            className="close-btn"
            onClick={(e) => { e.stopPropagation(); onClose() }}
            aria-label="Close"
          >
            X
          </button>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="window-content">
        {children}
      </div>
    </div>
  )
}

export default Window
