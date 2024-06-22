
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
                        <h1>Getting Started</h1>
                        <div className="webguide-steps-container">
                            <div className="webguide-steps-inner-content">
                                <h4>Create An Account</h4>
                                <p>Begin your journey on Donor Connect by <Link to="https://donorconnect.netlify.app/register">Registering</Link> with your basic information.  </p>
                                <h4>Login</h4>
                                <p>Use your credentials to <Link to="https://donorconnect.netlify.app/login">Login</Link> into your account.</p>
                                <h4>Update Your Profile</h4>
                                <p>Fill out the <Link to="https://donorconnect.netlify.app/profile-form">Profile Form</Link> with all the necessary details to finish setting up your account. You can also <Link to="https://donorconnect.netlify.app/my-profile">update</Link> your profile at any time.
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
                                <h4>Add a Request</h4>
                                <p>If you or someone you know needs blood, then navigate to the <Link to="https://donorconnect.netlify.app/add-request">Add Request</Link> section, and fill out the request form with the necessary details.
                                </p>
                                <h4>Update the Request</h4>
                                <p>You can edit or delete your request anytime in the <Link to="https://donorconnect.netlify.app/my-request">My Request</Link> section.</p>
                                <h4>Receive Mail Notification</h4>
                                <p>When someone accepts your request, you will receive an email from the Donor Connect Team containing the full details of the donor. You can use this information to contact the donor and arrange the donation.</p>
                            </div>
                        </div>
                    </div>
                    <div className="webguide-steps">
                        <h1>Accepting Blood Request</h1>
                        <div className="webguide-steps-container">
                            <div className="webguide-steps-inner-content">
                                <h4>Accept a Request</h4>
                                <p>If you wish to donate blood, go to the <Link to="https://donorconnect.netlify.app/view-request">View Request</Link> section, find a request that matches your blood type and click the Accept button.</p>
                                <h4>Receive Mail Notification</h4>
                                <p>Upon accepting a request, you will receive an email from the Donor Connect Team with the complete details of the recipient. You can use this information to contact the recipient and proceed with the donation process.</p>
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
                                <h4>Provide Your Feedback</h4>
                                <p>After successful completing the blood donation process, we encourage the recipient to share their valuable <Link to="https://donorconnect.netlify.app/feedback">feedback</Link> on how our website has contributed to saving lives.</p>
                                <h4>Token of Thanks</h4>
                                <p>Once the feedback form is submitted, the donor will receive an email from the Donor Connect Team, including a Certificate of Appreciation for their generous contribution.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default OurServices