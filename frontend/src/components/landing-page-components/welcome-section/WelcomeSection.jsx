import welcomeImg from "../../../assets/img16.png"
import { Typewriter } from 'react-simple-typewriter'
function WelcomeSection() {
    return (
        <div className="welcome-section-main-container">
            <div className="welcome-content">
                <h3>Welcome  to</h3>
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
