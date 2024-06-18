import WelcomeSection from "../components/landing-page-components/welcome-section/WelcomeSection";
import AboutSection from "../components/landing-page-components/about-section/AboutSection";
import Testimonials from "../components/landing-page-components/testimonials-page-components/Testimonials"

export default function LandingPage() {
    return (
        <div>
            <WelcomeSection />
            <AboutSection />
            <Testimonials />
        </div>
    )
}