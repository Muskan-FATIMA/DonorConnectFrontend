import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2"

function Feedback() {

    const [recipient, setRecipient] = useState('');
    const [donor, setDonor] = useState('');
    const [thanksmsg, setThanksmsg] = useState('');

    const { sendFeedback } = useContext(AuthContext) || {};
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendFeedback(recipient, donor, thanksmsg);
            navigate('/');
        } catch (error) {
            console.error('Error sending feedback:', error);
            swal.fire({
                title: 'An Error Occurred while Sending Feedback',
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

    return (
        <>


            <div className="feedback-main-container">
                <h1 className="feedback-heading">Thanks! To Your Donor</h1>
                <form onSubmit={handleSubmit} className="feedback-form">

                    <label>Recipient name :</label>
                    <input
                        type="text"
                        name="recipient"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Enter recipient's fullname"
                    />
                    <label>Donor name :</label>
                    <input
                        type="text"
                        name="donor"
                        value={donor}
                        onChange={(e) => setDonor(e.target.value)}
                        placeholder="Enter donor's fullname"
                    />
                    <label>Say Thanks to your Donor :</label>
                    <textarea
                        className="feedback-msg-box"
                        type="text"
                        name="thanksmsg"
                        value={thanksmsg}
                        onChange={(e) => setThanksmsg(e.target.value)}
                        cols={20}
                        rows={10}
                        placeholder="Type something...."
                    />
                    <button type="submit" className="feedback-done-btn">
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default Feedback