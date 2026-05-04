import "../styles/desktop.css"
import { APPS } from "../data/apps"
import { useEffect, useState, useCallback } from "react"
import DesktopIcon from "./DesktopIcon"
import Window from "./Window"
import Taskbar from "./Taskbar"

import About from "../windows/About"
import Projects from "../windows/Projects"
import Skills from "../windows/Skills"
import Contact from "../windows/Contact"
import Recycle from "../windows/Recycle"

// ---------------------------------------------------------------------------
// useBreakpoint — returns the current layout mode based on viewport width.
// Values: "mobile" | "tablet" | "desktop"
// ---------------------------------------------------------------------------
function useBreakpoint() {
  const getBreakpoint = () => {
    const w = window.innerWidth
    if (w < 640)  return "mobile"
    if (w < 1024) return "tablet"
    return "desktop"
  }

  const [bp, setBp] = useState(getBreakpoint)

  useEffect(() => {
    const handleResize = () => setBp(getBreakpoint())
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return bp
}

// ---------------------------------------------------------------------------
// getSpawnPosition — computes a safe initial (x, y) for a new window so it
// never spawns off-screen. Falls back to centered on mobile/tablet.
// ---------------------------------------------------------------------------
function getSpawnPosition(index, breakpoint) {
  if (breakpoint === "mobile") {
    // Full-screen on mobile — position doesn't matter; CSS overrides it
    return { x: 0, y: 0 }
  }

  if (breakpoint === "tablet") {
    // Centered; CSS overrides position via transform, but keep coords tidy
    return { x: 0, y: 0 }
  }

  // Desktop: stagger windows, clamped to viewport
  const WINDOW_W = Math.min(window.innerWidth * 0.5, 800)
  const WINDOW_H = Math.min(window.innerHeight * 0.6, 600)
  const TASKBAR_H = 44
  const OFFSET = index * 40

  const x = Math.min(200 + OFFSET, window.innerWidth  - WINDOW_W - 20)
  const y = Math.min(50  + OFFSET, window.innerHeight - WINDOW_H - TASKBAR_H - 20)

  return { x: Math.max(0, x), y: Math.max(0, y) }
}

// ---------------------------------------------------------------------------
// Desktop
// ---------------------------------------------------------------------------
function Desktop({ windows, setWindows }) {
  const breakpoint = useBreakpoint()

  // Open a new window, or focus + restore it if already open.
  const openWindow = useCallback((app) => {
    setWindows(prev => {
      const exists  = prev.find(w => w.id === app.id)
      const maxZ    = prev.length ? Math.max(...prev.map(w => w.z)) : 0

      if (exists) {
        return prev.map(w =>
          w.id === app.id ? { ...w, minimized: false, z: maxZ + 1 } : w
        )
      }

      const { x, y } = getSpawnPosition(prev.length, breakpoint)

      return [
        ...prev,
        {
          id: app.id,
          z: maxZ + 1,
          x,
          y,
          minimized: false,
          // width/height overrides only needed for specific apps (e.g. resume)
        },
      ]
    })
  }, [breakpoint, setWindows])

  // Shared window event handlers
  const handleClose    = (id) => setWindows(prev => prev.filter(w => w.id !== id))

  const handleMinimize = (id) => setWindows(prev => {
    const updated = prev.map(w => w.id === id ? { ...w, minimized: true } : w)
    const visible = updated.filter(w => !w.minimized)
    if (!visible.length) return updated

    const next = visible.reduce((max, w) => w.z > max.z ? w : max)
    const maxZ = Math.max(...updated.map(w => w.z))

    return updated.map(w => w.id === next.id ? { ...w, z: maxZ + 1 } : w)
  })

  const handleFocus = (id) => setWindows(prev => {
    const maxZ = Math.max(...prev.map(w => w.z))
    return prev.map(w => w.id === id ? { ...w, z: maxZ + 1 } : w)
  })

  const handleDrag = (id, newX, newY) => {
    // Clamp to viewport so windows can't be dragged fully off-screen
    const TASKBAR_H = 44
    const clampedX = Math.max(0, Math.min(newX, window.innerWidth  - 100))
    const clampedY = Math.max(0, Math.min(newY, window.innerHeight - TASKBAR_H - 30))

    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, x: clampedX, y: clampedY } : w)
    )
  }

  return (
    <div className="desktop">

      {/* ── DESKTOP ICONS ── */}
      <div className="icons">
        {APPS.filter(app => !app.hidden).map(app => (
          <DesktopIcon
            key={app.id}
            label={app.label}
            icon={app.icon}
            onClick={() => openWindow(app)}
          />
        ))}
      </div>

      {/* ── RECYCLE BIN (fixed bottom-right) ── */}
      <div className="recycle-bin">
        {APPS.filter(app => app.id === "recycle").map(app => (
          <DesktopIcon
            key={app.id}
            label={app.label}
            icon={app.icon}
            onClick={() => {
              setWindows(prev => {
                const exists = prev.find(w => w.id === app.id)
                const maxZ   = prev.length ? Math.max(...prev.map(w => w.z)) : 0

                if (exists) {
                  return prev.map(w =>
                    w.id === app.id ? { ...w, minimized: false, z: maxZ + 1 } : w
                  )
                }

                const { x, y } = getSpawnPosition(prev.length, breakpoint)

                return [
                  ...prev,
                  {
                    id: app.id,
                    z: maxZ + 1,
                    x,
                    y,
                    minimized: false,
                  },
                ]
              })
            }}
          />
        ))}
      </div>

      {/* ── WINDOWS ── */}
      {windows
        .filter(win => !win.minimized)
        .map(win => {
          const app = APPS.find(a => a.id === win.id)
          let content, title

          switch (win.id) {
            case "about":
              content = <About setWindows={setWindows} windows={windows} />
              title   = "About Me"
              break

            case "resume":
              content = (
                <div style={{ padding: "0.625rem", height: "100%" }}>
                  <iframe
                    src="/CV-Ken-Joshua-Infante.pdf"
                    title="Resume"
                    style={{ width: "100%", height: "100%", border: "none" }}
                  />
                </div>
              )
              title = "Resume"
              break

            case "projects":
              content = <Projects />
              title   = "Portfolio"
              break

            case "skills":
              content = <Skills />
              title   = "Skills"
              break

            case "contact":
              content = <Contact />
              title   = "Contact"
              break

            case "recycle":
              content = <Recycle setWindows={setWindows} />
              title   = "Recycle Bin"
              break

            default:
              if (win.content) {
                content = <div style={{ padding: "0.625rem" }}><p>{win.content}</p></div>
                title   = win.title || "File"
                break
              }
              return null
          }

          // Responsive window sizing ----------------------------------------
          // On mobile/tablet the CSS fully overrides position and size.
          // On desktop we use inline style to drive the draggable system.
          const isDesktop = breakpoint === "desktop"

          // Per-app comfortable desktop sizes
          const APP_SIZES = {
            about:    { width: "50vw",   height: "auto"  },
            resume:   { width: "50vw",   height: "50vh"  },
            projects: { width: "55vw",  height: "60vh" },
            skills:   { width: "40vw",  height: "60vh" },
            contact:  { width: "40vw",  height: "60vh" },
            recycle:  { width: "40vw",  height: "60vh" },
          }
          const appSize = APP_SIZES[win.id] || {}
          const desktopWidth  = win.width  || appSize.width
          const desktopHeight = win.height || appSize.height

          const isActive = win.z === Math.max(...windows.map(w => w.z))

          return (
            <Window
              key={win.id}
              title={title}
              icon={app?.icon}
              zIndex={win.z}
              x={win.x}
              y={win.y}
              width={isDesktop  ? (win.width  || desktopWidth)  : undefined}
              height={isDesktop ? (win.height || desktopHeight) : undefined}
              isActive={isActive}
              // Disable drag interaction on mobile and tablet
              draggable={isDesktop}
              onClose={()             => handleClose(win.id)}
              onMinimize={()          => handleMinimize(win.id)}
              onFocus={()             => handleFocus(win.id)}
              onDrag={(nx, ny)        => handleDrag(win.id, nx, ny)}
            >
              {content}
            </Window>
          )
        })}

      {/* ── TASKBAR ── */}
      <Taskbar windows={windows} setWindows={setWindows} />

    </div>
  )
}

export default Desktop