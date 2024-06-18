/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function AddRequestForm() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [id, setId] = useState('');

    const [recipientName, setRecipientName] = useState('');
    const [recipientAge, setRecipientAge] = useState('');
    const [bldGrp, setBldGrp] = useState('');
    const [bldRequiredBeforeDate, setBldRequiredBeforeDate] = useState('');
    const [bldDonationLocation, setBldDonationLocation] = useState('');
    const [contact, setContact] = useState('');

    const { authTokens } = useContext(AuthContext) || {};
    const { createBldRequest } = useContext(AuthContext) || {};

    const location = useLocation();
    const req = location.state?.req || null;

    useEffect(() => {
        if (authTokens && authTokens.access) {
            try {
                const decoded = jwtDecode(authTokens.access);
                if (decoded.user_id) {
                    setId(decoded.user_id);
                } else {
                    console.log("id not found in the token");
                }
            } catch (error) {
                console.log("Error decoding token:", error);
            }
        }
        if (req) {
            setRecipientName(req.recipientName)
            setRecipientAge(req.recipientAge)
            setBldGrp(req.bldGrp)
            setBldDonationLocation(req.bldDonationLocation)
            setBldRequiredBeforeDate(req.bldRequiredBeforeDate)
            setContact(req.contact)
        }
    }, [authTokens, req]);

    const handleSubmit = async e => {
        e.preventDefault();
        createBldRequest(
            id,
            recipientName,
            recipientAge,
            bldDonationLocation,
            bldRequiredBeforeDate,
            bldGrp,
            contact,
            req
        )
    }

    return (
        <>
            <div className="form-main-container">
                <h1 className="form-heading">CREATE REQUEST</h1>
                <form className="form-container" onSubmit={handleSubmit}>

                    <input type="text" name="recipientName" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Recipient's name*" required />

                    <input type="number" name="recipientAge" value={recipientAge} onChange={(e) => setRecipientAge(e.target.value)} placeholder="Recipient's age*" required />

                    <select className="bld-grp" name="bldGrp" onChange={(e) => setBldGrp(e.target.value)} value={bldGrp} required>
                        <option value="" disabled>Select blood group*</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                    <p style={{ marginTop: "0.5rem" }} >Blood Required Before*</p>
                    <input type="date" name="requiredByDate" value={bldRequiredBeforeDate} onChange={(e) => setBldRequiredBeforeDate(e.target.value)} style={{ marginTop: "0.1rem" }} required />




                    <input type="text" name="recipientAddress" value={bldDonationLocation} onChange={(e) => setBldDonationLocation(e.target.value)} placeholder="Full address*" required />

                    <input type="number" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact number*" required />
                    <button type="submit" className="form-btn">Done</button>
                </form>
            </div>
        </>
    )
}
