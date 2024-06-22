import welcomeImg from "../../../assets/welcome.png";
import { useState, useEffect } from 'react';


export default function WelcomeSection() {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className="welcome-section-main-container">
            <div className="welcome-content">
                <h3>Welcome to</h3>
                <h1>Donor Connect</h1>
                {isSmallScreen && (
                    <div className="welcome-small-screen-img">
                        <img src={welcomeImg} alt="Welcome" />
                    </div>
                )}
                <p className="welcome-para">Where A Simple Act Of Kindness Can Save Lives!</p>
            </div>
            {!isSmallScreen && (
                <div className="welcome-large-screen-img">
                    <img src={welcomeImg} alt="Welcome" />
                </div>
            )}
        </div>
    );
}