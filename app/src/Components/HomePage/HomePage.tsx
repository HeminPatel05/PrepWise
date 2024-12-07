import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./HomePage.css";

// Import images
import image1 from "../../asstes/images/feature-image1.png";
import image2 from "../../asstes/images/feature-image2.png";
import image3 from "../../asstes/images/feature-image3.png";
import header_image from "../../asstes/images/header-image.png";
import { getUser } from "../../services/api";

const HomePage: React.FC = () => {
  const navigate = useNavigate(); // React Router hook for navigation
  const { t } = useTranslation();
  const user_id = "6750e4745e277a332f4f8515";
  const [isPremium, setIsPremium] = useState<Boolean>(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = (await getUser({ user_id })).data.premiumUser; // Resolve the promise
        console.log("homepage user.data:", response); // Log JSON data
        setIsPremium(response); // Store JSON data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user_id]);

  const handleStartNow = (): void => {
    navigate("/login"); // Navigate to the Login page
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-left">
          <h1>{t("home.hero.title")}</h1>
          <p>{t("home.hero.subtitle1")}</p>
          <p>{t("home.hero.subtitle2")}</p>
          <button onClick={handleStartNow} className="cta-button">
            {t("home.hero.cta")}
          </button>
        </div>
        <div className="hero-right">
          <img
            src={header_image}
            alt={t("home.hero.imageAlt")}
            className="hero-image"
          />
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>{t("home.features.title")}</h2>

        <div className="image-cards">
          <img
            src={image1}
            alt={t("home.features.alt.feature1")}
            className="feature-image"
          />
          <img
            src={image2}
            alt={t("home.features.alt.feature2")}
            className="feature-image"
          />
          <img
            src={image3}
            alt={t("home.features.alt.feature3")}
            className="feature-image"
          />
        </div>

        <div className="feature-cards">
          <div className="feature-card">
            <h3>{t("home.features.accessible.title")}</h3>
            <p>
              <ul>
                <li>{t("home.features.accessible.point1")}</li>
                <li>{t("home.features.accessible.point2")}</li>
                <li>{t("home.features.accessible.point3")}</li>
              </ul>
            </p>
          </div>
          <div className="feature-card">
            <h3>{t("home.features.effective.title")}</h3>
            <p>
              <ul>
                <li>{t("home.features.effective.point1")}</li>
                <li>{t("home.features.effective.point2")}</li>
              </ul>
            </p>
          </div>
          <div className="feature-card">
            <h3>{t("home.features.affordable.title")}</h3>
            <p>{t("home.features.affordable.description")}</p>
          </div>

          <div className="feature-card">
            <h3>{t("home.features.comprehensive.title")}</h3>
            <p>{t("home.features.comprehensive.description")}</p>
          </div>
          <div className="feature-card">
            <h3>{t("home.features.expert.title")}</h3>
            <p>{t("home.features.expert.description")}</p>
          </div>
          <div className="feature-card">
            <h3>{t("home.features.progress.title")}</h3>
            <p>{t("home.features.progress.description")}</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews">
  <h2>{t("home.reviews.title")}</h2>
  <div className="review-cards">
    <div className="review-card">
      <p>{t("home.reviews.review1.text")}</p>
      <h4>{t("home.reviews.review1.author")}</h4>
      <div className="rating">{t("home.reviews.review1.rating")}</div>
    </div>
    <div className="review-card">
      <p>{t("home.reviews.review2.text")}</p>
      <h4>{t("home.reviews.review2.author")}</h4>
      <div className="rating">{t("home.reviews.review2.rating")}</div>
    </div>
    <div className="review-card">
      <p>{t("home.reviews.review3.text")}</p>
      <h4>{t("home.reviews.review3.author")}</h4>
      <div className="rating">{t("home.reviews.review3.rating")}</div>
    </div>
  </div>
</section>


      {/* Premium Section */}
      <section className="premium">
        <div className="premium-left">
          <h2>{t("home.premium.title")}</h2>
          <p>{t("home.premium.description")}</p>
        </div>
        <div className="premium-right">
          <button className="premium-button">
            {t("home.premium.cta")}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>{t("home.footer.text")}</p>
      </footer>
    </div>
  );
};

export default HomePage;
