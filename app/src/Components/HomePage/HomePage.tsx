import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

// Import images
import image1 from '../../asstes/images/feature-image1.png';
import image2 from '../../asstes/images/feature-image2.png';
import image3 from '../../asstes/images/feature-image3.png';
import header_image from '../../asstes/images/header-image.png';

const HomePage: React.FC = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleStartNow = (): void => {
    navigate('/login'); // Navigate to the Login page
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-left">
          <h1>Welcome to Prepwise</h1>
          <p>The best GRE Preparation Tool</p>
          <p>Your journey to success starts here!</p>
          <button onClick={handleStartNow} className="cta-button">
            Start Now
          </button>
        </div>
        <div className="hero-right">
          <img src={header_image} alt="GRE Preparation" className="hero-image" />
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>

        <div className="image-cards">
          <img src={image1} alt="Feature 1" className="feature-image" />
          <img src={image2} alt="Feature 2" className="feature-image" />
          <img src={image3} alt="Feature 3" className="feature-image" />
        </div>

        <div className="feature-cards">
          <div className="feature-card">
            <h3>Accessible</h3>
            <p><ul>
              <li>Study on your own with self-study prep or on-demand classes</li>
              <li>Email assistance whenever require</li>
              <li>Take it anywhere, anytime with our mobile apps or desktop</li>
              </ul></p>
          </div>
          <div className="feature-card">
            <h3>Effective</h3>
            <p><ul>
              <li>Top-quality study materials continually updated based on previous students answers</li>
              <li>Smart feedback and progress tracking to turn your weaknesses into strengths</li>
              </ul></p>
          </div>
          <div className="feature-card">
            <h3>Affordable</h3>
            <p>Unbeatable price in test prep: ¼ the price of competitors</p>
          </div>

          <div className="feature-card">
            <h3>Comprehensive Practice</h3>
            <p>Access thousands of questions tailored to your GRE goals.</p>
          </div>
          <div className="feature-card">
            <h3>Expert Insights</h3>
            <p>Learn from detailed explanations and expert tips.</p>
          </div>
          <div className="feature-card">
            <h3>Track Your Progress</h3>
            <p>Monitor your performance and see your growth over time.</p>
          </div>
        </div>
      </section>

      <section className="reviews">
        <h2>What Our Users Say</h2>
        <div className="review-cards">
          <div className="review-card">
            <p>"Prepwise was a game-changer for my GRE prep. The practice questions and progress tracking really helped me stay on top of my goals!"</p>
            <h4>- John Doe</h4>
            <div className="rating">⭐⭐⭐⭐⭐</div>
          </div>
          <div className="review-card">
            <p>"The detailed explanations for each question were amazing! I felt more confident walking into the exam thanks to Prepwise."</p>
            <h4>- Jane Smith</h4>
            <div className="rating">⭐⭐⭐⭐⭐</div>
          </div>
          <div className="review-card">
            <p>"I love the mobile app! I could study anytime, anywhere. Prepwise made it so easy to fit studying into my busy schedule."</p>
            <h4>- Mark Wilson</h4>
            <div className="rating">⭐⭐⭐⭐</div>
          </div>
        </div>
      </section>

      <section className="premium">
        <div className="premium-left">
          <h2>Unlock Premium Features</h2>
          <p>
            Take your GRE preparation to the next level with Prepwise Premium.
            Get exclusive access to advanced practice questions, personalized
            study plans, and more!
          </p>
        </div>
        <div className="premium-right">
          <button /*onClick={handleGoToPremium}*/ className="premium-button">
            Go Premium
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 GRE Prep Master. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;