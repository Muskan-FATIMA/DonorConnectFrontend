import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";

export default function ProfileForm() {

    const [id, setId] = useState('');

    const [fullname, setFullname] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [bldGrp, setBldGrp] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');

    const { authTokens } = useContext(AuthContext) || {};

    const location = useLocation();
    const profile = location.state?.profile || null;

    const navigate = useNavigate()

    const baseURL = "http://127.0.0.1:8000/api";

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
        try {
            const data = {
                user: id,
                fullname,
                age,
                gender,
                bldGrp,
                address,
                contact,
            };

            if (profile) {
                await axios.put(`${baseURL}/profiles/profile/${profile.id}/`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                await axios.post(`${baseURL}/profiles/profile/`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
            navigate('/')
            swal.fire({
                title: 'Profile Saved',
                text: 'Your profile has been successfully saved!',
                icon: 'success',
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error('Error saving profile:', error);
            swal.fire({
                title: 'An Error Occurred',
                text: error.message || 'Internal Server Error',
                icon: 'error',
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }

    return (
        <div className="profile-form-container">
            <h1 className="profile-form-heading">PROFILE DETAILS</h1>
            <form className="profile-form" onSubmit={handleSubmit}>
                <label>Full Name :</label>
                <input type="text" name="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Enter your full name" required />
                <label>Age :</label>
                <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" required />
                <label>Gender :</label>
                <select name="gender" onChange={(e) => setGender(e.target.value)} value={gender}>
                    <option value="" disabled>Select Your Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <label>Blood Group :</label>
                <select name="bldGrp" onChange={(e) => setBldGrp(e.target.value)} value={bldGrp}>
                    <option value="" disabled>Select Your Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
                <label>Address :</label>
                <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your full address" required />
                <label>Contact no. :</label>
                <input type="text" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Enter your contact number" required />
                <button type="submit" className="profile-form-done-btn">DONE</button>
            </form>
        </div>
    );
}
