// APPS configuration - defines all available applications
// Each app has:
//   - id: unique identifier used to open the correct window
//   - label: text displayed on the desktop icon
//   - icon: path to icon image (served from public folder)
export const APPS = [
    {   id: "about", 
        label: "About Me", 
        icon: "/assets/about.png" 
    },

    {   id: "resume",
        label: "Resume",
        icon: "/assets/about.png",
        hidden: true  // This app won't show on the desktop, but can be opened from About Me
    },

    {   id: "projects", 
        label: "Portfolio", 
        icon: "/assets/projects2.png" 
    },

    {   id: "skills", 
        label: "Skills", 
        icon: "/assets/skills.png" 
    },

    {   id: "contact", 
        label: "Contact", 
        icon: "/assets/contact.png" 
    },

    {
        id: "recycle",
        label: "Recycle Bin",
        icon: "/assets/recyclebin.png",
        hidden: true // This app is rendered separately in the Desktop component to be fixed at the bottom-right corner
    }
]