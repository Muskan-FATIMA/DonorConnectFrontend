import { useEffect } from 'react';
import guideImg1 from "../../assets/homepage1.png"
import guideImg2 from "../../assets/homepage2.png"
import guideImg3 from "../../assets/viewreq.png"
import guideImg4 from "../../assets/profilepage.png"

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
                    <h1>
                        Your First Steps with Donor Connect
                    </h1>
                    <div className="webguide-steps">
                        <div className="webguide-steps-inner-content">
                            <h2>How to Get Started</h2>
                            <h4>Register</h4>
                            <p>Step 1: Sign up on Donor Connect with your basic information.</p>
                            <h4>Login</h4>
                            <p>Step 2: Access your account by logging in.</p>
                            <h4>Complete Your Profile</h4>
                            <p>Step 3: Fill out the profile form with necessary details.
                            </p>
                        </div>
                        <div className="webguide-inner-img">
                            <img src={guideImg1} alt="" />
                        </div>

                    </div>
                    <div className="webguide-steps">
                        <div className="webguide-inner-img">
                            <img src={guideImg2} alt="" />
                        </div>
                        <div className="webguide-steps-inner-content">
                            <h2>Using Donor Connect</h2>
                            <p>After logging in and completing your profile, you can start using the platform in the following ways:</p>
                            <h4>Add a Blood Request</h4>
                            <p>If you or someone you know needs blood:</p>
                            <p>Step 1: Navigate to the "Add Request" section.
                                <br />Step 2: Fill out the request form with the necessary details.
                                <br />
                                Step 3: Your request will be added in the "View Requests" section where other users can see it.</p>
                        </div>

                    </div>
                    <div className="webguide-steps">
                        <div className="webguide-steps-inner-content">
                            <h2>Donate Blood</h2>
                            <p>If you want to donate blood:</p>
                            <p>Step 1: Browse through the "View Requests" section. <br />
                                Step 2: Find a request that matches your blood type and contact the requester to arrange the donation.</p>
                        </div>
                        <div className="webguide-inner-img">
                            <img src={guideImg3} alt="" />
                        </div>
                    </div>
                    <div className="webguide-steps">
                        <div className="webguide-inner-img">
                            <img src={guideImg4} alt="" />
                        </div>
                        <div className="webguide-steps-inner-content">
                            <h2>Profile Management</h2>
                            <p>In your profile section, you can:</p>
                            <h4>Edit Profile Details</h4>
                            <p>Update your personal information at any time.</p>
                            <h4>My Activity</h4>
                            <p>When a recipient sends feedback, a token of appreciation is added to the donor's profile.</p>
                            <h4>My Requests</h4>
                            <p>Track and manage all your blood requests in one place.</p>
                            <h4>Feedback</h4>
                            <p>Provide feedback on how Donor Connect has helped you.</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default OurServices