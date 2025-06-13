import React, { useContext, useState } from 'react';
import context from '@/context/context';

const Contact = () => {
    const a = useContext(context);
    const submitcontactform = a.submitcontactform;

    // Initializing state for form fields
    const [state, setState] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        message: ''
    });

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        submitcontactform(state);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className="container contact-container my-5">
            <form onSubmit={handleSubmitForm} className='contact-form '>
                <div className="input-items-group">
                    <div className="form-group">
                        <input type="text" required className="form-control" name="name" value={state.name} onChange={handleInputChange} placeholder="Enter your name" />
                    </div>
                    <div className="form-group">
                        <input type="tel" className="form-control" name="phone" value={state.phone} onChange={handleInputChange} placeholder="Enter your phone number" />
                    </div>
                </div>
                <div className="input-items-group">
                    <div className="form-group">
                        <input type="email" required className="form-control" name="email" value={state.email} onChange={handleInputChange} placeholder="Enter your email address" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="address" value={state.address} onChange={handleInputChange} placeholder="Enter your address" />
                    </div>
                </div>
                <div className="form-group">
                    <textarea style={{ resize: "none" }} required className="form-control" rows={6} name="message" value={state.message} onChange={handleInputChange} placeholder="Enter your message"></textarea>
                </div>
                <button type="submit" className="btn btn-contact">Submit</button>
            </form>
            <div className="contact-content">
                <span>We would love to hear from you!</span>
                <h1>Contact Us</h1>
                <p>For all inquiries or issues, please fill out the form. Even if it is a silly question about shoe size. </p>
                <br />
                <p>We will respond within the hour directly to the contact number and email address you provided.</p>
            </div>
        </div>
    )
}

export default Contact;
