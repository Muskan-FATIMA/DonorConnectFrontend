import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Feedback() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [recipient, setRecipient] = useState('');
    const [donor, setDonor] = useState('');
    const [thanksmsg, setThanksmsg] = useState('');

    const { sendFeedback } = useContext(AuthContext) || {};


    const handleSubmit = async (e) => {
        e.preventDefault();
        sendFeedback(recipient, donor, thanksmsg);
    };

    return (
        <>
            <div className="form-main-container">
                <h1 className="form-heading">DROP US A MESSAGE</h1>
                <form className="form-container" onSubmit={handleSubmit} >
                    <input type="text" name="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Recipient's full name*" />
                    <input type="text" name="donor" value={donor} onChange={(e) => setDonor(e.target.value)} placeholder="Donor's full name" />
                    <textarea className="feedback-msg-box" type="text" name="thanksmsg" value={thanksmsg} onChange={(e) => setThanksmsg(e.target.value)} cols={20} rows={10} placeholder="How Did Donor Connect Help You?" />
                    <button type="submit" className="form-btn">Submit</button>
                </form>
            </div>
        </>
    )
}