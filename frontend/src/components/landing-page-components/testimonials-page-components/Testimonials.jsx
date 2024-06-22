/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Footer from "../../footer/Footer"

export default function Testimonials() {

    const [feedback, setFeedback] = useState([])

    const [currentIndex, setCurrentIndex] = useState(0);

    const baseURL = 'https://donorconnect.pythonanywhere.com'

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
            }
        };

        fetchFeedback();
    }, []);

    const [cardsPerView, setCardsPerView] = useState(3);
    const totalViews = feedback.length - cardsPerView + 1;

    const goToNext = useCallback(() => {
        const newIndex = (currentIndex + 1) % totalViews;
        setCurrentIndex(newIndex);
    }, [currentIndex, totalViews]);

    const goToPrevious = () => {
        const newIndex = (currentIndex - 1 + totalViews) % totalViews;
        setCurrentIndex(newIndex);
    };

    const getVisibleFeedbacks = () => {
        return feedback.slice(currentIndex, currentIndex + cardsPerView);

    };

    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 5000);
        return () => clearInterval(interval);
    }, [goToNext]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCardsPerView(1);
            } else if (window.innerWidth < 992) {
                setCardsPerView(2);
            } else {
                setCardsPerView(3);
            }
        };

        handleResize(); // Set initial value based on current screen size
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <>
            <div className="Testimonials-main-container">
                <h1 className="Testimonials-heading">Voices of Gratitude</h1>
                <p className="sub-heading">We value our community's feedback. Heartwarming messages from recipients, showcasing the positive impact Donor Connect has made.</p>
                {feedback.length > 0 ? (
                    <div className="carousel">
                        <button onClick={goToPrevious} className="carousel-control left">❮</button>
                        <div className="carousel-inner-container">
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
                            <div className="carousel-dots">
                                {Array.from({ length: totalViews }).map((_, index) => (
                                    <span
                                        key={index}
                                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentIndex(index)}
                                    ></span>
                                ))}
                            </div>
                        </div>
                        <button onClick={goToNext} className="carousel-control right">❯</button>

                    </div>
                ) : (
                    <div className="if-empty">
                        <p>No Feedbacks Yet!</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}