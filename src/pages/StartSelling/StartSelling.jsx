import React, { useState } from 'react';
import './StartSelling.scss';

const StartSelling = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="start-selling-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-video-container">
          <video className="hero-video" autoPlay muted loop>
            <source src="./media/cover_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="hero-content">
          <h1>Work Your Way</h1>
          <p>You bring the skill. We’ll make earning easy.</p>
          <button className="cta-button">Become a Seller</button>
        </div>
      </section>

      {/* Freelancer Showcase */}
      <section className="freelancer-showcase">
        <h2>Join our growing freelance community</h2>
        <div className="freelancer-grid">
          <div className="freelancer-card">I am a Designer</div>
          <div className="freelancer-card">I am a Developer</div>
          <div className="freelancer-card">I am a Writer</div>
          <div className="freelancer-card">I am a Video Editor</div>
          <div className="freelancer-card">I am a Musician</div>
          <div className="freelancer-card">I am a Voiceover Artist</div>
          <div className="freelancer-card">I am a Social Media Marketer</div>
          <div className="freelancer-card cta">What's Your Skill? Become a Seller</div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How it works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Create a Gig</h3>
            <p>Sign up for free, set up your Gig, and offer your work to our global audience.</p>
          </div>
          <div className="step">
            <h3>2. Deliver great work</h3>
            <p>Get notified when you get an order and use our system to discuss details with customers.</p>
          </div>
          <div className="step">
            <h3>3. Get paid</h3>
            <p>Get paid on time, every time. Payment is available for withdrawal as soon as it clears.</p>
          </div>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="promo-section">
        <h2>On-demand professional courses</h2>
        <p>Discover what it takes to be a top-notch seller on Ruhnix with this complimentary Learn from Ruhnix course.</p>
        <button className="cta-button">Learn More</button>
      </section>

      {/* Buyer Stories */}
      <section className="buyer-stories">
        <h2>Buyer stories</h2>
        <div className="stories-grid">
          <div className="story-card">
            <p>"People love our logo, and we love Ruhnix."</p>
            <h4>Jennifer Gore, CEO of Weleet</h4>
          </div>
          <div className="story-card">
            <p>"Ruhnix is an amazing resource for anyone in the startup space."</p>
            <h4>Adam Mashaal, CEO of Mashfeed</h4>
          </div>
        </div>
      </section>

      {/* Q&A Section */}
      <section className="faq-section">
        <h2>Q&A</h2>
        <div className="faq">
          {[
            { question: "What can I sell?", answer: "You can sell any service that fits into one of our categories." },
            { question: "How much money can I make?", answer: "Your earnings depend on the service you provide and the quality of your work." },
            { question: "How much does it cost?", answer: "Ruhnix takes a 20% commission on your earnings." },
          ].map((faq, index) => (
            <div key={index} className="faq-item">
              <h3 onClick={() => toggleFAQ(index)}>{faq.question}</h3>
              {openFAQ === index && <p>{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <h2>Sign up and create your first Gig today</h2>
        <button className="cta-button">Get Started</button>
      </section>
    </div>
  );
};

export default StartSelling;
