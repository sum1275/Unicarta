import React from "react";
import { Link } from "react-router-dom";

import "./HomeInfo.css";


function HomeInfo() {
  return (
    <article className="home-info">
      <div className="info-txt">
        <h2>
          Elevate your style with our exclusive designer collection, showcasing
          the pinnacle of fashion.
        </h2>
        <p>
          Explore a realm where luxury meets innovation, in our designer
          collection. Each creation is a blend of tradition and modernity,
          designed to accentuate your style with its distinctive elegance and
          allure. Embrace the essence of sophistication and make a statement
          that transcends the ordinary.
        </p>
      </div>
      <button className="explore-clothing_btn">
        <Link to="explore/all">Discover Our Products</Link>
      </button>
    </article>
  );
}

export default HomeInfo;
