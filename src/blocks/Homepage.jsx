import React from "react";
import { motion } from "framer-motion";
const Homepage = () => {
  return (
    <div className="homepage">
      <div className="content">
        <div className="flex">
          <div className="left">
            <h1>We take care of your brand</h1>
            <p>We care about our work and we care about our clients.</p>
            <button className="register">Register </button>
          </div>
          <div className="right">
            <img src="headimg.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
