import { useState, useEffect } from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';

const Contact = () => {

   useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top on mount
      document.title = 'The House of Cake | Contact';
    }, []); 
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const serviceID = 'service_8897zaj';    // Replace with your EmailJS service ID
    const templateID = 'template_6wueu1v';  // Replace with your EmailJS template ID
    const publicKey = '12YIitC-Fg4Xdir0l';    // Replace with your EmailJS public key

    // Add date and time to data sent to EmailJS
    const now = new Date();
    const dataToSend = {
      ...formData,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString()
    };

    emailjs.send(serviceID, templateID, dataToSend, publicKey)
      .then(() => {
        alert('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Email sending error:', error);
        alert('Failed to send message. Please try again.');
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="contact-form-container">
      <h1 className="contact-us-title">Contact US</h1>

      <div className="head-office">
        <h2>Head Office</h2>
        <div className="contact-info">
          <p>The House of Cake</p>
          <p>75/1, Magalegoda,</p>
          <p>Veyangoda.</p>
          <p>0704 063 548</p>
          {/* <p>0112 868 414</p> */}
          <p>thehouseofcake@gmail.com</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Your Name (required)</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Your Email (required)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message (required)</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSending}>
          {isSending ? 'Sending...' : 'SEND'}
        </button>
      </form>
    </div>
  );
};

export default Contact;
