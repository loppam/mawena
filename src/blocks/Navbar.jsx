import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Scrolltosection from "./Scrolltosection";
const Navbar = () => {
  const [activeNav, setActiveNav] = useState(false);

  return (
    <div className={activeNav ? "closee navbar" : "menu navbar"}>
      <div className="flexx">
        <div className={activeNav ? "close trans" : "menu trans"}>MAWENA</div>
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
              className=""
              onClick={() => Scrolltosection("client")}
            >
              client
            </Link>
            <Link
              to="/#service"
              className=""
              onClick={() => Scrolltosection("service")}
            >
              Service
            </Link>
            <Link
              to="/#work"
              className=""
              onClick={() => Scrolltosection("work")}
            >
              work
            </Link>
            <Link
              to="/#team"
              className=""
              onClick={() => Scrolltosection("team")}
            >
              team
            </Link>
            <Link
              to="/#contactUs"
              className=""
              onClick={() => Scrolltosection("contact")}
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
