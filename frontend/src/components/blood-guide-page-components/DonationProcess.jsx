
import registration from "../../assets/registration.jpeg"
import healthHistory from "../../assets/health-history.jpeg"
import donation from "../../assets/donation.jpeg"
import refreshment from "../../assets/refreshment.jpeg"

export default function DonationProcess() {
    return (
        <div className="blood-guide-section">
            <h1 >The Donation Process</h1>
            <h3>The blood donation process from the time you arrive until the time you leave takes about an hour. The donation itself is only about 8-10 minutes on average. The general donation process is outlined below.</h3>
            <div id="blood-guide-main-container">
                <div id="blood-guide-container">
                    <h5>Donor Registration Phase</h5>
                    <div id="blood-guide-content">
                        <img src={registration} />
                        <p>
                            When you arrive at the blood donation center or mobile blood drive, you'll be greeted by staff or volunteers who will guide you through the donation process.
                            You'll be asked to provide some basic personal information, such as your name, address, date of birth, and contact details. You may also need to present a form of identification.
                            The staff will provide you with information about the donation process and answer any questions you may have.
                        </p>
                    </div>
                </div>
                <div id="blood-guide-container">
                    <h5>Health Screening Phase</h5>
                    <div id="blood-guide-content">
                        <p>
                            After registration, you'll undergo a health screening to ensure that you meet the eligibility criteria for blood donation. You'll be asked questions about your medical history, recent travel, and lifestyle factors that could affect the safety of your donation. This information helps identify any potential risk factors for transmitting infections through blood donation.
                            A staff member will take your vital signs, including your temperature, blood pressure, and pulse rate. They may also measure your haemoglobin level by pricking your finger and collecting a small blood sample.
                        </p>
                        <img src={healthHistory} />
                    </div>
                </div>
                <div id="blood-guide-container">
                    <h5>Blood Donation Phase</h5>
                    <div id="blood-guide-content">
                        <img src={donation} />
                        <p>
                            If you pass the health screening and meet the eligibility criteria, you'll proceed to the donation area.
                            A trained phlebotomist will clean an area on your arm and insert a sterile needle into a vein to collect blood.
                            During the donation, you'll be seated comfortably.
                            The amount of blood collected depends on the type of donation (whole blood, plasma, platelets, etc.), but it typically ranges from 350 to 500 milliliters (ml) for whole blood donations.
                        </p>
                    </div>
                </div>
                <div id="blood-guide-container">
                    <h5>Refreshment and recovery</h5>
                    <div id="blood-guide-content">
                        <p>
                            After donating blood, you'll be guided to a designated area where you can rest and recover.
                            You'll be offered refreshments like water, juice, and snacks to help replenish fluids and boost your energy levels.
                            It's important to take some time to rest and allow your body to recover after donation.
                            Once you're feeling well and have completed the recovery process, you'll be thanked for your donation and provided with information about when you'll be eligible to donate blood again.
                        </p>
                        <img src={refreshment} />
                    </div>
                </div>
            </div>
        </div>
    )
}