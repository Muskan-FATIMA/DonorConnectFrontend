import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import swal from 'sweetalert2';

function ViewRequest() {
    const [id, setId] = useState('');
    const [requestData, setRequestData] = useState([]);
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
                    const requests = response.data.filter(req => req.user !== id);
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

    const handleAccept = async (requestId) => {
        try {
            const response = await axios.post(`${baseURL}/requests/request/${requestId}/accept/`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`,
                },
            });
            if (response.status === 200) {
                swal.fire({
                    title: 'Request Accepted Successfully',
                    icon: 'success',
                    toast: true,
                    timer: 2000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error accepting request:', error);
            swal.fire({
                title: 'An Error Occurred while Accepting Request',
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
            title: "Website Link Copied Successfully. \n \n Now paste it to whoever you want to share",
            icon: "success",
            toast: true,
            timer: 2000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        });
    }

    return (
        <>
            <div id="view-request" className="view-request-main-container">
                <div className="view-request-container">
                    {requestData.map((req, index) => (
                        <div className="view-request-cards" key={index}>
                            <div className="view-request-innertext">
                                <h2>{req.recipientName}</h2>
                                <h5> Location : {req.bldDonationLocation}</h5>
                                <h5>Blood Group : {req.bldGrp}</h5>
                                <h5>No of Units : {req.unitsNeeded} ml</h5>
                                <h5> Date :  {req.bldRequiredBeforeDate}</h5>
                                <h5> Time :  {req.bldRequiredBeforeTime}</h5>


                                <div className="view-request-cards-btn">
                                    {req.acceptedBy ? <p className="req-accepted">Accepted</p> : (
                                        <>
                                            <button className="view-request-accept-btn" onClick={() => handleAccept(req.id)}>
                                                <Link to='/request-accepted' state={{ req }}>Accept</Link>
                                            </button>
                                            <button className="view-request-share-btn" onClick={handleShare}>
                                                Share
                                            </button>
                                        </>

                                    )}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ViewRequest;
