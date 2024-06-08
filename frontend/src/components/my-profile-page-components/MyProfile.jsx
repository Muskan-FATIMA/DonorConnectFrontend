import userImg from "../../../src/assets/user.png";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


export default function MyProfile() {
    const [id, setId] = useState('');
    const [profile, setProfile] = useState(null);
    const { authTokens } = useContext(AuthContext) || {};

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

    const baseURL = "http://127.0.0.1:8000/api";

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${baseURL}/profiles/profile/`, {
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
                    text: error.message || 'Internal Server Error',
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
        return <div>Loading...</div>;
    }

    return (

        <div className="profile-container">
            <div className="profile-details-page-container">
                <div className="edit-btn">
                    <button className="edit-profile-btn">
                        <Link to="/profile-form" state={{ profile }}>
                            <EditNoteIcon />
                        </Link>
                    </button>
                </div>
                <div className="profile-details">
                    <img src={userImg} height={180} width={180} style={{ backgroundColor: " #fffaf5", borderRadius: "50%", marginBottom: "1rem", boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)" }} />

                    <h2 style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}>{profile.fullname}  <span style={{ fontWeight: "400", fontSize: "1.2rem", textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}>({profile.bldGrp})</span></h2>
                </div>
                <div className="side-profile-btn">
                    <button className="myactivity-btn"><Link to="/my-activity">
                        Gratitude
                    </Link>
                    </button>
                    <button className="myrequests-btn"><Link to="/my-request">
                        MyRequests
                    </Link>
                    </button>
                    <button className="myrequests-btn"><Link to="/feedback">
                        Feedback
                    </Link>
                    </button>
                </div>

            </div>
        </div >

    );
}
