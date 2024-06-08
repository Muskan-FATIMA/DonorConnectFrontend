import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import swal from 'sweetalert2';

export default function MyActivity() {
    const [id, setId] = useState('');
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const { authTokens } = useContext(AuthContext) || {};

    const baseURL = "http://127.0.0.1:8000/api";

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
        const fetchAcceptedRequests = async () => {
            try {
                const response = await axios.get(`${baseURL}/requests/request/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    const acceptedByUser = response.data.filter(req => req.acceptedBy === id);
                    setAcceptedRequests(acceptedByUser);
                }
            } catch (error) {
                swal.fire({
                    title: 'An Error Occurred while Fetching Accepted Requests',
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

        if (id) {
            fetchAcceptedRequests();
        }
    }, [id]);

    return (
        <div className="my-activity-page-container">
            <h1 className="achievements-heading">Thank You for Your Act of Kindness!</h1>
            <center className="achievements-container">
                {acceptedRequests.length > 0 ? (
                    acceptedRequests.map((req, index) => (
                        <div key={index} className="congratulation-msg-container">
                            <p>
                                We are immensely grateful for your recent blood donation. Your selfless act of kindness is a beacon of hope for those in need. By giving blood, you have made a profound difference in <span style={{ fontWeight: "700" }}>{req.recipientName}</span> life.Thank you for your generosity and compassion.
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No accepted requests yet.</p>
                )}
            </center>
        </div>
    )
}
