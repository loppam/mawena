import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="content">
        <div className="flex">
          <div className="left">
            <h1>We take care of your brand</h1>
            <p>We care about our work and we care about our clients.</p>
            <Link to="/admin" className="register">Register</Link>
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
