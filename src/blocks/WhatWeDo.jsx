import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import { FaMusic } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { GiFactory } from "react-icons/gi";
import { MdStorefront } from "react-icons/md";
import { RiUserStarLine } from "react-icons/ri";

const WhatWeDo = () => {
  return (
    <div className="whatwedo">
      <div className="content">
        <div className="flex_wwd">
          <div className="left">
            <h3>our services</h3>
            <h1>What we do?</h1>
            <p>
              "We empower brands to create unforgettable experiences through
              innovative event solutions"
            </p>
          </div>
          <div className="right">
            <ul className="cards">
              <li className="card">
                <div className="contentt">
                  <AiOutlineCalendar size={30} />
                  <h2>Events</h2>
                  <p>
                    Crafting unique events that engage, inspire, and leave
                    lasting impressions.
                  </p>
                </div>
              </li>
              <li className="card">
                <div className="contentt">
                  <BiNews size={30} />
                  <h2>PR</h2>
                  <p>
                    Shaping brand narratives through strategic public relations
                    and media engagement.
                  </p>
                </div>
              </li>
              <li className="card">
                <div className="contentt">
                  <FaMusic size={30} />
                  <h2>Headliner concert</h2>
                  <p>
                    Organizing star-studded concerts that captivate audiences.
                  </p>
                </div>
              </li>
              <li className="card">
                <div className="contentt">
                  <MdCampaign size={30} />
                  <h2>Brand Activation</h2>
                  <p>
                    Bringing brands to life through immersive and interactive
                    experiences.
                  </p>
                </div>
              </li>
              <li className="card">
                <div className="contentt">
                  <AiOutlineVideoCamera size={30} />
                  <h2>Visual Production</h2>
                  <p>Delivering stunning visuals for events and campaigns.</p>
                </div>
              </li>
              <li className="card">
                <div className="contentt">
                  <GiFactory size={30} />
                  <h2>Fabrication & Production</h2>
                  <p>Creating custom-built designs and event installations.</p>
                </div>
              </li>
              <li className="card">
                <div className="contentt">
                  <RiUserStarLine size={30} />
                  <h2>Talent booking</h2>
                  <p>
                    Connecting events with top talent for unforgettable
                    performances.
                  </p>
                </div>
              </li>
              <li className="card">
                <div className="contentt">
                  <MdStorefront size={30} /> <h2>Outlet makeover</h2>
                  <p>
                    Transforming retail spaces to enhance brand identity and
                    appeal.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
