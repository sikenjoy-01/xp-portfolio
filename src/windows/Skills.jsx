import { useState } from "react"

const SKILL_DATA = {
  frontend: {
    label: "Frontend",
    icon: "src/assets/skl-icons/monitor.png",
    skills: [
      { name: "React", icon: "src/assets/skl-icons/front/react.png", level: 70 },
      { name: "JavaScript", icon: "src/assets/skl-icons/front/js.png", level: 75 },
      { name: "CSS", icon: "src/assets/skl-icons/front/css.png", level: 85 },
      { name: "HTML", icon: "src/assets/skl-icons/front/html.png", level: 80 },
    ],
  },
  backend: {
    label: "Backend",
    icon: "src/assets/skl-icons/gear.png",
    skills: [
      { name: "Java", icon: "src/assets/skl-icons/back/java.png", level: 65 },
      { name: "Kotlin", icon: "src/assets/skl-icons/back/kotlin.png", level: 70 },
      { name: "Node.js", icon: "src/assets/skl-icons/back/node.png", level: 70 },
    ],
  },
  database: {
    label: "Database",
    icon: "src/assets/skl-icons/database.png",
    skills: [
      { name: "SQL", icon: "src/assets/skl-icons/database/sql.png", level: 70 },
      { name: "Firebase", icon: "src/assets/skl-icons/database/firebase.png", level: 75 },
    ],
  },
  tools: {
    label: "Tools",
    icon: "src/assets/skl-icons/tools.png",
    skills: [
      { name: "Git", icon: "src/assets/skl-icons/tools/git.png", level: 80 },
      { name: "VS Code", icon: "src/assets/skl-icons/tools/vscode.png", level: 90 },
      { name: "Android Studio", icon: "src/assets/skl-icons/tools/android.png", level: 75 },
    ],
  },
    softskills: {
    label: "Soft Skills",
    icon: "src/assets/skl-icons/chat.png",
    skills: [
      { name: "Communication", icon: "src/assets/skl-icons/soft/communication.png", level: 75 },
      { name: "Teamwork", icon: "src/assets/skl-icons/soft/teamwork.png", level: 85 },
      { name: "Problem Solving", icon: "src/assets/skl-icons/soft/problemsolving.png", level: 85 },
      { name: "Adaptability", icon: "src/assets/skl-icons/soft/adapt.png", level: 80 },
      { name: "Time Management", icon: "src/assets/skl-icons/soft/timemanagement.png", level: 80 },
    ],
  },
}

function Skills() {
  const [active, setActive] = useState("frontend")
  const current = SKILL_DATA[active]

  return (
    <div className="skills-control">

      {/* ===== SYSTEM INFO BAR ===== */}
      <div className="skills-system">
        <div>Windows XPortfolio v1.0</div>
        <div>User: <strong>Ken Joshua Infante</strong></div>
        <div>Mode: <strong>Developer</strong></div>
      </div>

      <div className="skills-body">

        {/* ===== SIDEBAR ===== */}
        <div className="skills-sidebar">
          {Object.entries(SKILL_DATA).map(([key, value]) => (
            <div
              key={key}
              className={`sidebar-link ${active === key ? "active" : ""}`}
              onClick={() => setActive(key)}
            >
              {value.label}
            </div>
          ))}
        </div>

        {/* ===== MAIN PANEL ===== */}
        <div className="skills-main">

          <div className="skills-main-header">
            <img src={current.icon} alt="" />
            <h2>{current.label}</h2>
          </div>

          <div className="skills-list">
            {current.skills.map((skill, index) => (
              <div key={index} className="skill-row">

                <div className="skill-info">
                  <img src={skill.icon} alt="" />
                  <span>{skill.name}</span>
                </div>

                <div className="skill-bar-wrapper">
                  <div className="skill-bar">
                    <div
                      className="skill-fill"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="skills-status">
            {current.skills.length} items
          </div>

        </div>
      </div>
    </div>
  )
}

export default Skills