import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

function Contact() {

    const [id, setId] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    const { authTokens } = useContext(AuthContext) || {};
    const { contact } = useContext(AuthContext) || {};

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
        contact(
            id,
            fullname,
            email,
            msg
        )
    }

    return (
        <>
            <div className="contact-main-container">
                <h1 className="contact-heading">Drop Us a Message!</h1>
                <form className="contact-form" onSubmit={handleSubmit}>

                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullname"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder="Enter your full name"
                    />
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email-id"
                    />
                    <label>Message</label>
                    <textarea
                        className="contact-msg-box"
                        type="text"
                        name="msg"
                        cols={20}
                        rows={10}
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="Type something...."
                    />
                    <button type="submit" className="contact-send-btn">
                        Send
                    </button>
                </form>
            </div>
        </>
    )
}

export default Contact