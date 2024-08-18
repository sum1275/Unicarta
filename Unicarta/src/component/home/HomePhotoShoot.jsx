import React from "react";
import "./HomePhotoShoot.css";

function HomePhotoShoot() {
  return (
    <div className="photoshoot-container">
      <span className="model-photo_wrapper boy">
        <img src="/images/home-photo-1.webp" className="model-photo" alt="model photograph" />
      </span>
      <span className="model-photo_wrapper boy">
        <img src="/images/home-photo-2.jpg" className="model-photo" alt="model photograph" />
      </span>
      <span className="model-photo_wrapper female">
        <img src="/images/home-photo-3.jpg" className="model-photo" alt="model photograph" />
      </span>
    </div>
  );
}

export default HomePhotoShoot;
