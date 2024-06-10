/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function MyRequest() {

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

    const baseURL = "http://127.0.0.1:8000/api";

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const response = await axios.get(`${baseURL}/requests/request/`, {
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
            fetchRequest();
        }
    }, [id]);

    const handleShowAcceptedUser = async (acceptedBy) => {
        try {
            const response = await axios.get(`${baseURL}/profiles/profile/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const accepted = response.data.find(i => i.user === acceptedBy);
                setAcceptedUser(accepted);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            swal.fire({
                title: 'An Error Occurred while Fetching User Info',
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

    useEffect(() => {
        if (acceptedUser) {
            navigate('/show-donor-detail', { state: { acceptedUser } });
        }
    }, [acceptedUser]);

    const handleDelete = async (deleteId) => {
        try {
            const response = await axios.delete(`${baseURL}/requests/request/${deleteId}/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 204) {
                const updatedRequests = requestData.filter(req => req.id !== deleteId);
                setRequestData(updatedRequests);
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

    function handleShare() {
        const link = "http://localhost:5173/";
        navigator.clipboard.writeText(link);
        swal.fire({
            title: "Website Link Copied Successfully.",
            icon: "success",
            toast: true,
            timer: 2000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        });
    }

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
        <div className="my-requests-main-container">
            <div className="my-requests-container">
                {requestData.map((req, index) => (
                    <div className="my-requests-cards" key={index}>

                        <div className="my-req-innertext">

                            <h2>{req.recipientName}</h2>

                            <h5>Date : {req.bldRequiredBeforeDate}</h5>
                            <h5>Time : {req.bldRequiredBeforeTime}</h5>
                            <h5>Blood Group : {req.bldGrp}</h5>
                            <h5>No of Units : {req.unitsNeeded} ml</h5>
                            <h5>Location : {req.bldDonationLocation}</h5>
                            <h5>Contact Number : {req.contact}</h5>
                            <h5>Message : "{req.reason}"</h5>

                            {/* {isExpired(req) && handleDelete(req.id)} */}

                            {req.acceptedBy ? (
                                <button className='user-details-btn' onClick={() => handleShowAcceptedUser(req.acceptedBy)}>
                                    Request accepted <br /> Click for details.
                                </button>
                            )
                                :
                                (
                                    <div className="my-requests-cards-btn">
                                        <button className="my-requests-delete-btn">
                                            <Link to="/add-request" state={{ req }}>
                                                Edit
                                            </Link>
                                        </button>

                                        <button className="my-requests-delete-btn" onClick={() => handleDelete(req.id)}>
                                            Delete
                                        </button>
                                        <button className="my-requests-share-btn" onClick={handleShare}>
                                            Share
                                        </button>
                                    </div>
                                )}


                        </div>
                    </div>
                ))}
            </div>
        </div >

    )
}
