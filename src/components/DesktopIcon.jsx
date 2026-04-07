
function DesktopIcon({ label, onClick }) {
    return (
        <div className="icon" onClick={onClick}>
            <div className="icon-image"/>
            <p>{label}</p>
        </div>
    )
}

export default DesktopIcon;
