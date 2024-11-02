import React from "react";
import GooglePhotosSlider from "./GooglePhotosSlider";
const Team = () => {
  return (
    <div className="team">
      <div className="content">
        <div className="flex_wwd">
          <h3>our team</h3>
          <h1>Meet the people</h1>
          <p>"this is the team that makes all possible"</p>
        </div>
        <div className="card-holder">
          <div className="cardd">
            <div className="card-photo bimi"></div>
            <div className="card-title">
              BIG BIMI <br />
              <span>Premium Hypeman/Host</span>
            </div>
            <div className="card-socials">
              <a
                href="https://www.instagram.com/bigbimi/"
                target="_BLANK"
                className="card-socials-btn instagram"
              >
                <svg
                  height="24"
                  width="24"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 300 300"
                  className="icon"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g id="XMLID_504_">
                      <path
                        id="XMLID_505_"
                        d="M38.52,0.012h222.978C282.682,0.012,300,17.336,300,38.52v222.978
        c0,21.178-17.318,38.49-38.502,38.49H38.52c-21.184,0-38.52-17.313-38.52-38.49V38.52
        C0,17.336,17.336,0.012,38.52,0.012z M218.546,33.329c-7.438,0-13.505,6.091-13.505,13.525
        v32.314c0,7.437,6.067,13.514,13.505,13.514h33.903c7.426,0,13.506-6.077,13.506-13.514
        V46.854c0-7.434-6.08-13.525-13.506-13.525H218.546z M266.084,126.868h-26.396
        c2.503,8.175,3.86,16.796,3.86,25.759c0,49.882-41.766,90.34-93.266,90.34
        c-51.487,0-93.254-40.458-93.254-90.34c0-8.963,1.37-17.584,3.861-25.759H33.35v126.732
        c0,6.563,5.359,11.902,11.916,11.902h208.907c6.563,0,11.911-5.339,11.911-11.902
        V126.868z M150.283,90.978c-33.26,0-60.24,26.128-60.24,58.388c0,32.227,26.98,58.375,60.24,58.375
        c33.278,0,60.259-26.148,60.259-58.375C210.542,117.105,183.561,90.978,150.283,90.978z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </a>
              <a href="" target="_BLANK" className="card-socials-btn github">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                    ></path>
                  </g>
                </svg>
              </a>
              <a href="" target="_BLANK" className="card-socials-btn linkedin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="512"
                  viewBox="0 0 512 512"
                  height="512"
                >
                  <path d="m51.326 185.85h90.011v270.872h-90.011zm45.608-130.572c-30.807 0-50.934 20.225-50.934 46.771 0 26 19.538 46.813 49.756 46.813h.574c31.396 0 50.948-20.814 50.948-46.813-.589-26.546-19.551-46.771-50.344-46.771zm265.405 124.209c-47.779 0-69.184 26.28-81.125 44.71v-38.347h-90.038c1.192 25.411 0 270.872 0 270.872h90.038v-151.274c0-8.102.589-16.174 2.958-21.978 6.519-16.174 21.333-32.923 46.182-32.923 32.602 0 45.622 24.851 45.622 61.248v144.926h90.024v-155.323c0-83.199-44.402-121.911-103.661-121.911z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="cardd">
            <div className="card-photo silas"></div>
            <div className="card-title">
              MR. SILAS <br />
              <span>That one Guy</span>
            </div>
            <div className="card-socials">
              <a href="" target="_BLANK" className="card-socials-btn facebook">
                <svg
                  height="24"
                  width="24"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 300 300"
                  className="icon"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g id="XMLID_504_">
                      <path
                        id="XMLID_505_"
                        d="M38.52,0.012h222.978C282.682,0.012,300,17.336,300,38.52v222.978
        c0,21.178-17.318,38.49-38.502,38.49H38.52c-21.184,0-38.52-17.313-38.52-38.49V38.52
        C0,17.336,17.336,0.012,38.52,0.012z M218.546,33.329c-7.438,0-13.505,6.091-13.505,13.525
        v32.314c0,7.437,6.067,13.514,13.505,13.514h33.903c7.426,0,13.506-6.077,13.506-13.514
        V46.854c0-7.434-6.08-13.525-13.506-13.525H218.546z M266.084,126.868h-26.396
        c2.503,8.175,3.86,16.796,3.86,25.759c0,49.882-41.766,90.34-93.266,90.34
        c-51.487,0-93.254-40.458-93.254-90.34c0-8.963,1.37-17.584,3.861-25.759H33.35v126.732
        c0,6.563,5.359,11.902,11.916,11.902h208.907c6.563,0,11.911-5.339,11.911-11.902
        V126.868z M150.283,90.978c-33.26,0-60.24,26.128-60.24,58.388c0,32.227,26.98,58.375,60.24,58.375
        c33.278,0,60.259-26.148,60.259-58.375C210.542,117.105,183.561,90.978,150.283,90.978z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </a>
              <a href="" target="_BLANK" className="card-socials-btn github">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                    ></path>
                  </g>
                </svg>
              </a>
              <a href="" target="_BLANK" className="card-socials-btn linkedin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="512"
                  viewBox="0 0 512 512"
                  height="512"
                >
                  <path d="m51.326 185.85h90.011v270.872h-90.011zm45.608-130.572c-30.807 0-50.934 20.225-50.934 46.771 0 26 19.538 46.813 49.756 46.813h.574c31.396 0 50.948-20.814 50.948-46.813-.589-26.546-19.551-46.771-50.344-46.771zm265.405 124.209c-47.779 0-69.184 26.28-81.125 44.71v-38.347h-90.038c1.192 25.411 0 270.872 0 270.872h90.038v-151.274c0-8.102.589-16.174 2.958-21.978 6.519-16.174 21.333-32.923 46.182-32.923 32.602 0 45.622 24.851 45.622 61.248v144.926h90.024v-155.323c0-83.199-44.402-121.911-103.661-121.911z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="cardd">
            <div className="card-photo trend"></div>
            <div className="card-title">
              TREND <br />
              <span>Creative Director</span>
            </div>
            <div className="card-socials">
              <a href="" target="_BLANK" className="card-socials-btn facebook">
                <svg
                  height="24"
                  width="24"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 300 300"
                  className="icon"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g id="XMLID_504_">
                      <path
                        id="XMLID_505_"
                        d="M38.52,0.012h222.978C282.682,0.012,300,17.336,300,38.52v222.978
        c0,21.178-17.318,38.49-38.502,38.49H38.52c-21.184,0-38.52-17.313-38.52-38.49V38.52
        C0,17.336,17.336,0.012,38.52,0.012z M218.546,33.329c-7.438,0-13.505,6.091-13.505,13.525
        v32.314c0,7.437,6.067,13.514,13.505,13.514h33.903c7.426,0,13.506-6.077,13.506-13.514
        V46.854c0-7.434-6.08-13.525-13.506-13.525H218.546z M266.084,126.868h-26.396
        c2.503,8.175,3.86,16.796,3.86,25.759c0,49.882-41.766,90.34-93.266,90.34
        c-51.487,0-93.254-40.458-93.254-90.34c0-8.963,1.37-17.584,3.861-25.759H33.35v126.732
        c0,6.563,5.359,11.902,11.916,11.902h208.907c6.563,0,11.911-5.339,11.911-11.902
        V126.868z M150.283,90.978c-33.26,0-60.24,26.128-60.24,58.388c0,32.227,26.98,58.375,60.24,58.375
        c33.278,0,60.259-26.148,60.259-58.375C210.542,117.105,183.561,90.978,150.283,90.978z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </a>
              <a href="" target="_BLANK" className="card-socials-btn github">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                    ></path>
                  </g>
                </svg>
              </a>
              <a href="" target="_BLANK" className="card-socials-btn linkedin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="512"
                  viewBox="0 0 512 512"
                  height="512"
                >
                  <path d="m51.326 185.85h90.011v270.872h-90.011zm45.608-130.572c-30.807 0-50.934 20.225-50.934 46.771 0 26 19.538 46.813 49.756 46.813h.574c31.396 0 50.948-20.814 50.948-46.813-.589-26.546-19.551-46.771-50.344-46.771zm265.405 124.209c-47.779 0-69.184 26.28-81.125 44.71v-38.347h-90.038c1.192 25.411 0 270.872 0 270.872h90.038v-151.274c0-8.102.589-16.174 2.958-21.978 6.519-16.174 21.333-32.923 46.182-32.923 32.602 0 45.622 24.851 45.622 61.248v144.926h90.024v-155.323c0-83.199-44.402-121.911-103.661-121.911z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="gallery">
          <div className="gallery_flex">
            <div className="left">
              <h1>You want pictures?</h1>
              <p>We don't just promise the vibe, we surely deliver</p>
              <p>just check our gallery evidence choke</p>
            </div>
            <div className="right">
              <GooglePhotosSlider />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
