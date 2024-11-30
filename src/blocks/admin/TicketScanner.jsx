import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

const TicketScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(onScanSuccess, onScanError);

    return () => {
      scanner.clear();
    };
  }, []);

  const onScanError = (err) => {
    console.warn(err);
  };

  const onScanSuccess = async (decodedText) => {
    try {
      const ticketData = JSON.parse(decodedText);
      setScanning(false);
      setScanResult(ticketData);

      // Query the ticket from Firestore
      const ticketsRef = collection(db, 'tickets');
      const q = query(ticketsRef, where('ticketId', '==', ticketData.ticketId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Invalid ticket - not found in database');
        return;
      }

      const ticketDoc = querySnapshot.docs[0];
      const ticket = ticketDoc.data();

      if (ticket.checkedIn) {
        setError('Ticket already checked in!');
        setTicketInfo(ticket);
        return;
      }

      // Verify event date
      const eventDate = new Date(ticket.eventDate);
      const today = new Date();
      if (eventDate.toDateString() !== today.toDateString()) {
        setError('Invalid date - event is scheduled for ' + eventDate.toLocaleDateString());
        return;
      }

      // Update ticket status
      await updateDoc(doc(db, 'tickets', ticketDoc.id), {
        checkedIn: true,
        checkInTime: new Date().toISOString()
      });

      setTicketInfo({
        ...ticket,
        checkedIn: true,
        checkInTime: new Date().toISOString()
      });
      setError(null);

    } catch (error) {
      console.error('Error processing ticket:', error);
      setError('Invalid QR code format');
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setTicketInfo(null);
    setError(null);
    setScanning(true);
  };

  return (
    <div className="ticket-scanner">
      <h1>Ticket Scanner</h1>
      
      {scanning && (
        <div id="reader"></div>
      )}

      {ticketInfo && (
        <div className="ticket-info">
          <h2>Ticket Information</h2>
          <div className={`status ${error ? 'error' : 'success'}`}>
            {error ? (
              <p className="error-message">{error}</p>
            ) : (
              <p className="success-message">✓ Successfully checked in!</p>
            )}
          </div>
          <div className="details">
            <p><strong>Name:</strong> {ticketInfo.name}</p>
            <p><strong>Event:</strong> {ticketInfo.eventName}</p>
            <p><strong>Ticket ID:</strong> {ticketInfo.ticketId}</p>
            <p><strong>Check-in Time:</strong> {
              ticketInfo.checkInTime 
                ? new Date(ticketInfo.checkInTime).toLocaleTimeString() 
                : 'Not checked in'
            }</p>
          </div>
          <button onClick={resetScanner}>Scan Next Ticket</button>
        </div>
      )}
    </div>
  );
};

export default TicketScanner; 