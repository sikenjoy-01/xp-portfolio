import "../styles/desktop.css"
import { APPS } from "../data/apps"
import DesktopIcon from "./DesktopIcon"
import Window from "./Window"

import About from "../windows/About"
import Projects from "../windows/Projects"
import Skills from "../windows/Skills"
import Contact from "../windows/Contact"

function Desktop({ activeWindow, setActiveWindow }) {
    return (
        <div className="desktop">
            <div className="icons">
                {APPS.map(app => (
                    <DesktopIcon 
                        key={app.id} 
                        label={app.label}
                        onClick={() => setActiveWindow(app.id)}
                    />
                ))}
            </div>
            
            {/* WINDOWS */}
            {activeWindow === "about" && (
                <Window title="About Me" onClose={() => setActiveWindow(null)}>
                <About />
                </Window>
            )}

            {activeWindow === "projects" && (
                <Window title="Projects" onClose={() => setActiveWindow(null)}>
                <Projects />
                </Window>
            )}

            {activeWindow === "skills" && (
                <Window title="Skills" onClose={() => setActiveWindow(null)}>
                <Skills />
                </Window>
            )}

            {activeWindow === "contact" && (
                <Window title="Contact" onClose={() => setActiveWindow(null)}>
                <Contact />
                </Window>
            )}

        </div>
    )
}

export default Desktop