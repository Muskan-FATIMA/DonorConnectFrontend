import cardImg from "../../../assets/about-image.jpg"
import missionImg from "../../../assets/mission.jpg"
import visionImg from "../../../assets/im1.jpg"

function AboutCard() {
    return (
        <>
            <h1 className="about-card-section-heading">What Drives Us</h1>
            <div className="about-card-main-container">
                <div className="mission innerdiv">
                    <div className="card-img">
                        <img src={missionImg} alt="" />
                    </div>
                    <div className="card-content">
                        <h2 className="card-title">Our Mission</h2>
                        <p className="card-para">
                            At Donor Connect, our mission is to bridge the gap between blood donors and recipients, making it easier and more efficient to save lives. We believe that everyone should have access to the blood they need, and we are committed to facilitating this through our platform.
                        </p>
                    </div>
                </div>
                <div className="vision innerdiv">
                    <div className="card-img">
                        <img src={visionImg} alt="" />
                    </div>
                    <div className="card-content">
                        <h2 className="card-title">Our Vision</h2>
                        <p className="card-para">
                            We envision a world where no one has to struggle to find blood in times of need. We believe in the power of collective effort and aim to make Donor Connect a cornerstone in the fight against blood shortages. Together, we can create a future where no one has to wait for the blood they need.
                        </p>
                    </div>
                </div>
                <div className="story innerdiv">
                    <div className="card-img">
                        <img src={cardImg} alt="" />
                    </div>
                    <div className="card-content">
                        <h2 className="card-title">Our Story</h2>
                        <p className="card-para">
                            Donor Connect was founded with the belief that technology can make a significant impact in healthcare. Seeing the struggles people face in finding blood during emergencies, we decided to create a platform that simplifies the process and encourages people to become donors.
                        </p>
                    </div>
                </div>
            </div>
        </>)
}

export default AboutCard