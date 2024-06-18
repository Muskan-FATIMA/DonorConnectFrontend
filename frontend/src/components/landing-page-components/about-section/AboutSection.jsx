import { useEffect } from 'react';
import { Link } from "react-router-dom"
import TopSlogan from "./TopSlogan"
import AboutCard from "./AboutCard"
import infoImg from "../../../assets/benefits-of-donating-blood.png"
import infoImg2 from "../../../assets/services6.jpg"

export default function AboutSection() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <TopSlogan />
            <div className="about-section">
                <div className="about-content"><p className="about-content-para">
                    <span style={{ color: "rgb(192, 13, 13)", fontWeight: "700", fontSize: "1.5rem" }}>Donor Connect</span> is more than just a website, it's a beacon of hope, fueled by empathy and kindness. Our platform serves as a bridge between those in need and those willing to give, fostering a community bound by the noble cause of blood donation.
                    <br /><br />
                    At <span style={{ color: "rgb(192, 13, 13)", fontWeight: "700", fontSize: "1rem" }}>Donor Connect</span> , we are dedicated to saving lives by connecting those in need of blood with those who are willing to donate. Whether you are a donor or a recipient, our platform is designed to facilitate the process seamlessly.
                </p>
                </div>
            </div>
            <div className="about-card-section">
                <AboutCard />
            </div>

            <div class="about-info-section">
                <div class="about-info-box">
                    <div className="about-infi-img">
                        <img src={infoImg} alt="" width={"100%"} />
                    </div>

                    <h2>Blood Donation Guide</h2>
                    <p>Learn about the process of donating blood, including eligibility criteria and the benefits of being a donor. Get prepared and know what to expect.</p>
                    <button className="about-info-btn"><Link to="/blood-guide">Learn More</Link> </button>
                </div>

                <div class="about-info-box">
                    <div className="about-infi-img">
                        <img src={infoImg2} alt="" width={"100%"} />
                    </div>
                    <h2>How to Use Our Platform</h2>
                    <p>Discover the range of services Donor Connect offers. Learn how to use our website effectively, from registration to managing your profile and requests.</p>
                    <button className="about-info-btn"><Link to="/our-services">Learn More</Link> </button>
                </div>
            </div>


        </>
    )
}
