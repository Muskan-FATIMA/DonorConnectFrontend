import userImg from "../../../src/assets/user2.png";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

export default function MyProfile() {
    const { authTokens } = useContext(AuthContext) || {};
    const baseURL = "https://donorconnect.pythonanywhere.com";

    const [id, setId] = useState('');
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    if (loading) {
        return <div style={{ textAlign: "center", width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", }}>Loading...</div>;
    }

    if (!profile) {
        return (
            <div className="if-empty">
                <p>Request not found!</p>
            </div>
        );
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
                    <img src={userImg} alt="User" />
                    <h2>{profile.fullname}</h2>
                    <p>Blood Group: {profile.bldGrp}</p>
                </div>
            </div>
        </div>
    );
}
