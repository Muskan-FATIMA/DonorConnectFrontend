/* eslint-disable react/no-unescaped-entities */

import bloodCompatibility from "../../assets/blood-compatibility.jpg"

export default function BloodTypeCompatibility() {
  return (
    <div className="blood-type-compatibility">
        <h1 >Blood Type Compatibility</h1>
        <h3 className="desc"> Blood type compatibility refers to the ability of one individual's blood to be safely transfused into another individual without causing adverse reactions. Ensuring compatibility is essential to prevent adverse reactions and ensure successful outcomes.</h3>
        <div>
          <p>
            Blood type compatibility is a cornerstone of medical procedures like blood transfusions and organ transplants, ensuring their safety and effectiveness. It's determined by the presence or absence of specific antigens and antibodies in the blood plasma, mainly within the ABO blood group system. <br /><br />
            The ABO system categorizes blood into four primary types: A, B, AB, and O. Each type is characterized by the presence or absence of A and B antigens on red blood cells and corresponding antibodies (anti-A and anti-B) in the plasma. Also, the Rh factor (+/-) plays a role in compatibility. <br /><br />
             Overall, the image visually represents the guidelines for safe blood transfusions based on blood type compatibility.
          </p>
          <img src={bloodCompatibility} />
        </div>
      </div>
  )
}
