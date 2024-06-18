import { useEffect, useState } from "react";
import axios from "axios";
import swal from 'sweetalert2';


export default function Testimonials() {
    const [feedback, setFeedback] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const baseURL = 'http://127.0.0.1:8000';

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/feedbacks/feedback/`, {
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

    const cardsPerView = 3;
    const totalViews = Math.ceil(feedback.length / cardsPerView);

    const goToNext = () => {
        const newIndex = (currentIndex + 1) % totalViews;
        setCurrentIndex(newIndex);
    };

    const goToPrevious = () => {
        const newIndex = (currentIndex - 1 + totalViews) % totalViews;
        setCurrentIndex(newIndex);
    };

    const getVisibleFeedbacks = () => {
        const startIndex = currentIndex * cardsPerView;
        return feedback.slice(startIndex, startIndex + cardsPerView);
    };

    return (
        <div className="Testimonials-main-container">
            <h1 className="Testimonials-heading">Testimonials</h1>
            <p className="sub-heading">We value our community's feedback. Heartwarming messages from recipients, showcasing <br /> the positive impact our Donor Connect has made.</p>
            {feedback.length > 0 ? (
                <div className="carousel">
                    <button onClick={goToPrevious} className="carousel-control left">❮</button>
                    <div className="carousel-inner">
                        {getVisibleFeedbacks().map((f, index) => (
                            <div key={index} className="carousel-item active">
                                <div className="Testimonials-card">
                                    <p className="Testimonial-feedback">
                                        <p className="Testimonial-recp-msg">"{f.thanksmsg}"</p>
                                        <p className="Testimonial-recp-name
                                        ">~ {f.recipient}</p>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={goToNext} className="carousel-control right">❯</button>
                </div>
            ) : (
                <div className="if-empty">
                    <p>No Feedbacks Yet!</p>
                </div>
            )}
        </div>
    );
}
