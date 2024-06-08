import { useLocation } from "react-router-dom";

export default function ShowDonorDetail() {
    const location = useLocation();
    const acceptedUser = location.state?.acceptedUser || null;

    if (!acceptedUser) {
        return <div>Request not found or invalid request.</div>;
    }
    return (
        <center>
            <br />
            <br />
            <h2>Accepted User (DONOR) Detail:</h2>
            <p>Full name: {acceptedUser.fullname}</p>
            <p>Contact: {acceptedUser.contact}</p>
            <br />
            <br />
        </center>
    )
}
