
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import swal from 'sweetalert2';
import activityImg from "../../assets/new-logo3.png"


export default function MyActivity() {

    const [id, setId] = useState('');

    const [user, setUser] = useState([])
    const [donor, setDonor] = useState([])

    const { authTokens } = useContext(AuthContext) || {};

    const baseURL = "http://127.0.0.1:8000";

    useEffect(() => {
        if (authTokens && authTokens.access) {
            try {
                const decoded = jwtDecode(authTokens.access);
                if (decoded.user_id) {
                    setId(decoded.user_id);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, [authTokens]);


    useEffect(() => {
        const fetchUserFullname = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/profiles/profile/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    const currentUser = response.data.filter(i => i.user === id);
                    setUser(currentUser)
                }
            }
            catch (error) {
                swal.fire({
                    title: 'An Error Occurred while Fetching Current User',
                    icon: 'error',
                    toast: true,
                    timer: 2000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        };
        if (id) {
            fetchUserFullname();
        }
    }, [id])

    useEffect(() => {
        const fetchDonorName = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/feedbacks/feedback/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200 && user.length > 0) {
                    const donorDetails = response.data.filter(req => req.donor === user[0].fullname);
                    setDonor(donorDetails)
                }
            }
            catch (error) {
                swal.fire({
                    title: 'An Error Occurred while Fetching Donor Name',
                    icon: 'error',
                    toast: true,
                    timer: 2000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        };
        if (user.length > 0) {
            fetchDonorName();
        }
    }, [user])

    return (
        <div className="my-activity-page-container">
            {donor.length > 0 ? (
                <>
                    <h1 className="achievements-heading"> MY DONATIONS </h1>
                    <div className="achievements-container" style={{ textAlign: "center" }}>
                        {donor.map((req, index) => (
                            <div key={index} className="congratulation-msg-container">
                                <div className="myactivity-img-container">
                                    <img src={activityImg} alt="" />
                                </div>

                                <p>
                                    We are immensely grateful for your recent blood donation. By giving blood, you have made a profound difference in <span style={{ fontWeight: "700", fontSize: "1.1rem", color: "rgb(173, 14, 14)" }}>{req.recipient}'s</span> life.
                                    Thank you for your generosity and compassion  ❤️
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="if-empty">
                    <p>No Donations Yet !</p>
                </div>
            )}
        </div>
    )
}