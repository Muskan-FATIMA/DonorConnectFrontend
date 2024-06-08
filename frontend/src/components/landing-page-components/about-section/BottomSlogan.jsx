import { useState, useEffect } from "react";
import { quotes } from "./quotes";

export default function BottomSlogan() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="about-section-bottom-slogan">
            <div
                className="about-section-carousel"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {quotes.map((quote, index) => (
                    <div className="quotation" key={index}>
                        <p>{quote}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
