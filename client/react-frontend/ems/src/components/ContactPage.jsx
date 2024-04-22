// ContactPage.jsx
import { useState } from 'react';
import './ContactPage.css';

function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Prepare the data to send
        const contactData = {
            id: formData.id,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            message: formData.message
        };
    
        // Make the POST request
        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Contact data submitted successfully:', data);
            // Optionally, you can perform any actions after successful submission here
        })
        .catch(error => {
            console.error('There was a problem submitting contact data:', error);
            // Optionally, you can handle errors here
        });
    
        // Reset the form data
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            message: '',
        });
    };

    const openEmail = () => {
        window.open('mailto:group6@gmail.com', '_blank');
    };

    const openPhone = () => {
        window.open('tel:0712345678', '_blank');
    };

    const openGoogleMaps = () => {
        const latitude = -1.3003145828376408;
        const longitude = 36.78508949760624;
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        window.open(url, '_blank');
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <div className="contact-heading">
                    <p>Get in touch</p>
                    <h1>CONTACT US</h1>
                </div>
            </div>

            <div className='contact-bottom'>
                <div className="contact-message">
                    <h2>MESSAGE US</h2>
                    <p>Have a question or want to inquire about a custom piece? Simply drop us a message using the form below, and our dedicated team will get back to you as soon as possible.</p>
                    <p onClick={openPhone}><span className="fas fa-phone-alt" style={{ marginRight: '10px' , cursor: 'pointer'}}></span> 0712345678</p>
                    <p onClick={openEmail}><span className="fas fa-envelope" style={{ marginRight: '10px' , cursor: 'pointer'}}></span> group14@gmail.com</p>
                    <p onClick={openGoogleMaps}><span className="fas fa-map-marker-alt" style={{ marginRight: '10px' , cursor: 'pointer'}}></span> Ngong Lane, Along Ngong Road, Nairobi</p>
                </div>

                <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                        <div className='input-group'>
                            <input type='text' placeholder='First Name' name='firstName' value={formData.firstName} onChange={handleChange} />
                            <input type='text' placeholder='Last Name' name='lastName' value={formData.lastName} onChange={handleChange} />
                        </div>
                        <input type='email' placeholder='Email Address' name='email' value={formData.email} onChange={handleChange} />
                        <textarea name='message' value={formData.message} onChange={handleChange} />
                        <button type="submit" className="form-button" >
                            SEND
                        </button>
                    </form>
                </div>
            </div>
            <div className="map-container">
                <iframe
                    src='https://api.maptiler.com/maps/78063cdd-241c-4b04-aaec-beccccefd687/?key=7j83iJtIDI9g3Ef96r4W#14/-1.3003145828376408/36.78508949760624'
                    title='map'
                    width='100%'
                    height='400px'
                ></iframe>
            </div>
        </div>
    );
}

export default Contact;
