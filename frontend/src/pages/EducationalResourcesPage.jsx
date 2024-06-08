import BloodTypeCompatibility from "../components/educational-resources-page-components/BloodTypeCompatibility"
import WhoCanDonateBlood from "../components/educational-resources-page-components/WhoCanDonateBlood"
import BenefitsOfDonatingBlood from "../components/educational-resources-page-components/BenefitsOfDonatingBlood"
import DonationProcess from "../components/educational-resources-page-components/DonationProcess"
import AfterDonatingBlood from "../components/educational-resources-page-components/AfterDonatingBlood"

function EducationalResourcesPage() {
  return (
    <div className="edu-res-container">
      <BloodTypeCompatibility/>
      <WhoCanDonateBlood/>
      <BenefitsOfDonatingBlood/>
      <DonationProcess/>
      <AfterDonatingBlood/>
    </div>
  )
}

export default EducationalResourcesPage
