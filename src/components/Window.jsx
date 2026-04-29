import { APPS } from "../data/apps"
import { useState, useEffect } from "react"

// Window renders a draggable window frame with title bar, content, and close control.
// Props:
//   - title: title text displayed in the title bar
//   - icon: path to the icon image displayed in the title bar
//   - children: content rendered inside the window body
//   - onClose: callback when the close button is clicked
//   - onMinimize: callback when the minimize button is clicked
//   - zIndex: stacking order for window overlap
//   - onFocus: callback when the window is clicked to bring it forward
//   - x, y: current window coordinates
//   - isActive: whether this window is the topmost active window
//   - onDrag: callback to update window position while dragging
function Window({ title, icon, children, onClose, onMinimize, zIndex, onFocus, x, y, isActive, onDrag }) {
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return

      const newX = e.clientX - offset.x
      const newY = e.clientY - offset.y

      onDrag(newX, newY)
    }

    const handleMouseUp = () => {
      setDragging(false)
    }

    // Attach to whole document
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    // Cleanup (VERY IMPORTANT)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dragging, offset, onDrag])

  return (
    // Main window container with positioning and layering
    <div
      className={`window${isActive ? " window--focused" : ""}`}
      style={{ zIndex, top: y, left: x }}
      onMouseDown={onFocus} // Bring window to front when clicked
    >
      {/* Title bar with window title and close button */}
      <div
        className="title-bar"
        onMouseDown={(e) => {

          setDragging(true)

          setOffset({
            x: e.clientX - x,
            y: e.clientY - y
          })
        }}
      >
        <div className="title-bar-content">
          <img src={icon} alt="app icon" className="title-bar-icon" />
          <span>{title}</span>
        </div>
        
        {/* BUTTONS GROUP */}
        <div className="title-bar-buttons">
          {/* MINIMIZE BUTTON */}
          <button
            className="minimize-btn"
            onClick={(e) => {
              e.stopPropagation() // prevent focus trigger
              onMinimize()
            }}
          >
            _
          </button>

          {/* CLOSE BUTTON */}
          <button
            className="close-btn"
            onClick={(e) => {
              e.stopPropagation() // prevent focus trigger
              onClose()
            }}
          >
            X
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="window-content">
        {children}
      </div>
    </div>
  )
}

export default Window    