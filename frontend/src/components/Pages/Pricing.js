import React from 'react';
import './LandingPage.css';
import './Pricing.css';

const Pricing = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo">iDID</div>
        <nav className="navigation">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/pricing">Pricing</a>
        </nav>
      </header>
      <main className="landing-content">
        <div className="pricing-container">
          <h1>Simple, Transparent Pricing</h1>
          <div className="pricing-cards">
            <div className="pricing-card">
              <h2>Annual Plan</h2>
              <div className="price">$20</div>
              <div className="period">per year</div>
              <ul className="features">
                <li>✓ Unlimited Achievement Tracking</li>
                <li>✓ Progress Analytics</li>
                <li>✓ Export Your Data</li>
                <li>✓ Priority Support</li>
              </ul>
              <button className="primary-button">Choose Annual</button>
            </div>

            <div className="pricing-card featured">
              <div className="best-value">Best Value</div>
              <h2>Lifetime Access</h2>
              <div className="price">$60</div>
              <div className="period">one-time payment</div>
              <ul className="features">
                <li>✓ Everything in Annual Plan</li>
                <li>✓ Lifetime Updates</li>
                <li>✓ Premium Features</li>
                <li>✓ VIP Support</li>
              </ul>
              <button className="primary-button">Get Lifetime Access</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;

