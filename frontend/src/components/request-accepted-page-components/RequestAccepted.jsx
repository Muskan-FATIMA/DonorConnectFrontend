import { useLocation } from "react-router-dom";
import swal from "sweetalert2"

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
    <center>
      <h1>Well Done! You have accepted this request:</h1>
      {console.log(req)}
      <p>Recipient Name: {req.recipientName}</p>
      <p>Blood Donation Location: {req.bldDonationLocation}</p>
      <p>Blood Required Before (Date): {req.bldRequiredBeforeDate}</p>
      <p>Blood Required Before (Time): {req.bldRequiredBeforeTime}</p>
      <p>Blood Group Required: {req.bldGrp}</p>
      <p>No of Units needed: {req.unitsNeeded} ml</p>
      <p>Contact Number: {req.contact}</p>
      <p>Message from recipient: {req.reason}</p>
    </center>
  );
}
