import { useContext, useEffect, useState } from "react";
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
            <div className="form-main-container">
                <h2 className="form-heading">Drop Us a Message!</h2>
                <form className="form-container" onSubmit={handleSubmit}>

                    <p>Fill out the form below and we'll get back to you as soon as possible.</p>


                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder="Enter your full name*"
                        required
                    />



                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address*"
                    />



                    <textarea
                        id="msg"
                        name="msg"
                        cols={30}
                        rows={10}
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="Type your message here*"
                        required
                    />


                    <button type="submit" className="form-btn">Send Message</button>
                </form>
            </div>
        </>
    );

}