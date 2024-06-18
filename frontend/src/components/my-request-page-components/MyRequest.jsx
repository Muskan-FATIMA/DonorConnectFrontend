
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function MyRequest() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [id, setId] = useState('');

    const [requestData, setRequestData] = useState([]);
    const [acceptedUser, setAcceptedUser] = useState(null);

    const { authTokens } = useContext(AuthContext) || {};

    const navigate = useNavigate();

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

    const baseURL = "http://127.0.0.1:8000";

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/requests/request/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    const requests = response.data.filter(req => req.user === id);
                    setRequestData(requests);
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
                swal.fire({
                    title: 'An Error Occurred while Fetching Requests',
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
            fetchRequest();
        }
    }, [id]);



    useEffect(() => {
        if (acceptedUser) {
            navigate('/show-donor-detail', { state: { acceptedUser } });
        }
    }, [acceptedUser]);

    const handleDelete = async (deleteId) => {
        try {
            const response = await axios.delete(`${baseURL}/api/requests/request/${deleteId}/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 204) {
                const updatedRequests = requestData.filter(req => req.id !== deleteId);
                setRequestData(updatedRequests);
                navigate("/feedback")
                swal.fire({
                    title: 'Request Deleted Successfully',
                    icon: 'success',
                    toast: true,
                    timer: 2000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error('Error deleting request:', error);
            swal.fire({
                title: 'An Error Occurred while Deleting Request',
                icon: 'error',
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };


    const handleDeleteExpiredRequests = () => {
        requestData.forEach(req => {
            if (isExpired(req)) {
                handleDelete(req.id);
            }
        });
    };

    useEffect(() => {
        handleDeleteExpiredRequests();
    }, [requestData]);

    const isExpired = (req) => {
        const now = moment();
        const expiryDate = moment(`${req.bldRequiredBeforeDate} ${req.bldRequiredBeforeTime}`, 'YYYY-MM-DD HH:mm:ss');
        return now.isAfter(expiryDate);
    }

    return (
        <div className="req-main-container">
            {requestData.length > 0 ? (
                <>
                    <h2 className='req-heading'>MY REQUESTS...</h2>
                    <div className="req-container">
                        {requestData.map((req, index) => (
                            <div className="req-card" key={index}>
                                <div className="req-card-innertext">
                                    {req.acceptedBy &&
                                        <div className="accepted-badge">ACCEPTED</div>
                                    }
                                    <h2>{req.recipientName}</h2>
                                    <p>Age : {req.recipientAge} yrs</p>

                                    <p>Blood Group : {req.bldGrp}</p>
                                    <p>Date : {req.bldRequiredBeforeDate}</p>
                                    <p>Contact : {req.contact}</p>
                                    <p>Location : {req.bldDonationLocation}</p>

                                    {req.acceptedBy ? (
                                        <div className="req-card-btn-container">

                                            <button className="req-card-btn" onClick={() => handleDelete(req.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="req-card-btn-container">
                                            <button className="req-card-btn">
                                                <Link to="/add-request" state={{ req }}>
                                                    Edit
                                                </Link>
                                            </button>
                                            <button className="req-card-btn" onClick={() => handleDelete(req.id)}>
                                                Delete
                                            </button>

                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className='if-empty'>
                    <p> No Requests Added !</p>
                </div>
            )}
        </div>

    )
}