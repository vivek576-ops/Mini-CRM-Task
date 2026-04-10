import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', service: 'General Consultation' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://mini-crm-task-production.up.railway.app/api/leads", {
        ...formData,
        source: "Clinic Website" 
      });
      setSuccess(true);
    } catch (err) {
      alert("Error: Ensure your CRM Backend is running!");
    }
  };

  // Smooth Scroll Function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="clinic-site">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo" onClick={() => scrollToSection('home')}>🦷 SmileCare Dental</div>
        <div className="nav-links">
          <span onClick={() => scrollToSection('home')}>Home</span>
          <span onClick={() => scrollToSection('treatments')}>Treatments</span>
          <span onClick={() => scrollToSection('contact-info')}>Contact</span>
        </div>
      </nav>

      {/* HERO SECTION (HOME) */}
      <header id="home" className="hero">
        <div className="hero-text">
          <h1>Modern Dentistry <br/> for a Brighter Smile</h1>
          <p>Experience world-class dental care with our expert specialists.</p>
        </div>

        <div className="booking-card">
          {success ? (
            <div className="success-screen">
              <h2>🎉 Appointment Requested!</h2>
              <p>Our team will call you within 24 hours.</p>
              <button className="btn-submit" onClick={() => setSuccess(false)}>Book Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3>Request Consultation</h3>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" placeholder="Your Name" required 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="email@example.com" required 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Select Treatment</label>
                <select onChange={(e) => setFormData({...formData, service: e.target.value})}>
                  <option value="General Consultation">General Consultation</option>
                  <option value="Teeth Whitening">Teeth Whitening</option>
                  <option value="Dental Braces">Dental Braces</option>
                  <option value="Root Canal">Root Canal</option>
                </select>
              </div>
              <button type="submit" className="btn-submit">Confirm Booking</button>
            </form>
          )}
        </div>
      </header>

      {/* TREATMENTS SECTION */}
      <section id="treatments" className="services-section">
        <h2 className="section-title">Our Specialized Treatments</h2>
        <div className="services-grid">
          <div className="service-item">
            <span className="service-icon">🦷</span>
            <h3>Orthodontics</h3>
            <p>Invisible and traditional braces to align your perfect smile.</p>
          </div>
          <div className="service-item">
            <span className="service-icon">✨</span>
            <h3>Teeth Whitening</h3>
            <p>Remove stains and brighten your smile with our laser technology.</p>
          </div>
          <div className="service-item">
            <span className="service-icon">🛡️</span>
            <h3>Family Care</h3>
            <p>Routine checkups and cleaning for kids and adults.</p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact-info" className="contact-section">
        <h2 className="section-title">Visit Our Clinic</h2>
        <div className="contact-grid">
          <div className="contact-card">
            <div className="icon">📞</div>
            <h3>Phone</h3>
            <p>+91 7032118129</p>
          </div>
          <div className="contact-card">
            <div className="icon">📧</div>
            <h3>Email</h3>
            <p>cliniccare@smilecare.com</p>
          </div>
          <div className="contact-card">
            <div className="icon">📍</div>
            <h3>Location</h3>
            <p>Dental Street, Hyderabad</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 SmileCare Dental Clinic. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;