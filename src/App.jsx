import { useState } from 'react'
import Desktop from './components/Desktop'

// Main App component - the root of the application
function App() {
  // State to track all open windows
  // Each window object contains: id, z-index (for layering), x and y positions
  const [windows, setWindows] = useState([])

  return (
    // Desktop component displays the desktop with icons and windows
    // Pass windows state and setter function as props
    <Desktop 
      windows={windows}
      setWindows={setWindows}
    />
  )
}

export default App
