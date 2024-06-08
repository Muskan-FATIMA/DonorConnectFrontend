
function Contact() {
    return (
        <>
            <div className="contact-main-container">
                <h1 className="contact-heading">Drop Us a Message!</h1>
                <form className="contact-form">

                    <label>Name</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your name"
                    />
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter Email-id"
                    />
                    <label>Message</label>
                    <textarea
                        className="contact-msg-box"
                        type="text"
                        name="msg"
                        cols={20}
                        rows={10}
                        placeholder="Type something...."
                    />
                    <button type="submit" className="contact-send-btn">
                        Send
                    </button>
                </form>
            </div>
        </>
    )
}

export default Contact