import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { QRCodeSVG } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TicketRegister = () => {
  const { eventId, influencerTimestamp } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [influencerDetails, setInfluencerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTicket, setShowTicket] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchEventAndInfluencerDetails = async () => {
      try {
        const eventRef = doc(db, "events", eventId);
        const eventSnap = await getDoc(eventRef);

        if (eventSnap.exists()) {
          const eventData = eventSnap.data();
          setEventDetails(eventData);

          const influencer = eventData.influencers.find((inf) =>
            inf.registrationLink.includes(influencerTimestamp)
          );

          if (influencer) {
            setInfluencerDetails(influencer);
          } else {
            throw new Error("Influencer not found");
          }
        } else {
          throw new Error("Event not found");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndInfluencerDetails();
  }, [eventId, influencerTimestamp]);

  const generateTicketId = () => {
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `BLTP-${randomStr}`;
  };

  const checkExistingRegistration = async (email) => {
    try {
      const ticketsRef = collection(db, "tickets");
      const q = query(
        ticketsRef,
        where("email", "==", email),
        where("eventId", "==", eventId)
      );

      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking registration:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const isRegistered = await checkExistingRegistration(formData.email);

      if (isRegistered) {
        setError("This email has already been registered for this event!");
        return;
      }

      if (influencerDetails.ticketsRemaining <= 0) {
        setError("Sorry, all tickets have been claimed!");
        return;
      }

      const ticketId = generateTicketId();

      const ticket = {
        ...formData,
        ticketId,
        eventId,
        influencerId: influencerTimestamp,
        eventName: eventDetails.name,
        eventDate: eventDetails.date,
        eventLocation: eventDetails.location,
        eventDescription: eventDetails.description,
        registeredAt: new Date().toISOString(),
        checkedIn: false,
      };
      await addDoc(collection(db, "tickets"), ticket);

      // Update remaining tickets for influencer
      const eventRef = doc(db, "events", eventId);
      const updatedInfluencers = eventDetails.influencers.map((inf) => {
        if (inf.registrationLink.includes(influencerTimestamp)) {
          return { ...inf, ticketsRemaining: inf.ticketsRemaining - 1 };
        }
        return inf;
      });

      await updateDoc(eventRef, { influencers: updatedInfluencers });

      // Set success message and show ticket
      setSuccess("Registration successful!");
      setTicketData(ticket);
      setShowTicket(true);

      // Reset form
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error:", error);
      setError("Registration failed. Please try again.");
    }
  };

  const TicketDisplay = ({ ticket }) => {
    const [showDownloadButton, setShowDownloadButton] = useState(true);
    
    const ticketInfo = JSON.stringify({
      ticketId: ticket.ticketId,
      name: ticket.name,
      event: ticket.eventName,
      date: ticket.eventDate,
      location: ticket.eventLocation,
      description: ticket.eventDescription,
      checkedIn: ticket.checkedIn,
    });

    const downloadTicket = async () => {
      try {
        // Hide the button immediately before capturing
        setShowDownloadButton(false);
        
        // Wait a tiny bit for the button to disappear from DOM
        await new Promise(resolve => setTimeout(resolve, 100));

        const ticketElement = document.querySelector(".ticket-display");
        const scale = window.innerWidth <= 768 ? 1 : 2;

        const canvas = await html2canvas(ticketElement, {
          scale: scale,
          logging: false,
          useCORS: true,
          windowWidth: ticketElement.scrollWidth,
          windowHeight: ticketElement.scrollHeight,
          height: ticketElement.scrollHeight,
          width: ticketElement.scrollWidth,
          backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        const xOffset = (pdfWidth - imgWidth * ratio) / 2;
        const yOffset = (pdfHeight - imgHeight * ratio) / 2;

        pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`${ticket.eventName}-${ticket.ticketId}.pdf`);
        
        // Hide the button after successful download
        setShowDownloadButton(false);
      } catch (error) {
        console.error("Error generating PDF:", error);
        // Show the button again if there's an error
        setShowDownloadButton(true);
      }
    };

    return (
      <div className="ticket-display" style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        boxSizing: "border-box",
      }}>
        <h2>Your Ticket</h2>
        <div className="ticket-details">
          <p><strong>Name:</strong> {ticket.name}</p>
          <p><strong>Event:</strong> {ticket.eventName}</p>
          <p><strong>Date:</strong> {new Date(ticket.eventDate).toLocaleDateString()}</p>
          <p><strong>Location:</strong> {ticket.eventLocation}</p>
          <p><strong>Description:</strong> {ticket.eventDescription}</p>
          <p><strong>Ticket ID:</strong> {ticket.ticketId}</p>
        </div>
        <div className="qr-code">
          <QRCodeSVG value={ticketInfo} size={256} level="H" includeMargin={true} />
        </div>
        {showDownloadButton && (
          <button onClick={downloadTicket} className="print-button">
            Download Ticket
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!eventDetails || !influencerDetails) {
    return <div>Event or Influencer not found</div>;
  }

  if (showTicket && ticketData) {
    return <TicketDisplay ticket={ticketData} />;
  }

  return (
    <div className="ticket-register">
      <div className="content">
        <h1>{eventDetails.name}</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <p>Event Date: {new Date(eventDetails.date).toLocaleDateString()}</p>
        <p>Location: {eventDetails.location}</p>
        <p>Description: {eventDetails.description}</p>
{/*         //<p>Tickets Remaining: {influencerDetails.ticketsRemaining}</p> */}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
          <button type="submit">Register for Event</button>
        </form>
      </div>
    </div>
  );
};

export default TicketRegister;
