import BloodTypeCompatibility from "../components/blood-guide-page-components/BloodTypeCompatibility"
import WhoCanDonateBlood from "../components/blood-guide-page-components/WhoCanDonateBlood"
import BenefitsOfDonatingBlood from "../components/blood-guide-page-components/BenefitsOfDonatingBlood"
import DonationProcess from "../components/blood-guide-page-components/DonationProcess"
import AfterDonatingBlood from "../components/blood-guide-page-components/AfterDonatingBlood"

function BloodGuidePage() {
    return (
        <div className="blood-guide-page-container">
            <BloodTypeCompatibility />
            <WhoCanDonateBlood />
            <BenefitsOfDonatingBlood />
            <DonationProcess />
            <AfterDonatingBlood />
        </div>
    )
}

export default BloodGuidePage