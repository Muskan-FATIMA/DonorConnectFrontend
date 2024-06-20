/* eslint-disable react/no-unescaped-entities */
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Contact() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [id, setId] = useState('');

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    const { authTokens } = useContext(AuthContext) || {};
    const { contact } = useContext(AuthContext) || {};

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (authTokens && authTokens.access) {
            try {
                const decoded = jwtDecode(authTokens.access);
                if (decoded.user_id) {
                    setId(decoded.user_id);
                } else {
                    console.log("id not found in the token");
                }
            } catch (error) {
                console.log("Error decoding token:", error);
            }
        }
    }, [authTokens]);

    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await contact(id, fullname, email, msg);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="form-main-container">
                <h2 className="form-heading">Drop Us a Message!</h2>
                <form className="form-container" onSubmit={handleSubmit}>
                    <p id="form-subheading">Fill out the form below and we'll get back to you as soon as possible.</p>
                    <input type="text" id="fullname" name="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Full Name*" required />
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email*" />
                    <textarea id="msg" name="msg" cols={30} rows={10} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Your Message*" required />
                    {isLoading && <div style={{ textAlign: "center", color: "black" }}>Sending your message, please wait...</div>}
                    <button type="submit" className="form-btn">Send</button>
                </form>
            </div>
        </>
    )
}