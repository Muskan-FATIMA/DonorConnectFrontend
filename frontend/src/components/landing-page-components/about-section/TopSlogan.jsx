/* eslint-disable react/no-unescaped-entities */
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import PeopleIcon from '@mui/icons-material/People';
import { useState, useEffect } from 'react';

export default function TopSlogan() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const sloganContent = (
    <>
      <PeopleIcon style={{ color: "rgb(173, 14, 14)" }} /> <span style={{ color: "rgb(173, 14, 14)" }}>"Join us</span> in our <span style={{ color: "rgb(173, 14, 14)" }}>mission</span> to <span style={{ color: "rgb(173, 14, 14)" }}>spread awareness</span> and <span style={{ color: "rgb(173, 14, 14)" }}>encourage others</span> to <span style={{ color: "rgb(173, 14, 14)" }}> donate blood "</span><BloodtypeIcon style={{ color: "rgb(173, 14, 14)" }} />
    </>
  )
  return (
    <>
      {isSmallScreen ? (
        <marquee className="about-section-top-slogan">{sloganContent}</marquee>
      ) : (
        <div className="about-section-top-slogan">
          <p>{sloganContent}</p>
        </div>
      )}
    </>
  )
}