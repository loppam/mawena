import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Scrolltosection from "./Scrolltosection";
const Navbar = () => {
  const [activeNav, setActiveNav] = useState(false);

  return (
    <div className={activeNav ? "closee navbar" : "menu navbar"}>
      <div className="flexx">
        <div className={activeNav ? "close trans" : "menu trans"}>
          <img src="/logo.png" alt="" />
          AWENA</div>
        {activeNav ? (
          <button onClick={() => setActiveNav(false)}>Close</button>
        ) : (
          <button onClick={() => setActiveNav(true)}>Menu</button>
        )}
      </div>
      <div>
        {activeNav && (
          <div className="links">
            <Link
              to="/#client"
              onClick={() => { Scrolltosection("client"); setActiveNav(false); }}
            >
              client
            </Link>
            <Link
              to="/#service"
              onClick={() => { Scrolltosection("service"); setActiveNav(false); }}
            >
              Service
            </Link>
            <Link
              to="/#work"
              onClick={() => { Scrolltosection("work"); setActiveNav(false); }}
            >
              work
            </Link>
            <Link
              to="/#team"
              onClick={() => { Scrolltosection("team"); setActiveNav(false); }}
            >
              team
            </Link>
            <Link
              to="/#contactUs"
              onClick={() => { Scrolltosection("contact"); setActiveNav(false); }}
            >
              contact us
            </Link>
          </div>
        )}
      </div>
      <div className={`cr ${activeNav}`}>
        2024 © MAWENA. All rights reserved
      </div>
    </div>
  );
};

export default Navbar;
