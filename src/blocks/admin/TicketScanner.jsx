import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { db } from "../../firebase/config";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const TicketScanner = () => {
  const [ticketInfo, setTicketInfo] = useState(null);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [scannerStatus, setScannerStatus] = useState(
    "Place a QR code in front of the camera"
  );

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 10,
      aspectRatio: 1.0,
      showTorchButtonIfSupported: true,
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      rememberLastUsedCamera: true,
    });

    scanner.render(
      (result) => handleScan({ text: result }),
      (error) => {
        if (!error.includes("No MultiFormat Readers")) {
          handleError(error);
        }
      }
    );

    return () => {
      scanner.clear();
    };
  }, []);

  const handleScan = async (result) => {
    if (result) {
      try {
        setScannerStatus("Processing ticket...");
        const ticketData = JSON.parse(result?.text);
        setScanning(false);

        // Query the ticket from Firestore
        const ticketsRef = collection(db, "tickets");
        const q = query(
          ticketsRef,
          where("ticketId", "==", ticketData.ticketId)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("Invalid ticket - not found in database");
          return;
        }

        const ticketDoc = querySnapshot.docs[0];
        const ticket = ticketDoc.data();

        if (ticket.checkedIn) {
          setError("Ticket already checked in!");
          setTicketInfo(ticket);
          return;
        }

        // Verify event date
        const eventDate = new Date(ticket.eventDate);
        const today = new Date();
        if (eventDate.toDateString() !== today.toDateString()) {
          setError(
            "Invalid date - event is scheduled for " +
              eventDate.toLocaleDateString()
          );
          return;
        }

        // Update ticket status
        await updateDoc(doc(db, "tickets", ticketDoc.id), {
          checkedIn: true,
          checkInTime: new Date().toISOString(),
        });

        setTicketInfo({
          ...ticket,
          checkedIn: true,
          checkInTime: new Date().toISOString(),
        });
        setError(null);
      } catch (error) {
        console.error("Error processing ticket:", error);
        setError("Invalid QR code format");
      }
    }
  };

  const handleError = (error) => {
    console.error(error);
    setError("Error accessing camera");
  };

  const resetScanner = () => {
    setTicketInfo(null);
    setError(null);
    setScanning(true);
    setScannerStatus("Place a QR code in front of the camera");
  };

  return (
    <div className="ticket-scanner">
      <h1>Ticket Scanner</h1>

      <div className={`scanner-container ${!scanning ? "hidden" : ""}`}>
        <div className="scanner-instructions">
          <p>Please ensure:</p>
          <ul>
            <li>The QR code is well-lit</li>
            <li>The QR code is centered in the frame</li>
            <li>Your camera is focused on the code</li>
            <li>The code is about 6-8 inches from the camera</li>
          </ul>
        </div>
        <div id="reader"></div>
      </div>

      {ticketInfo && (
        <div className="ticket-info">
          <h2>Ticket Information</h2>
          <div className={`status ${error ? "error" : "success"}`}>
            {error ? (
              <p className="error-message">{error}</p>
            ) : (
              <p className="success-message">✓ Successfully checked in!</p>
            )}
          </div>
          <div className="details">
            <p>
              <strong>Name:</strong> {ticketInfo.name}
            </p>
            <p>
              <strong>Event:</strong> {ticketInfo.eventName}
            </p>
            <p>
              <strong>Ticket ID:</strong> {ticketInfo.ticketId}
            </p>
            <p>
              <strong>Check-in Time:</strong>{" "}
              {ticketInfo.checkInTime
                ? new Date(ticketInfo.checkInTime).toLocaleTimeString()
                : "Not checked in"}
            </p>
          </div>
          <button onClick={resetScanner} className="reset-button">
            Scan Next Ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketScanner;
