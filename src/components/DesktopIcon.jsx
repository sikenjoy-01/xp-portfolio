
// DesktopIcon component - displays a single clickable icon on the desktop
// Props:
//   - label: text to display under the icon
//   - icon: path to the icon image
//   - onClick: function called when icon is clicked
function DesktopIcon({ label, icon, onClick }) {
    return (
        // Container div with click handler
        <div className="icon" onClick={onClick}>
            <img src={icon} alt={label} className="icon-image" />
            <p>{label}</p>
        </div>
    )
}

export default DesktopIcon;
