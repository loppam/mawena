import React, { useState, useEffect } from "react";

const GooglePhotosSlider = () => {
  const [photos, setPhotos] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    // Load the Google API and authenticate automatically when the component mounts
    const authenticate = () => {
      window.gapi.load("client:auth2", () => {
        window.gapi.auth2
          .init({
            client_id: "YOUR_CLIENT_ID_HERE",
            scope: "https://www.googleapis.com/auth/photoslibrary.readonly",
          })
          .then(() => {
            window.gapi.auth2.getAuthInstance().signIn().then(loadPhotos);
          });
      });
    };

    // Load the Google API library
    const loadGapi = () => {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = authenticate;
      document.body.appendChild(script);
    };

    loadGapi(); // Call the function to load the Google API
  }, []);

  const loadPhotos = () => {
    window.gapi.client.load("photoslibrary", "v1", () => {
      window.gapi.client.photoslibrary.mediaItems
        .list({ pageSize: 10 })
        .then((response) => {
          const photos = response.result.mediaItems;
          setPhotos(photos || []);
        });
    });
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const previousSlide = () => {
    setCurrentSlideIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };

  return (
    <div>
      <div className="slider-container">
        {photos.length > 0 && (
          <>
            <img
              src={photos[currentSlideIndex].baseUrl}
              alt={photos[currentSlideIndex].filename}
              className="slide"
              style={{ display: "block", width: "100%", borderRadius: "8px" }}
            />
            <div className="slider-buttons">
              <button onClick={previousSlide}>❮</button>
              <button onClick={nextSlide}>❯</button>
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        .slider-container {
          position: relative;
          max-width: 600px;
          margin: auto;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        .slider-buttons {
          position: absolute;
          top: 50%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          transform: translateY(-50%);
        }
        .slider-buttons button {
          background-color: rgba(0, 0, 0, 0.5);
          border: none;
          color: white;
          padding: 10px;
          cursor: pointer;
        }
        .slider-buttons button:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </div>
  );
};

export default GooglePhotosSlider;
