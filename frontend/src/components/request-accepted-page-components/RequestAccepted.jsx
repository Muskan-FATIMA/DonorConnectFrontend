import { useLocation } from "react-router-dom";
import swal from "sweetalert2"
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

export default function RequestAccepted() {

  const location = useLocation();
  const req = location.state?.req || null;

  if (!req) {
    return <div>Request not found or invalid request.</div>;
  }

  swal.fire({
    title: "You have just accepted a request. \n\n Now kindly contact to this person.",
    icon: "success",
    toast: true,
    timer: 2000,
    position: 'top-right',
    timerProgressBar: true,
    showConfirmButton: false,
  });

  return (
    <div className="req-accepted-main-container">
      <h1 className="req-accepted-heading">Recipient Details</h1>
      <div className="req-accepted-details-container">
        <p>Name : {req.recipientName}</p>
        <p>Location : {req.bldDonationLocation}</p>
        <p>Contact : {req.contact}</p>
        <p>Blood Group Required : {req.bldGrp}</p>
        <p>No of Units needed : {req.unitsNeeded} ml</p>
        <p style={{ textDecoration: "underline" }}>Blood Required Before :</p> <p> (Date) : {req.bldRequiredBeforeDate} <br />(Time) : {req.bldRequiredBeforeTime}</p>
        <div className="recipient-msg-box">  <p>Message : <br /> <div className="recipient-msg-box-innertext">{req.reason}</div> </p></div>
      </div>
      <div className="accepted-suggestion">
        <p>Contact the recipient using above information. <ArrowCircleUpIcon /></p>
      </div>
    </div>
  );
}
