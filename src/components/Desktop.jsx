import "../styles/desktop.css"
import { APPS } from "../data/apps"
import DesktopIcon from "./DesktopIcon"
import Window from "./Window"
import Taskbar from "./Taskbar"

import About from "../windows/About"
import Projects from "../windows/Projects"
import Skills from "../windows/Skills"
import Contact from "../windows/Contact"

// Desktop manages the desktop icons, open windows, and taskbar state.
// Props:
//   - windows: array of open window objects
//   - setWindows: state updater for window creation, focus, dragging, and closing
function Desktop({ windows, setWindows }) {
    return (
        // Main desktop layout holding icons, windows, and taskbar
        <div className="desktop">
            {/* Icons section - displays all desktop icons */}
            <div className="icons">
                {/* Loop through APPS and create an icon for each */}
                {APPS.map(app => (
                    <DesktopIcon 
                        key={app.id} 
                        label={app.label}
                        // Open a new window or focus an existing one
                        onClick={() => {
                            setWindows(prev => {
                                const exists = prev.find(w => w.id === app.id)

                                // Bring existing window to the top by bumping z-index
                                if (exists) {
                                const maxZ = Math.max(...prev.map(w => w.z))
                                return prev.map(w =>
                                    w.id === app.id ? { ...w, z: maxZ + 1 } : w
                                )
                                }

                                // Create a new window with a staggered starting position
                                const maxZ = prev.length ? Math.max(...prev.map(w => w.z)) : 0
                                const offset = prev.length * 50

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

                // Map each open window id to its content component and title
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
                        zIndex={win.z}  // Higher z-index renders above other windows
                        x={win.x}  // Horizontal position on the desktop
                        y={win.y}  // Vertical position on the desktop
                        isActive={win.z === Math.max(...windows.map(w => w.z))}
                        // Close removes this window from the open windows list
                        onClose={() =>
                            setWindows(prev => prev.filter(w => w.id !== win.id))
                        }
                        // Focus brings the clicked window to the front
                        onFocus={() => {
                            setWindows(prev => {
                            const maxZ = Math.max(...prev.map(w => w.z))
                            return prev.map(w =>
                                w.id === win.id ? { ...w, z: maxZ + 1 } : w
                            )
                            })
                        }}
                        // Drag updates the window coordinates in state
                        onDrag={(newX, newY) => {
                            setWindows(prev =>
                                prev.map(w =>
                                w.id === win.id ? { ...w, x: newX, y: newY } : w
                                )
                            )
                        }}
                        >
                        {/* Display the appropriate content component */}
                        {content}
                    </Window>
                )
            })}

            {/* Taskbar shows open windows and provides quick focus controls */}
            <Taskbar windows={windows} setWindows={setWindows} />

        </div>
    )
}

export default Desktop