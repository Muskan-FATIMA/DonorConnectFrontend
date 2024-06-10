/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

function AddRequestForm() {

    const [id, setId] = useState('');

    const [recipientName, setRecipientName] = useState('');
    const [bldDonationLocation, setBldDonationLocation] = useState('');
    const [bldRequiredBeforeDate, setBldRequiredBeforeDate] = useState('');
    const [bldRequiredBeforeTime, setBldRequiredBeforeTime] = useState('');
    const [bldGrp, setBldGrp] = useState('');
    const [unitsNeeded, setUnitsNeeded] = useState('');
    const [contact, setContact] = useState('');
    const [reason, setReason] = useState('');

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
            setBldDonationLocation(req.bldDonationLocation)
            setBldRequiredBeforeDate(req.bldRequiredBeforeDate)
            setBldRequiredBeforeTime(req.bldRequiredBeforeTime)
            setBldGrp(req.bldGrp)
            setUnitsNeeded(req.unitsNeeded)
            setContact(req.contact)
            setReason(req.reason)
        }
    }, [authTokens, req]);

    const handleSubmit = async e => {
        e.preventDefault();
        createBldRequest(
            id,
            recipientName,
            bldDonationLocation,
            bldRequiredBeforeDate,
            bldRequiredBeforeTime,
            bldGrp,
            unitsNeeded,
            contact,
            reason, req
        )
    }

    return (
        <>
            <div className="add-request-form-container">
                <h1 className="add-req-heading">Create Request</h1>
                <form className="add-request-form" onSubmit={handleSubmit}>
                    <label>Recipient's Name </label>
                    <input type="text" name="recipientName" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Enter recipient's name" required />

                    <br />
                    <label>Blood Donation Location </label>
                    <input type="text" name="recipientAddress" value={bldDonationLocation} onChange={(e) => setBldDonationLocation(e.target.value)} placeholder="Enter the location of blood donation" required />
                    <br />
                    <label>Blood Required Before (Date) </label>
                    <input type="date" name="requiredByDate" value={bldRequiredBeforeDate} onChange={(e) => setBldRequiredBeforeDate(e.target.value)} required />
                    <br />
                    <label>Blood Required Before (Time)</label>
                    <input type="time" name="requiredByTime" value={bldRequiredBeforeTime} onChange={(e) => setBldRequiredBeforeTime(e.target.value)} required />
                    <br />
                    <label>Blood Group Required </label>
                    <br />
                    <select className="bld-grp" name="bldGrp" onChange={(e) => setBldGrp(e.target.value)} value={bldGrp} required>
                        <option value="" disabled>Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                    <br />
                    <label>No. of units needed </label>
                    <input type="number" name="unitsNeeded" value={unitsNeeded} onChange={(e) => setUnitsNeeded(e.target.value)} placeholder="Enter number of units needed" required />
                    <br />
                    <label>Contact</label>
                    <br />
                    <input type="number" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Enter contact number" required />
                    <br />
                    <label>Reason for Blood Requirement </label>
                    <br />
                    <textarea type="text" name="msgToDonor" value={reason} onChange={(e) => setReason(e.target.value)} cols={50} rows={6} placeholder="Type a message to donor..." required />
                    <button type="submit" className="request-btn">Add Request</button>
                </form>
            </div>
        </>
    )
}

export default AddRequestForm
