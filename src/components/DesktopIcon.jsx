
// DesktopIcon component - displays a single clickable icon on the desktop
// Props:
//   - label: text to display under the icon
//   - onClick: function called when icon is clicked
function DesktopIcon({ label, onClick }) {
    return (
        // Container div with click handler
        <div className="icon" onClick={onClick}>
            {/* Icon visual representation */}
            <div className="icon-image"/>
            {/* Label text displayed below the icon */}
            <p>{label}</p>
        </div>
    )
}

export default DesktopIcon;
