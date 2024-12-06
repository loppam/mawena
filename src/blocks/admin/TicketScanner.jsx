import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { db } from "../../firebase/config";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const TicketScanner = () => {
  const [ticketInfo, setTicketInfo] = useState(null);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [scannerStatus, setScannerStatus] = useState("Place a QR code in front of the camera");
  const [manualTicketId, setManualTicketId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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

        await processTicket(ticketData.ticketId);
      } catch (error) {
        console.error("Error processing ticket:", error);
        setError("Invalid QR code format");
      }
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setTicketInfo(null);
    setIsProcessing(true);

    try {
      await processTicket(`BLTP-${manualTicketId}`);
      setManualTicketId("");
    } catch (err) {
      setError("Error processing ticket: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const processTicket = async (ticketId) => {
    const ticketsRef = collection(db, "tickets");
    const q = query(ticketsRef, where("ticketId", "==", ticketId));
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
      <h1>Ticket Check-in</h1>

      <div className="manual-input">
        <form onSubmit={handleManualSubmit}>
          <input
            type="text"
            value={`BLTP-${manualTicketId}`}
            onChange={(e) => {
              const value = e.target.value.replace('BLTP-', '').toUpperCase();
              setManualTicketId(value);
            }}
            placeholder="BLTP-XXXX"
            required
            disabled={isProcessing}
          />
          <button type="submit" disabled={isProcessing || !manualTicketId}>
            {isProcessing ? "Processing..." : "Check In"}
          </button>
        </form>
      </div>

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

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {ticketInfo && (
        <div className="ticket-info">
          <h2>Ticket Information</h2>
          <p><strong>Name:</strong> {ticketInfo.name}</p>
          <p><strong>Event:</strong> {ticketInfo.eventName}</p>
          <p><strong>Ticket ID:</strong> {ticketInfo.ticketId}</p>
          <p>
            <strong>Status: </strong>
            <span className={`status-badge ${ticketInfo.checkedIn ? "status-checked-in" : "status-not-checked-in"}`}>
              {ticketInfo.checkedIn ? "Checked In" : "Not Checked In"}
            </span>
          </p>
          {ticketInfo.checkedIn && ticketInfo.checkInTime && (
            <p><strong>Check-in Time:</strong> {new Date(ticketInfo.checkInTime).toLocaleTimeString()}</p>
          )}
          <button onClick={resetScanner} className="reset-button">
            Scan Next Ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketScanner;
