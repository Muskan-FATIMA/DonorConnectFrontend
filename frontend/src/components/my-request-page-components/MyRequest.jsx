/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MyRequest() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [id, setId] = useState('');

    const [requestData, setRequestData] = useState([]);

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

    const [showFeedbackButton, setShowFeedbackButton] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFeedbackButton(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    const handleCloseButton = () => {
        setShowFeedbackButton(false);
    };

    return (
        <div className="req-main-container">
            <div className={`feedback-button-container ${showFeedbackButton ? 'show' : ''}`}>
                <button className="close-button" onClick={handleCloseButton}>×</button>
                <Link to="/feedback">
                    <button className="feedback-button">Give Feedback</button>
                </Link>
            </div>
            {requestData.length > 0 ? (
                <>
                    <h2 className='req-heading'>MY REQUESTS...</h2>
                    <div className="req-cards-container">
                        {requestData.map((req, index) => (
                            <div className="req-card" key={index}>
                                <div className="req-card-header">
                                    <h2>{req.recipientName}</h2>
                                    {req.acceptedBy && (
                                        <div className="accepted-badge">ACCEPTED</div>
                                    )}
                                </div>
                                <div className="req-card-body">
                                    <p><strong>Age:</strong> {req.recipientAge} yrs</p>
                                    <p><strong>Blood Group:</strong> {req.bldGrp}</p>
                                    <p><strong>Required Before:</strong> {moment(req.bldRequiredBeforeDate).format('DD/MM/YYYY')}</p>
                                    <p><strong>Contact:</strong> {req.contact}</p>
                                    <p><strong>Location:</strong> {req.bldDonationLocation}</p>
                                </div>
                                <div className="req-card-footer">
                                    {req.acceptedBy ? (
                                        <div className="req-card-btn" onClick={() => handleDelete(req.id)}>
                                            <DeleteIcon />
                                        </div>
                                    ) : (
                                        <>
                                            <div className="req-card-btn">
                                                <Link to="/add-request" state={{ req }}>
                                                    <EditIcon />
                                                </Link>
                                            </div>
                                            <div className="req-card-btn" onClick={() => handleDelete(req.id)}>
                                                <DeleteIcon />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className='if-empty'>
                    <p>No Requests Added!</p>
                </div>
            )}
        </div>
    )
}