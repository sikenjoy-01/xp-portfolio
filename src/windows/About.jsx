import "../styles/desktop.css"

function About() {
    return (
        <div className="about">
            {/* TOP SECTION */}
            <div className="about-header">
                
                {/* PROFILE IMAGE PLACEHOLDER */}
                <div className="about-image">
                    <img src="https://placehold.co/100" alt="Profile Pic" />
                </div>

                {/* NAME + INTRO */}
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

            {/* DIVIDER */}
            <hr />

            {/* DETAILS SECTION */}
            <div className="about-details">
                
                <div className="about-card">
                    <h3>🎓 EDUCATION</h3>

                    <p><strong>Cordillera Regional Science High School</strong></p>
                    <p>Science, Technology, Engineering, and Mathematics (STEM) Academic Track</p>
                    <p>2016 - 2022</p>

                    <ul>
                        <li>Graduated with Honors</li>
                        <li>Garnered Best in Mathematics</li>
                    </ul>

                    <hr />

                    <p><strong>Benguet State University</strong></p>
                    <p><strong>B.S. Information Technology </strong></p>
                    <p>2022 - 2026</p>

                    <ul>
                        <li>Cum Laude :D</li>
                        <li>DOST Scholarship Grantee</li>
                        <li>Consistent Academic Achiever</li>
                    </ul>

                </div>

                <div className="about-card">
                    <h3>💼 EXPERIENCE</h3>
                    <p><strong>Fullstack Intern</strong></p>
                    <p><strong>BSU - Precision Agriculture Project</strong></p>
                    <p>Worked on mobile development, AI modeling and integration, and graphic design!</p>
                </div>

                <div className="about-card">
                    <h3>🎯 INTERESTS</h3>
                    <p>UI/UX Design</p>
                    <p>Mobile Development</p>
                    <p>AI Trends</p>
                    <p>Gaming & Tech</p>
                </div>

            </div>
        </div>
    )
}

export default About