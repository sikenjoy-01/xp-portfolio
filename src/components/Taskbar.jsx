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
        // Calculate the maximum z-index among all windows to determine which one is currently focused
        const maxZ = Math.max(...windows.map(w => w.z))
        return (
          <button
            key={win.id}
            // Apply 'active' class if this window has the highest z-index (is focused)
            className={`taskbar-item 
              ${win.minimized ? "minimized" : ""}
              ${!win.minimized &&win.z === maxZ ? "active" : ""}
              `}
            onClick={() => {
              setWindows(prev => {
                const maxZ = Math.max(...prev.map(w => w.z))

                return prev.map(w => {
                  if (w.id === win.id) {
                    return {
                      ...w,
                      minimized: false, // restore if minimized
                      z: maxZ + 1       // bring to front
                    }
                  }
                  return w
                })
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