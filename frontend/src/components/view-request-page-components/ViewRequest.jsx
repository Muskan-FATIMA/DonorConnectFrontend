import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import swal from 'sweetalert2';

export default function ViewRequest() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [id, setId] = useState('');

    const [requestData, setRequestData] = useState([]);

    const [loadingStates, setLoadingStates] = useState({});

    const { authTokens } = useContext(AuthContext) || {};


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
                    const requests = response.data.filter(req => req.user !== id);
                    setRequestData(requests);
                }
            } catch (error) {
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


    const handleAccept = async (requestId) => {
        setLoadingStates(prev => ({ ...prev, [requestId]: true }));
        try {
            const response = await axios.post(`${baseURL}/api/requests/request/${requestId}/accept/`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`
                },
            });
            if (response.status === 200) {
                swal.fire({
                    title: `Request Accepted Successfully, Please check your email for recipient's full details`,
                    icon: 'success',
                    toast: true,
                    timer: 2000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                setRequestData(prevData =>
                    prevData.map(req =>
                        req.id === requestId ? { ...req, acceptedBy: id } : req
                    )
                );
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error accepting request:', error);
            swal.fire({
                title: 'An Error Occurred while Accepting Request',
                icon: 'error',
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
        finally {
            setLoadingStates(prev => ({ ...prev, [requestId]: false }));
        }
    };

    return (
        <div className="req-main-container">
            {requestData.length > 0 ? (
                <>
                    <h2 className="req-heading">REQUESTS...</h2>
                    <div className="req-cards-container">
                        {requestData.map((req, index) => (
                            <div className="req-card" key={index}>
                                <div className="req-card-header">
                                    <h2>{req.recipientName}</h2>
                                </div>
                                <div className="req-card-body">
                                    <p> <strong>Blood Group :</strong>  {req.bldGrp}</p>
                                    <p><strong>Required Before :</strong> {req.bldRequiredBeforeDate}</p>
                                    <p><strong>Location :</strong> {req.bldDonationLocation}</p>
                                </div>
                                <div className="req-card-footer">
                                    {req.acceptedBy ? (
                                        <div className="accepted-badge">ACCEPTED</div>
                                    ) : (
                                        <>
                                            {loadingStates[req.id] && <div style={{ textAlign: "center", color: "black" }}>Please wait...</div>}

                                            <button className="view-card-btn" onClick={() => handleAccept(req.id)}>
                                                ACCEPT
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="if-empty">
                    <p>No Requests Yet !</p>
                </div>
            )
            }
        </div >
    );
}
