import { useLocation } from "react-router-dom";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

export default function ShowDonorDetail() {
    const location = useLocation();
    const acceptedUser = location.state?.acceptedUser || null;
    if (!acceptedUser) {
        return <div>Request not found or invalid request.</div>;
    }
    return (
        <div className="donor-detail-main-container">
            <h2 className="donor-detail-heading">Donor Details</h2>
            <div className="donor-detail-container">
                <p>Name : {acceptedUser.fullname}</p>
                <p>Age : {acceptedUser.age}</p>
                <p>Gender : {acceptedUser.gender}</p>
                <p>Blood Group : {acceptedUser.bldGrp}</p>
                <p>Address : {acceptedUser.address}</p>
                <p>Contact : {acceptedUser.contact}</p>
            </div>
            <div className="suggestion">
                <p>Contact the donor using above information. <ArrowCircleUpIcon /></p>
            </div>
        </div>
    )
}
