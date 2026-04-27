import { useRef, useState } from "react";
import emailjs from "emailjs-com";

function Contact() {
    const formRef = useRef();

    const [dialog, setDialog] = useState({
        open: false,
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("Sending...");

        emailjs.sendForm(
            "service_ma9ij2h",
            "template_184snlc",
            formRef.current,
            "hLJUyvXO_nwAunWM1" // confidential, should be stored in env variable in production
        )
        .then(() => {
            setLoading(false);
            setStatus("Message sent successfully.");
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
        <div className="contact">
            
            {/* FORM */}
            <div className="contact-card">
                <h3>Get In Touch!</h3>

                <form ref={formRef} onSubmit={sendEmail}>
                    <div className="contact-field">
                        <label>Name</label>
                        <input type="text" name="user_name" required />
                    </div>

                    <div className="contact-field">
                        <label>Email</label>
                        <input type="email" name="user_email" required />
                    </div>

                    <div className="contact-field">
                        <label>Message</label>
                        <textarea name="message" rows="4" required />
                    </div>

                    <button type="submit" className="xp-btn" disabled={loading}>
                        {loading ? "Sending..." : "Send"}
                    </button>
                </form>
            </div>

            {/* OTHER CONTACT OPTIONS */}
            <div className="contact-card">
                <h3>Other Ways to Reach Me</h3>

                <div className="contact-links">
                    <a 
                        href="https://facebook.com/kenjosh.infante" 
                        target="_blank" 
                        rel="noreferrer"
                        className="contact-link"
                    >
                        Facebook
                    </a>

                    <a 
                        href="https://linkedin.com/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="contact-link"
                    >
                        LinkedIn
                    </a>

                    <a 
                        href="https://github.com/sikenjoy-01" 
                        target="_blank" 
                        rel="noreferrer"
                        className="contact-link"
                    >
                        GitHub
                    </a>
                </div>
            </div>

            {/* XP DIALOG POPUP */}
            {dialog.open && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <div className="dialog-title">
                            Message
                        </div>

                        <div className="dialog-content">
                            <p>{dialog.message}</p>

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