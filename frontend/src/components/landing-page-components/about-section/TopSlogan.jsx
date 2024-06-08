/* eslint-disable react/no-unescaped-entities */

import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import PeopleIcon from '@mui/icons-material/People';

export default function TopSlogan() {
  return (
    <>
      <div className="about-section-top-slogan">
        <p>
          <PeopleIcon style={{ color: "rgb(192, 13, 13)" }} /> <span style={{ color: "rgb(192, 13, 13)" }}>"Join us</span> in our <span style={{ color: "rgb(192, 13, 13)" }}>mission</span> to <span style={{ color: "rgb(192, 13, 13)" }}>spread awareness</span> and <span style={{ color: "rgb(192, 13, 13)" }}>encourage others</span> to <span style={{ color: "rgb(192, 13, 13)" }}> donate blood "</span><BloodtypeIcon style={{ color: "rgb(192, 13, 13)" }} />

        </p>

      </div>
    </>
  )
}
