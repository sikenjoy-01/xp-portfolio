import { APPS } from "../data/apps"

// Taskbar component mimics Windows XP taskbar, displaying buttons for open windows
// Allows users to switch focus to a window by clicking its taskbar button
function Taskbar({ windows, setWindows }) {
  return (
    <div className="taskbar">
      {/* Render a button for each open window */}
      {windows.map(win => {
        // Find the corresponding app data to get the label for display
        const app = APPS.find(a => a.id === win.id)
        return (
          <button
            key={win.id}
            // Apply 'active' class if this window has the highest z-index (is focused)
            className={`taskbar-item ${
              win.z === Math.max(...windows.map(w => w.z)) ? "active" : ""
              }`}
            onClick={() => {
              // Bring the clicked window to the front by setting its z-index to max + 1
              setWindows(prev => {
                const maxZ = Math.max(...prev.map(w => w.z))
                return prev.map(w =>
                  w.id === win.id ? { ...w, z: maxZ + 1 } : w
                )
              })
            }}
          >
            {/* Display the app's label, using optional chaining for safety */}
            {app?.label}
          </button>
        )
      })}
    </div>
  )
}

export default Taskbar