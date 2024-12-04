import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import { FaMusic } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { GiFactory } from "react-icons/gi";
import { MdStorefront } from "react-icons/md";
import { RiUserStarLine } from "react-icons/ri";
import { Link } from "react-router-dom";
const WhatWeveDone = () => {
  return (
    <div className="whatwevedone">
      <div className="content">
        <div className="vflex_wwd">
          <div className="left">
            <h3>our work</h3>
            <h1>What we've done!</h1>
            <p>
              "To become West Africa's leading experiential marketing and event
              management agency"
            </p>
          </div>
          <div className="right">
            <div className="vcards">
              <a
                href="https://www.instagram.com/theyard.ng/"
                target="_BLANK"
                className="vcard"
              >
                <div className="vcontentt">
                  <AiOutlineCalendar size={30} />
                  <h2>The Yard</h2>
                  <p>click me</p>
                </div>
              </a>
              <a
                href="https://www.instagram.com/bimilikestoparty/"
                target="_BLANK"
                className="vcard"
              >
                <div className="vcontentt">
                  <BiNews size={30} />
                  <h2>BLTP</h2>
                  <p>click me</p>
                </div>
              </a>
              <a
                href="https://www.instagram.com/the_nysccamprave/"
                target="_BLANK"
                className="vcard"
              >
                <div className="vcontentt">
                  <FaMusic size={30} />
                  <h2>NYSC</h2>
                  <p>click me</p>
                </div>
              </a>
              <a
                href="https://www.instagram.com/mawena_resources/"
                target="_BLANK"
                className="vcard"
              >
                <div className="vcontentt">
                  <MdCampaign size={30} />
                  <h2>Many More</h2>
                  <p>click me</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeveDone;
