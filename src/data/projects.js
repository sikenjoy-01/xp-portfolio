export const PROJECTS = [
  {
    id: "proj1",
    title: "NFC-Enabled Attendance App",
    short: "NFC-based attendance app with anti-spoofing",
    description: `
Developed as a thesis project, I built a mobile attendance system that utilizes NFC tags for seamless check-ins.
I implemented the NFC interaction logic, structured the app flow in Android Studio, and explored integrating computer vision for face detection to reduce proxy attendance.
Through this project, I gained hands-on experience in mobile development, hardware integration, and designing secure attendance workflows, while also understanding backend synchronization and data handling for real-time tracking and reporting.
    `,
    tech: ["Java", "Android Studio", "Firebase", "Git"],
    images: [
      "src/assets/projects/nfc-home.jpg",
      "src/assets/projects/nfc-class.jpg",
      "src/assets/projects/nfc-stats.jpg"
    ]
  },
  {
    id: "proj2",
    title: "Windows XPortfolio",
    short: "Desktop-like portfolio built in React",
    description: `
Created during my internship, I designed and developed an interactive portfolio that replicates a Windows-style desktop environment in the browser.
I implemented draggable window components, a functional taskbar, and modular app-like sections using React and custom CSS.
This project helped me deepen my understanding of component architecture, state management, and UI/UX design, while also challenging me to recreate a familiar desktop experience with responsive behavior and smooth interactions.
    `,
    tech: ["React", "CSS", "JavaScript", "Git"],
    images: [
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080",
      "https://placehold.co/1920x1080"
    ]
  },
  {
    id: "proj3",
    title: "AgriGabay",
    short: "Collection of practical tools used in agriculture.",
    description: `
Developed during my internship, I contributed to the AgriGabay mobile application by focusing on the NDVI scanning feature and the unit converter tool.
I worked on implementing image-based analysis for vegetation health using NDVI concepts, as well as building a functional and user-friendly conversion utility for agricultural needs.
This experience strengthened my skills in Kotlin development, working with image processing concepts, and designing practical tools tailored for real-world agricultural use cases.
    `,
    tech: ["Kotlin", "Android Studio", "Git"],
    images: [
      "src/assets/projects/agri-home.jpg",
      "src/assets/projects/agri-ndvi.jpg",
      "src/assets/projects/agri-conv.jpg"
    ]
  }
];