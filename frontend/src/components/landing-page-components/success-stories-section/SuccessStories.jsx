/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import axios from "axios";
import swal from 'sweetalert2'


function SuccessStories() {

    const [feedback, setFeedback] = useState([])

    const baseURL = 'http://127.0.0.1:8000/api'

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await axios.get(`${baseURL}/feedbacks/feedback/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    const data = response.data;
                    setFeedback(data);
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
                swal.fire({
                    title: 'An Error Occurred while Fetching Feedbacks',
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

        fetchFeedback();
    }, []);

    return (
        <div id="success-stories" className="success-stories-main-container">
            <h1 className="success-stories-heading">Success Stories </h1>
            <div className="success-stories-card-container">
                <div className="success-stories-cardBox">
                    {
                        feedback.map((f, index) => (
                            <div key={index} className="success-stories-card">
                                <p className="feedback" >
                                    <i>"{f.thanksmsg}"</i>
                                    <p style={{ fontWeight: "bolder" }}>~ {f.recipient}</p>
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SuccessStories
