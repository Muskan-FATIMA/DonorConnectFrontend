/* eslint-disable react/no-unescaped-entities */
import aboutImage from "../../../assets/about-image.jpg"
import TopSlogan from "./TopSlogan"
import BottomSlogan from "./BottomSlogan"

function AboutSection() {
    return (
        <>
            <TopSlogan />
            <div className="about-section">
                <div className="about-image-container">
                    <img src={aboutImage} alt="about-image" />
                </div>
                <div className="about-content"><p className="about-content-para">
                    <span style={{ color: "rgb(192, 13, 13)", fontWeight: "700", fontSize: "1.5rem" }}>Donor Connect</span> is more than just a website; it's a beacon of hope, fueled by empathy and kindness. Our platform serves as a bridge between those in need and those willing to give, fostering a community bound by the noble cause of blood donation.
                    <br /><br />
                    Driven by a commitment to humanity, our platform connects donors with those in critical medical situations. With every click and every pint donated at <span style={{ color: "rgb(192, 13, 13)", fontWeight: "700" }}>Donor Connect,</span> we're rewriting stories, offering hope and healing to those in their darkest moment, and spreading compassion worldwide.
                </p>
                </div>
            </div>
            <BottomSlogan />
        </>
    )
}

export default AboutSection
