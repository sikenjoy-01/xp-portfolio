
function Window({ title, children, onClose }) {
    return (
        <div className="window">
            <div className="title-bar">
                <span>{title}</span>
                <button className="close-btn" onClick={onClose}>
                    X
                </button>
            </div>

            <div className="window-content">
                {children}
            </div>     
        </div>
    )
}

export default Window    