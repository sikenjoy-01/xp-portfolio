function Skills() {
    return (
        <div className="skills">
            
            {/* ===== SYSTEM HEADER ===== */}
            <div className="skills-header">
                <div className="skills-icon">
                    <span>PC</span>
                </div>

                <div className="skills-info">
                    <h2>Ken Joshua Infante</h2>
                    <h4>IT Student / Developer</h4>
                </div>
            </div>

            {/* ===== SKILL CATEGORIES ===== */}
            <div className="skills-section">
                
                <div className="skills-card">
                    <h3>Frontend</h3>
                    <div className="skills-tags">
                        <span>React</span>
                        <span>HTML</span>
                        <span>CSS</span>
                        <span>JavaScript</span>
                    </div>
                </div>

                <div className="skills-card">
                    <h3>Backend</h3>
                    <div className="skills-tags">
                        <span>Node.js</span>
                        <span>Express</span>
                        <span>Java</span>
                        <span>Kotlin</span>
                    </div>
                </div>

                <div className="skills-card">
                    <h3>Database</h3>
                    <div className="skills-tags">
                        <span>SQL</span>
                        <span>Firebase</span>
                    </div>
                </div>

                <div className="skills-card">
                    <h3>Tools</h3>
                    <div className="skills-tags">
                        <span>Git</span>
                        <span>VS Code</span>
                        <span>Android Studio</span>
                    </div>
                </div>

            </div>

            {/* ===== PERFORMANCE SECTION ===== */}
            <div className="skills-performance">

                <div className="skills-card">
                    <h3>Performance</h3>

                    <div className="skill-bar">
                        <label>Java</label>
                        <div className="bar"><div className="fill w-65"></div></div>
                    </div>

                    <div className="skill-bar">
                        <label>Kotlin</label>
                        <div className="bar"><div className="fill w-70"></div></div>
                    </div>

                    <div className="skill-bar">
                        <label>React</label>
                        <div className="bar"><div className="fill w-70"></div></div>
                    </div>

                    <div className="skill-bar">
                        <label>JavaScript</label>
                        <div className="bar"><div className="fill w-75"></div></div>
                    </div>

                    <div className="skill-bar">
                        <label>CSS</label>
                        <div className="bar"><div className="fill w-85"></div></div>
                    </div>

                    <div className="skill-bar">
                        <label>Problem Solving</label>
                        <div className="bar"><div className="fill w-85"></div></div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Skills