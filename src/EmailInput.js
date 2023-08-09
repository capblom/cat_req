import React, { useState } from "react"

const EmailInput = ({ checkEmail }) => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState(''); // State to manage the error message

    const validateEmail = (email) => {
        // Regular expression to check the structure of the email
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailPattern.test(email);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Check if email is not blank and valid
        if (email.trim() === '' || !validateEmail(email)) {
            setError('Please enter a valid email address.'); // Set error message
            return; // Stop further execution
        }

        setError(''); // Clear any existing error message
        checkEmail(email);
    };

    return (
        <div className="wrapper">
            <div className="container" id="ei-container">
                <h2>REQUEST A CATLOGUE</h2>
                <p>To request your FREE copy of our Autumn 2023 Bulb Catalogue, please enter your email address below</p>
                <form className="email-input-form" onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br /><br />
                    {error && <p className="error-message">{error}</p>} {/* Show error message if any */}
                    <button type="submit">SUBMIT</button>
                </form>
            </div>
        </div>
    );
};

export default EmailInput;
