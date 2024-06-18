import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

export default function ProfileForm() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [id, setId] = useState('');

    const [fullname, setFullname] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [bldGrp, setBldGrp] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');

    const { authTokens } = useContext(AuthContext) || {};
    const { createProfile } = useContext(AuthContext) || {};

    const location = useLocation();
    const profile = location.state?.profile || null;

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
        if (profile) {
            setFullname(profile.fullname);
            setAge(profile.age);
            setGender(profile.gender);
            setBldGrp(profile.bldGrp);
            setAddress(profile.address);
            setContact(profile.contact);
        }
    }, [authTokens, profile]);

    const handleSubmit = async e => {
        e.preventDefault();
        createProfile(
            id,
            fullname,
            age,
            gender,
            bldGrp,
            address,
            contact,
            profile
        );
    }

    return (
        <div className="form-main-container">
            <h1 className="form-heading">PROFILE DETAILS</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <input type="text" name="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Full Name*" required />
                <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age*" required />

                <select name="gender" onChange={(e) => setGender(e.target.value)} value={gender}>
                    <option value="" disabled>Select Your Gender*</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <select name="bldGrp" onChange={(e) => setBldGrp(e.target.value)} value={bldGrp}>
                    <option value="" disabled>Select Your Blood Group*</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>

                <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full address*" required />

                <input type="text" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact number*" required />
                <button type="submit" className="form-btn">DONE</button>
            </form>
        </div>
    );
}