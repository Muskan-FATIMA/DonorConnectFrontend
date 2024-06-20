import { Link } from "react-router-dom"
import infoImg from "../../../assets/benefits-of-donating-blood.png"
import infoImg2 from "../../../assets/services-main.jpg"

export default function AboutInfo() {
    return (
        <>
            <h1 className="about-info-section-heading">Begin Your Journey</h1>
            <div className="about-info-main-container">
                <div className="about-info-box">
                    <div className="about-infi-img">
                        <img src={infoImg2} alt="" width={"100%"} />
                    </div>
                    <h2>How to Use Our Platform</h2>
                    <p>Discover the range of services Donor Connect offers. Learn how to use our website effectively, from registration to managing your profile and requests.</p>
                    <button className="about-info-btn"><Link to="/our-services">Learn More</Link> </button>
                </div>
                <div className="about-info-box">
                    <div className="about-infi-img">
                        <img src={infoImg} alt="" width={"100%"} />
                    </div>

                    <h2>Blood Donation Guide</h2>
                    <p>Learn about the process of donating blood, including eligibility criteria and the benefits of being a donor. Get prepared and know what to expect.</p>
                    <button className="about-info-btn"><Link to="/blood-guide">Learn More</Link> </button>
                </div>
            </div>
        </>
    )
}