import { useState } from 'react'
import Desktop from './components/Desktop'

function App() {
  const [activeWindow, setActiveWindow] = useState(null)

  return (
    <Desktop 
      activeWindow={activeWindow}
      setActiveWindow={setActiveWindow}
    />
  )
}

export default App
