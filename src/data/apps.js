// APPS configuration - defines all available applications
// Each app has:
//   - id: unique identifier used to open the correct window
//   - label: text displayed on the desktop icon
//   - icon: path to icon image (served from public folder)
export const APPS = [
    {   id: "about", 
        label: "About Me", 
        icon: "src/assets/about.png" 
    },

    {   id: "projects", 
        label: "Projects", 
        icon: "src/assets/projects2.png" 
    },

    {   id: "skills", 
        label: "Skills", 
        icon: "src/assets/skills.png" 
    },

    {   id: "contact", 
        label: "Contact", 
        icon: "src/assets/contact.png" 
    }
]