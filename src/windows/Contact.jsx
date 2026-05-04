import { useRef, useState } from "react";
import emailjs from "emailjs-com";

function Contact() {
    const formRef = useRef();

    const [dialog, setDialog] = useState({
        open: false,
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("Ready");

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("Sending message...");

        emailjs.sendForm(
            "service_ma9ij2h",
            "template_184snlc",
            formRef.current,
            "hLJUyvXO_nwAunWM1"
        )
        .then(() => {
            setLoading(false);
            setStatus("Message sent.");
            setDialog({
                open: true,
                message: "Message sent successfully."
            });
            formRef.current.reset();
        })
        .catch(() => {
            setLoading(false);
            setStatus("Failed to send message.");
            setDialog({
                open: true,
                message: "Failed to send message."
            });
        });
    };

    return (
        <div className="contact-app">

            {/* LEFT PANEL (CONTACTS) */}
            <div className="contact-sidebar">
                <div className="contact-sidebar-header">
                    Contacts
                </div>

                <div className="contact-list">

                    <a href="https://facebook.com/kenjosh.infante" target="_blank" rel="noreferrer" className="contact-item">
                        <img src="src/assets/facebook.png" alt="" />
                        <span>Facebook</span>
                    </a>

                    <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="contact-item">
                        <img src="src/assets/linkedin.png" alt="" />
                        <span>LinkedIn</span>
                    </a>

                    <a href="https://github.com/sikenjoy-01" target="_blank" rel="noreferrer" className="contact-item">
                        <img src="src/assets/github.png" alt="" />
                        <span>GitHub</span>
                    </a>

                </div>
            </div>

            {/* RIGHT PANEL (FORM) */}
            <div className="contact-main">

                <div className="contact-main-header">
                    Compose Message
                </div>

                <form ref={formRef} onSubmit={sendEmail} className="contact-form">

                    <div className="contact-row">
                        <label>To:</label>
                        <input type="text" value="infantekenjoshua@email.com" readOnly />
                    </div>

                    <div className="contact-row">
                        <label>From:</label>
                        <input type="email" name="user_email" required />
                    </div>

                    <div className="contact-row">
                        <label>Name:</label>
                        <input type="text" name="user_name" required />
                    </div>

                    <div className="contact-row">
                        <label>Subject:</label>
                        <input type="text" name="subject" required />
                    </div>

                    <div className="contact-message">
                        <textarea 
                            name="message" 
                            rows="6" 
                            required
                            placeholder="Type your message here..."
                            onKeyDown={(e) => {
                                if (e.ctrlKey && e.key === "Enter") {
                                    e.target.form.requestSubmit();
                                }
                            }}
                        />
                    </div>

                    <div className="contact-actions">
                        <button type="submit" className="xp-btn" disabled={loading}>
                            <img src="src/assets/send.png" alt="" />
                            {loading ? "Sending..." : "Send"}
                        </button>

                        <button 
                            type="button" 
                            className="xp-btn"
                            onClick={() => formRef.current.reset()}
                        >
                            <img src="src/assets/clear.png" alt="" />
                            Clear
                        </button>
                    </div>

                </form>

                {/* STATUS BAR */}
                <div className="contact-status">
                    {status}
                </div>
            </div>

            {/* DIALOG */}
            {dialog.open && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <div className="dialog-title">
                            System Message
                        </div>

                        <div className="dialog-content">
                            <p>[ ! ] {dialog.message}</p>

                            <button 
                                className="xp-btn"
                                onClick={() => setDialog({ open: false, message: "" })}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Contact;