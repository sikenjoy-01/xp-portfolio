import "../styles/desktop.css"
import { APPS } from "../data/apps"
import DesktopIcon from "./DesktopIcon"
import Window from "./Window"

import About from "../windows/About"
import Projects from "../windows/Projects"
import Skills from "../windows/Skills"
import Contact from "../windows/Contact"

// Desktop component - main layout that manages all windows and icons
// Props:
//   - windows: array of open windows
//   - setWindows: function to update the windows array
function Desktop({ windows, setWindows }) {
    return (
        // Main desktop container
        <div className="desktop">
            {/* Icons section - displays all desktop icons */}
            <div className="icons">
                {/* Loop through APPS and create an icon for each */}
                {APPS.map(app => (
                    <DesktopIcon 
                        key={app.id} 
                        label={app.label}
                        // Handle icon click - opens or brings window to front
                        onClick={() => {
                            setWindows(prev => {
                                // Check if this window is already open
                                const exists = prev.find(w => w.id === app.id)

                                // If window already exists, bring it to the front by increasing z-index
                                if (exists) {
                                const maxZ = Math.max(...prev.map(w => w.z))
                                return prev.map(w =>
                                    w.id === app.id ? { ...w, z: maxZ + 1 } : w
                                )
                                }

                                // If not open, create a new window
                                const maxZ = prev.length ? Math.max(...prev.map(w => w.z)) : 0
                                
                                // Offset each new window so they don't open on top of each other
                                const offset = prev.length * 50
                                const x = (200 + offset) % 500
                                const y = (100 + offset) % 300

                                // Add new window to windows array
                                return [...prev, { id: app.id, z: maxZ + 1, x: 200 + offset, y: 100 + offset }]
                            })
                        }}
                    />
                ))}
            </div>
            
           {/* Render all open windows */}
           {windows.map(win => {
                let content
                let title

                // Determine which component to display based on window id
                switch (win.id) {
                    case "about":
                    content = <About />
                    title = "About Me"
                    break
                    case "projects":
                    content = <Projects />
                    title = "Projects"
                    break
                    case "skills":
                    content = <Skills />
                    title = "Skills"
                    break
                    case "contact":
                    content = <Contact />
                    title = "Contact"
                    break
                    default:
                    return null
                }

                return (
                    <Window
                        key={win.id}
                        title={title}
                        zIndex={win.z}  // Controls which window appears on top
                        x={win.x}  // Horizontal position
                        y={win.y}  // Vertical position
                        // Handle window close - remove it from windows array
                        onClose={() =>
                            setWindows(prev => prev.filter(w => w.id !== win.id))
                        }
                        // Handle window focus - bring to front by increasing z-index
                        onFocus={() => {
                            setWindows(prev => {
                            const maxZ = Math.max(...prev.map(w => w.z))
                            return prev.map(w =>
                                w.id === win.id ? { ...w, z: maxZ + 1 } : w
                            )
                            })
                        }}
                        >
                        {/* Display the appropriate content component */}
                        {content}
                    </Window>
                )
            })}

        </div>
    )
}

export default Desktop