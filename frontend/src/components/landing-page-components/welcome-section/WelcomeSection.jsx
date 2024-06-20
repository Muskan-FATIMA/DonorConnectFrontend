import welcomeImg from "../../../assets/welcome.png";

export default function WelcomeSection() {
    return (
        <div className="welcome-section-main-container">
            <div className="welcome-content">
                <h3>Welcome to</h3>
                <h1>Donor Connect</h1>
                {window.innerWidth < 768 && (
                    <div className="welcome-small-screen-img">
                        <img src={welcomeImg} alt="Welcome" />
                    </div>
                )}
                <p className="welcome-para">Where A Simple Act Of Kindness Can Save Lives!</p>
            </div>
            {window.innerWidth >= 768 && (
                <div className="welcome-large-screen-img">
                    <img src={welcomeImg} alt="Welcome" />
                </div>
            )}

        </div>
    );
}