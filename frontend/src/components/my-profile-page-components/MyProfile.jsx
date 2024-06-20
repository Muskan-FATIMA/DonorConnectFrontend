import userImg from "../../../src/assets/user2.png";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function MyProfile() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [id, setId] = useState('');

    const [profile, setProfile] = useState(null);

    const { authTokens } = useContext(AuthContext) || {};

    const baseURL = "http://127.0.0.1:8000";

    useEffect(() => {
        if (authTokens && authTokens.access) {
            try {
                const decoded = jwtDecode(authTokens.access);
                console.log('Decoded Token: ', decoded);
                if (decoded.user_id) {
                    setId(decoded.user_id);
                } else {
                    console.log('ID not found in the token');
                }
            } catch (error) {
                console.log('Error decoding token:', error);
            }
        }
    }, [authTokens]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/profiles/profile/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    const profiles = response.data;
                    const userProfile = profiles.find(profile => profile.user === id);
                    if (userProfile) {
                        setProfile(userProfile);
                    }
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                swal.fire({
                    title: 'An Error Occurred while Fetching Profile',
                    icon: 'error',
                    toast: true,
                    timer: 2000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        };

        fetchProfile();
    }, [id]);

    if (!profile) {
        return <div>Request not found or invalid request.</div>;
    }

    return (
        <div className="profile-main-container">
            <div className="profile-container">
                <div className="edit-btn">
                    <button className="edit-profile-btn">
                        <Link to="/profile-form" state={{ profile }}>
                            <EditNoteIcon />
                        </Link>
                    </button>
                </div>
                <div className="profile-details">
                    <img src={userImg} height={180} width={180} style={{ backgroundColor: "rgb(173, 14, 14)", borderRadius: "50%", marginBottom: "2.2rem" }} />
                    <h2 style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.3)" }}>{profile.fullname} </h2>
                    <p style={{ fontWeight: "400", fontSize: "1.2rem", textShadow: "2px 2px 3px rgba(0, 0, 0, 0.2)" }}>Blood Grp : ({profile.bldGrp})</p>
                </div>
            </div>
        </div >
    );
}