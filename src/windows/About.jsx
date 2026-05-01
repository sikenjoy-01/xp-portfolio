import "../styles/desktop.css"
import { useState } from "react"
import Tooltip from "../components/Tooltip"

function About({ setWindows, windows }) {
    const [activeTab, setActiveTab] = useState("education")

    const openResume = () => {
        setWindows(prev => {
            const exists = prev.find(w => w.id === "resume")
            const maxZ = prev.length ? Math.max(...prev.map(w => w.z)) : 0

            if (exists) {
                return prev.map(w =>
                    w.id === "resume"
                        ? { ...w, minimized: false, z: maxZ + 1 }
                        : w
                )
            }

            return [
                ...prev,
                {
                    id: "resume",
                    z: maxZ + 1,
                    x: window.innerWidth / 4,
                    y: window.innerHeight / 10,
                    minimized: false,
                    width: "100%",
                    height: "70vh",
                }
            ]
        })
    }

    return (
        <div className="about">
            <div className="about-header">
                
                <div className="about-image">
                    <img src="src/assets/me.jpg" alt="Profile Pic" />
                </div>

                <div className="about-intro">
                    <h2>Ken Joshua L. Infante</h2>
                    <h4>IT Student / Developer</h4>

                    <p>
                        Passionate developer focused on building interactive and user-friendly applications.
                        I enjoy creating clean UI experiences and experimenting with creative designs.
                        I also do a bit of backend development on the side and love exploring new tech trends in the industry!
                    </p>
                </div>
            </div>

            <hr />

            <div className="about-tabs">
                <button 
                    className={activeTab === "education" ? "active" : ""}
                    onClick={() => setActiveTab("education")}
                >
                    🎓 EDUCATION
                </button>

                <button 
                    className={activeTab === "experience" ? "active" : ""}
                    onClick={() => setActiveTab("experience")}
                >
                    💼 EXPERIENCE
                </button>

                <button 
                    className={activeTab === "interests" ? "active" : ""}
                    onClick={() => setActiveTab("interests")}
                >
                    🎯 INTERESTS
                </button>
            </div>

            {/* DETAILS SECTION */}
            <div className="about-details">
                {activeTab === "education" && (
                    <div className="about-card">

                        <p><strong>Cordillera Regional Science High School</strong></p>
                        <p>Science, Technology, Engineering, and Mathematics (STEM) Academic Track</p>
                        <p>2016 - 2022</p>

                        <ul>
                            <li>Graduated with Honors</li>
                            <li>Garnered Best in Mathematics</li>
                        </ul>

                        <hr />

                        <p><strong>Benguet State University</strong></p>
                        <p><strong>B.S. Information Technology</strong></p>
                        <p>2022 - 2026</p>

                        <ul>
                            <li>Cum Laude :D</li>
                            <li>DOST Scholarship Grantee</li>
                            <li>Consistent Academic Achiever</li>
                        </ul>

                    </div>
                )}
                
                {activeTab === "experience" && (
                    <div className="about-card">
                        <p><strong>Fullstack Intern (Jan - Apr 2026)</strong></p>
                        <p><strong>BSU - Precision Agriculture Project</strong></p>
                        <p>Worked on mobile development, AI modeling and integration, and graphic design!</p>
                    </div>
                )}

                {activeTab === "interests" && (
                    <div className="about-card">

                    <div className="about-item">
                        <img src="src/assets/abt-icons/ui.png" alt="" />
                        <p>
                            <Tooltip text="I enjoy designing interfaces that feel intuitive, clean, and satisfying to use.">
                                UI/UX Design
                            </Tooltip>
                        </p>
                    </div>
                       
                    <div className="about-item">
                        <img src="src/assets/abt-icons/mobile.png" alt="" />
                        <p>
                            <Tooltip text="I like building apps that run in your pocket—bringing ideas to life on mobile devices.">
                                Mobile Development
                            </Tooltip>
                        </p>
                    </div>
                        
                    <div className="about-item">
                        <img src="src/assets/abt-icons/ai.png" alt="" />
                        <p>
                            <Tooltip text="I’m always curious about where AI is heading and how I can integrate it into real projects.">
                                AI Trends
                            </Tooltip>
                        </p>
                    </div>
                        
                    <div className="about-item">
                        <img src="src/assets/abt-icons/game.png" alt="" />
                        <p>
                            <Tooltip text="Gaming keeps me inspired, and I enjoy keeping up with the latest in tech and hardware.">
                                Gaming & Tech
                            </Tooltip>
                        </p>
                    </div>
                        
                    <div className="about-item">
                        <img src="src/assets/abt-icons/fitness.png" alt="" />
                        <p>
                            <Tooltip text="I always had a passion for health and fitness, and I’m interested in how technology can enhance our well-being.">
                                Fitness & Health
                            </Tooltip>
                        </p>
                    </div>
                        
                    <div className="about-item">
                        <img src="src/assets/abt-icons/music.png" alt="" />
                        <p>
                            <Tooltip text="I have a deep appreciation for music and visual arts, and I enjoy exploring the intersection of creativity and technology.">
                                Music & Art
                            </Tooltip>
                        </p>
                    </div>
                        
                    <div className="about-item">
                        <img src="src/assets/abt-icons/camera.png" alt="" />
                        <p>
                            <Tooltip text="I love watching movies and exploring different storytelling and cinematography techniques.">
                                Movies
                            </Tooltip>
                        </p>
                    </div>
                </div>
                )}
                
            </div>

            <div className="about-footer">
                <button className="xp-btn" onClick={openResume}>
                    <img src="src/assets/abt-icons/search.png" alt="" />
                    Preview Resume
                </button>
                <a href="public/CV-Ken-Joshua-Infante.pdf" download>
                    <button className="xp-btn">
                        <img src="src/assets/abt-icons/download.png" alt="" />
                        Download
                    </button>
                </a>
                
            </div>
        </div>
    )
}

export default About