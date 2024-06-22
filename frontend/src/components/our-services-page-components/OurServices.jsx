import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";
import video3 from "../../assets/video3.mp4";
import video4 from "../../assets/video4.mp4";

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
                                <p>Begin your journey on Donor Connect by <Link to="https://donorconnect.netlify.app/register">Registering</Link> with your basic information.</p>
                                <h4>Login</h4>
                                <p>Use your credentials to <Link to="https://donorconnect.netlify.app/login">Login</Link> into your account.</p>
                                <h4>Update Your Profile</h4>
                                <p>Complete the <Link to="https://donorconnect.netlify.app/profile-form">Profile Form</Link> with all necessary details. You can also <Link to="https://donorconnect.netlify.app/my-profile">update</Link> your profile at any time to keep your information current.</p>
                            </div>
                            <div className="webguide-inner-video">
                                <video autoPlay loop muted controls>
                                    <source src={video1} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                    <div className="webguide-steps">
                        <h1>Adding Request</h1>
                        <div className="webguide-steps-container">
                            <div className="webguide-inner-video">
                                <video autoPlay loop muted controls>
                                    <source src={video2} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="webguide-steps-inner-content">
                                <h4>Add a Request</h4>
                                <p>If you or someone you know needs blood, navigate to the <Link to="https://donorconnect.netlify.app/add-request">Add Request</Link> section and fill out the form with all necessary details. When you add a request, all users will receive an email notification about the new request.</p>
                                <h4>Update the Request</h4>
                                <p>You can edit or delete your request anytime in the <Link to="https://donorconnect.netlify.app/my-request">My Request</Link> section. </p>
                                <h4>Receive Donor Notification</h4>
                                <p>When someone accepts your request, you'll receive an email from the Donor Connect Team with the full details of the donor. </p>
                            </div>
                        </div>
                    </div>
                    <div className="webguide-steps">
                        <h1>Accepting Request</h1>
                        <div className="webguide-steps-container">
                            <div className="webguide-steps-inner-content">
                                <h4>Accept a Request</h4>
                                <p>If you wish to donate blood, visit the <Link to="https://donorconnect.netlify.app/view-request">View Request</Link> section, find a request that matches your blood type, and click the Accept button. This helps connect you to those in need.</p>
                                <h4>Receive Recipient Notification</h4>
                                <p>Upon accepting a request, you will receive an email from the Donor Connect Team with the recipient's details. Use this information to contact the recipient and coordinate the donation process.</p>
                            </div>
                            <div className="webguide-inner-video">
                                <video autoPlay loop muted controls>
                                    <source src={video3} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                    <div className="webguide-steps">
                        <h1>Sending Feedback</h1>
                        <div className="webguide-steps-container">
                            <div className="webguide-inner-video">
                                <video autoPlay loop muted controls>
                                    <source src={video4} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="webguide-steps-inner-content">
                                <h4>Provide Your Feedback</h4>
                                <p>After successfully completing the blood donation process, we encourage the recipient to share their valuable <Link to="https://donorconnect.netlify.app/feedback">feedback</Link> on how our website has contributed to saving lives.</p>
                                <h4>Token of Thanks</h4>
                                <p>Once the feedback form is submitted, the donor will receive an email from the Donor Connect Team, including a Certificate of Appreciation for their generous contribution.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OurServices;
