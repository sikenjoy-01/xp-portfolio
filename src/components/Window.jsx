
// Window component - displays a draggable window container
// Props:
//   - title: window title text
//   - children: content to display inside the window
//   - onClose: function to call when close button is clicked
//   - zIndex: determines which window appears on top (higher = on top)
//   - onFocus: function to call when window is clicked (brings to front)
//   - x, y: window position on screen
function Window({ title, children, onClose, zIndex, onFocus, x, y }) {
  return (
    // Main window container with positioning and layering
    <div
      className="window"
      style={{ zIndex, top: y, left: x }}
      onMouseDown={onFocus}  // Bring window to front when clicked
    >
      {/* Title bar with window title and close button */}
      <div className="title-bar">
        <span>{title}</span>
        {/* Close button - removes window when clicked */}
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