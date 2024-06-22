/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function RequestAdded() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="request-added-container">
            <h1>Request Added Successfully!</h1>
            <p>All DonorConnect users have been notified!</p>
            <p>Please be patient as we hope a donor accepts soon.</p>
            <p>Once accepted, you will receive an email with the donor's contact details to arrange the donation.</p>
            <button className="request-added-btn"><Link to="/">OK</Link></button>
        </div>
    )
}
