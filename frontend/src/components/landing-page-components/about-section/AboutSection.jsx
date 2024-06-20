/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import TopSlogan from "./TopSlogan"
import AboutCard from "./AboutCard"
import AboutInfo from './AboutInfo';

export default function AboutSection() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <TopSlogan />
            <div className="about-section">
                <div className="about-content"><p className="about-content-para">
                    <span className='about-section-para-company-name'>Donor Connect</span> is more than just a website, it's a beacon of hope, fueled by empathy and kindness. Our platform serves as a bridge between those in need and those willing to give, fostering a community bound by the noble cause of blood donation.
                    <br /><br />
                    At <span className='about-section-para-company-name'>Donor Connect</span>, we are dedicated to saving lives by connecting those in need of blood with those who are willing to donate. Whether you are a donor or a recipient, our platform is designed to facilitate the process seamlessly.
                </p>
                </div>
            </div>

            <div className="about-card-section">
                <AboutCard />
            </div>

            <div className="about-info-section">
                <AboutInfo />
            </div>

        </>
    )
}