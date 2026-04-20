import { useState } from "react"

// Window renders a draggable window frame with title bar, content, and close control.
// Props:
//   - title: title text displayed in the title bar
//   - children: content rendered inside the window body
//   - onClose: callback when the close button is clicked
//   - zIndex: stacking order for window overlap
//   - onFocus: callback when the window is clicked to bring it forward
//   - x, y: current window coordinates
//   - isActive: whether this window is the topmost active window
//   - onDrag: callback to update window position while dragging
function Window({ title, children, onClose, zIndex, onFocus, x, y, isActive, onDrag }) {
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = (e) => {
    if (!dragging) return

    // Compute the new window position from the pointer offset
    const newX = e.clientX - offset.x
    const newY = e.clientY - offset.y

    onDrag(newX, newY)
  }

  const handleMouseUp = () => {
    // Stop dragging when the mouse button is released
    setDragging(false)
  }
  return (
    // Main window container with positioning and layering
    <div
      className={`window${isActive ? " window--focused" : ""}`}
      style={{ zIndex, top: y, left: x }}
      onMouseDown={onFocus} // Bring window to front when clicked
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}  
    >
      {/* Title bar with window title and close button */}
      <div className="title-bar" onMouseDown={(e) => {
        setDragging(true)
        // Record initial pointer offset relative to window position
        setOffset({x: e.clientX - x, y: e.clientY - y})
      }}>
        <span>{title}</span>
        {/* Close button - closes the current window */}
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>

      {/* Window content area - displays whatever is passed as children */}
      <div className="window-content">
        {children}
      </div>
    </div>
  )
}

export default Window    