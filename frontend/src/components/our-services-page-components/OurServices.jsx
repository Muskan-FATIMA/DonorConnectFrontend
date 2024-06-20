
import { useEffect } from 'react';
import guideImg1 from "../../assets/services-main.jpg"
import { Link } from 'react-router-dom'
// import guideImg2 from "../../assets/homepage2.png"
// import guideImg3 from "../../assets/viewreq.png"
// import guideImg4 from "../../assets/profilepage.png"

function OurServices() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="our-services-container">
                <div className="services-box">
                    <div className="services-content-box">
                        <h1>Our Services</h1>
                        <p>At Donor Connect, we provide a comprehensive platform to facilitate blood donations and requests. Explore our services below and learn how to make the most of our website.</p>
                    </div>
                </div>
                <div className="webguide-inner-container">
                    <div className="webguide-steps">
                        <h1>How to Get Started</h1>
                        <div className="webguide-steps-container">
                            <div className="webguide-steps-inner-content">
                                <h4>Register</h4>
                                <p><Link to=""> Sign up</Link> on Donor Connect with your basic information.  </p>
                                <h4>Login</h4>
                                <p><Link to="">Login</Link> to your account with your credentials.</p>
                                <h4>Complete Your Profile</h4>
                                <p>Fill out the <Link>Profile form</Link> with necessary details.
                                </p>
                            </div>
                            <div className="webguide-inner-img">
                                <img src={guideImg1} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="webguide-steps">
                        <h1>Adding Blood Request</h1>
                        <div className="webguide-steps-container">
                            <div className="webguide-inner-img">
                                <img src={guideImg1} alt="" />
                            </div>
                            <div className="webguide-steps-inner-content">
                                <p>After logging in and completing your profile, you can start using the platform in the following ways:</p>
                                <h4>Add a Blood Request</h4>
                                <p>  If you or someone you know needs blood:</p>
                                <p>
                                    <li> Navigate to the <Link to="">Add Request</Link> section.</li>
                                    <li>Fill out the request form with the necessary details.</li>
                                    <li>You can edit or delete your request in the <Link to="">My Request</Link> section.</li
                                    >
                                    <li>If someone accepts your request, a mail will be sent to you by the Donor Connect Team providing you the full details of donor.</li>
                                    <li>You can contact the donor for the further donation process.</li>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="webguide-steps">
                        <h1>Accepting Blood Request</h1>
                        <div className="webguide-steps-container">
                            <div className="webguide-steps-inner-content">
                                <p>If you want to donate blood:</p>
                                <p> <li>Browse through the <Link to="">View Request</Link> section.</li>
                                    <li>Find a request that matches your blood type.</li>
                                    <li>If you accept someone's request, a mail will be sent to you by the Donor Connect Team providing you the full details of recipient.</li>
                                    <li>You can contact the recipient for the further donation process.</li>
                                </p>
                            </div>
                            <div className="webguide-inner-img">
                                <img src={guideImg1} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="webguide-steps">
                        <h1>Sending Feedback</h1>
                        <div className="webguide-steps-container">
                            <div className="webguide-inner-img">
                                <img src={guideImg1} alt="" />
                            </div>
                            <div className="webguide-steps-inner-content">
                                <p>After successful completion of the blood donation process,  you can send your valuable <Link>Feedback</Link> regarding our website.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default OurServices