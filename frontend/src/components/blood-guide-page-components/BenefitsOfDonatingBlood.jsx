import benefitsOfDonatingBlood from "../../assets/benefits-of-donating-blood.png"

export default function BenefitsOfDonatingBlood() {

    return (
        <div className="blood-guide-section">
            <h1>Benefits Of Donating Blood</h1>
            <h3>Donating blood is a selfless act that offers numerous benefits, both for the donor and for those in need of blood transfusions. Here are some of the key benefits of donating blood:</h3>
            <div>
                <ul>
                    <li>Donating blood may reduce the risk of heart attack by maintaining healthy iron levels and improving circulation.</li>
                    <li>Blood donation has been associated with lower blood pressure due to the temporary decrease in blood volume.</li>
                    <li>Regular blood donation can reduce the risk of blood clots by preventing the accumulation of excess iron in the body.</li>
                    <li>Blood donation improves blood flow, enhancing oxygen delivery to tissues and organs.</li>
                    <li>Blood donation helps the body detoxify by removing excess iron, which can be harmful in high levels.</li>
                    <li>Helping others through blood donation can help get rid of negative feelings and foster a sense of fulfillment.</li>
                </ul>
                <img src={benefitsOfDonatingBlood} />
            </div>
        </div>
    )
}