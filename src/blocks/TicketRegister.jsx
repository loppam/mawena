import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { QRCodeSVG } from "qrcode.react";

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

  useEffect(() => {
    const fetchEventAndInfluencerDetails = async () => {
      try {
        const eventRef = doc(db, "events", eventId);
        const eventSnap = await getDoc(eventRef);

        if (eventSnap.exists()) {
          const eventData = eventSnap.data();
          setEventDetails(eventData);

          const influencer = eventData.influencers.find(
            (inf) => inf.registrationLink.includes(influencerTimestamp)
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
    return `${eventDetails.name.substring(0, 3).toUpperCase()}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (influencerDetails.ticketsRemaining <= 0) {
        alert("Sorry, all tickets have been claimed!");
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

      // Create ticket document
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

      // Set ticket data for QR code display
      setTicketData(ticket);
      setShowTicket(true);

      // Reset form
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const TicketDisplay = ({ ticket }) => {
    const ticketInfo = JSON.stringify({
      ticketId: ticket.ticketId,
      name: ticket.name,
      event: ticket.eventName,
      date: ticket.eventDate,
      location: ticket.eventLocation,
      description: ticket.eventDescription,
      checkedIn: ticket.checkedIn,
    });

    return (
      <div className="ticket-display">
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
          <QRCodeSVG
            value={ticketInfo}
            size={256}
            level="H"
            includeMargin={true}
          />
        </div>
        <button onClick={() => window.print()} className="print-button">
          Print Ticket
        </button>
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
        <p>Event Date: {new Date(eventDetails.date).toLocaleDateString()}</p>
        <p>Location: {eventDetails.location}</p>
        <p>Description: {eventDetails.description}</p>
        <p>Tickets Remaining: {influencerDetails.ticketsRemaining}</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
          <button type="submit">Register for Event</button>
        </form>
      </div>
    </div>
  );
};

export default TicketRegister;
