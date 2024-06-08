import WelcomeSection from "../components/landing-page-components/welcome-section/WelcomeSection";
import AboutSection from "../components/landing-page-components/about-section/AboutSection";
import SuccessStories from "../components/landing-page-components/success-stories-section/SuccessStories";

function LandingPage() {
    return (
        <div>
            <WelcomeSection />
            <AboutSection />
            <SuccessStories />
        </div>
    )
}

export default LandingPage
