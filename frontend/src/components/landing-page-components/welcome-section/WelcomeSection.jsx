
import welcomeImg from "../../../assets/welcome.png";


export default function WelcomeSection() {


    return (
        <div className="welcome-section-main-container">
            <div className="welcome-content">
                <h3>Welcome to</h3>
                <h1>Donor Connect</h1>
                <p className="welcome-para">Where A Simple Act Of Kindness Can Save Lives!</p>
            </div>
            <div className="welcome-img">
                <img src={welcomeImg} alt="Welcome" />
            </div>

        </div>
    );
}
