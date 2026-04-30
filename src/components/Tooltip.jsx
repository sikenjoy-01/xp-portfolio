import React, { useState } from 'react'
import { createPortal } from 'react-dom'

function Tooltip({ text, children }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  return (
    <span
      className="tooltip"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={(e) => {
        setPos({
          x: e.pageX,
          y: e.pageY
        })
      }}
    >
      {children}

      {visible && 
        createPortal(
        <span
            className="tooltip-text"
            style={{
                top: pos.y + 10, // offset below cursor
                left: pos.x + 20 // offset to the right of cursor 
            }}
            >
            {text}
        </span>,
        document.body
      )}
    </span>
  )
}

export default Tooltip