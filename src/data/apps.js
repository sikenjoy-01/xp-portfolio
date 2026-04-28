// APPS configuration - defines all available applications
// Each app has:
//   - id: unique identifier used to open the correct window
//   - label: text displayed on the desktop icon
//   - icon: path to icon image (served from public folder)
export const APPS = [
    {   id: "about", 
        label: "About Me", 
        icon: "/User 1.ico" 
    },

    {   id: "projects", 
        label: "Projects", 
        icon: "/My Computer.ico" 
    },

    {   id: "skills", 
        label: "Skills", 
        icon: "/List File.ico" 
    },

    {   id: "contact", 
        label: "Contact", 
        icon: "/Phone.ico" 
    }
]