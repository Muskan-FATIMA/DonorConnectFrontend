import welcomeImg from "../../../assets/img16.png"
import { Typewriter } from 'react-simple-typewriter'
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

function WelcomeSection() {

    const [username, setUsername] = useState("");

    const { authTokens } = useContext(AuthContext) || {};

    useEffect(() => {
        if (authTokens && authTokens.access) {
            try {
                const decoded = jwtDecode(authTokens.access);
                console.log("Decoded Token: ", decoded);
                if (decoded.username) {
                    decoded.username = decoded.username.charAt(0).toUpperCase() + decoded.username.slice(1).toLowerCase();
                    setUsername(decoded.username);
                } else {
                    console.log("Username not found in the token");
                }
            } catch (error) {
                console.log("Error decoding token:", error);
            }
        }
    }, [authTokens]);

    return (
        <div className="welcome-section-main-container">
            <div className="welcome-content">
                <h3>Welcome {username} to</h3>
                <h1><Typewriter words={['Donor Connect']} loop={false} cursor={true} cursorBlinking={true} typeSpeed={100} /></h1>
                <p className="welcome-para">Where A Simple Act Of Kindness Can Save Lives!</p>
            </div>
            <div className="welcome-img">
                <img src={welcomeImg} height={400} width={400} />
            </div>
        </div>
    )
}

export default WelcomeSection
