
import afterDonatingBlood from "../../assets/after-donating-blood.webp"

export default function AfterDonatingBlood() {
    return (
        <div className="educational-resources-section">
            <h1>Post Donation Advice To Blood Donors</h1>
            <h3>After donating blood, a person may feel nauseous, lightheaded, or dizzy. People can usually return to most daily activities within a few hours of donating. Certain foods and drinks can help the body recover.</h3>
            <div>
                <img src={afterDonatingBlood} />
                <ul>
                    <li>Ddrink plenty of fluids such as water or juice to help replenish lost fluids and prevent dehydration.</li>
                    <li>Consume a healthy meal rich in iron and nutrients to help in the production of new blood cells.</li>
                    <li>Refrain from heavy lifting or strenuous physical activities for at least 24 hours after donation to avoid strain or injury.</li>
                    <li>Avoid consuming alcohol or smoking for at least 24 hours after donation, as these substances can interfere with the body's ability to recover.</li>
                    <li>The general guideline for the interval between blood donations is typically around 8 to 12 weeks for whole blood donation, but it may vary depending on the policies of the blood donation center or organization.</li>
                </ul>
            </div>
        </div>
    )
}