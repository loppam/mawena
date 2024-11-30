import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
    price: 0,
    totalTickets: 0,
    ticketsRemaining: 0,
  });
  const [newInfluencer, setNewInfluencer] = useState({
    name: "",
    ticketAllocation: 0,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    const eventList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      influencers: doc.data().influencers || [],
    }));
    setEvents(eventList);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "events"), {
        ...newEvent,
        ticketsRemaining: newEvent.totalTickets,
        totalAllocated: 0,
        influencers: [],
        createdAt: new Date().toISOString(),
      });

      setEvents([
        ...events,
        {
          id: docRef.id,
          ...newEvent,
          totalAllocated: 0,
          influencers: [],
        },
      ]);
      setNewEvent({
        name: "",
        date: "",
        time: "",
        location: "",
        description: "",
        price: 0,
        totalTickets: 0,
        ticketsRemaining: 0,
      });
      alert("Event created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating event");
    }
  };

  const handleAddInfluencer = async (e) => {
    e.preventDefault();
    if (!selectedEvent || !selectedEvent.influencers) return;

    try {
      // Check if allocation exceeds total tickets
      const newTotalAllocated =
        (selectedEvent.totalAllocated || 0) + newInfluencer.ticketAllocation;
      if (newTotalAllocated > selectedEvent.totalTickets) {
        alert(
          `Cannot allocate more than total tickets (${
            selectedEvent.totalTickets
          }). Current total allocated: ${selectedEvent.totalAllocated || 0}`
        );
        return;
      }

      const eventRef = doc(db, "events", selectedEvent.id);
      const influencerData = {
        ...newInfluencer,
        registrationLink: `${window.location.origin}/register/${
          selectedEvent.id
        }/${Date.now()}`,
        ticketsRemaining: newInfluencer.ticketAllocation,
      };

      // Update influencers array and total allocated
      await updateDoc(eventRef, {
        influencers: [...selectedEvent.influencers, influencerData],
        totalAllocated: newTotalAllocated,
      });

      // Update local state
      const updatedEvents = events.map((event) => {
        if (event.id === selectedEvent.id) {
          return {
            ...event,
            influencers: [...event.influencers, influencerData],
            totalAllocated: newTotalAllocated,
          };
        }
        return event;
      });

      setEvents(updatedEvents);
      setSelectedEvent({
        ...selectedEvent,
        influencers: [...selectedEvent.influencers, influencerData],
        totalAllocated: newTotalAllocated,
      });

      setNewInfluencer({
        name: "",
        ticketAllocation: 0,
      });

      alert("Influencer added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding influencer");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      credentials.username.toLowerCase() ===
        import.meta.env.VITE_ADMIN_USERNAME.toLowerCase() &&
      credentials.password === import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          {error && <p className="status error">{error}</p>}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={credentials.username.toLowerCase()}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  username: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={credentials.password.toLowerCase()}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="full-width">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="content">
        <h1>Admin Dashboard</h1>

        {/* Create Event Form */}
        <div className="create-event">
          <h2>Create New Event</h2>
          <form onSubmit={handleCreateEvent}>
            <div className="form-group">
              <label htmlFor="eventName">Event Name</label>
              <input
                id="eventName"
                type="text"
                value={newEvent.name}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventDate">Date</label>
              <input
                id="eventDate"
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventTime">Time</label>
              <input
                id="eventTime"
                type="time"
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventLocation">Location</label>
              <input
                id="eventLocation"
                type="text"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="eventDescription">Description</label>
              <textarea
                id="eventDescription"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventPrice">Price</label>
              <input
                id="eventPrice"
                type="number"
                value={newEvent.price}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, price: Number(e.target.value) })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventTickets">Total Tickets</label>
              <input
                id="eventTickets"
                type="number"
                value={newEvent.totalTickets}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    totalTickets: Number(e.target.value),
                    ticketsRemaining: Number(e.target.value),
                  })
                }
                required
              />
            </div>

            <button type="submit" className="full-width">
              Create Event
            </button>
          </form>
        </div>

        {/* Event List */}
        <div className="event-list">
          <h2>Events</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Total Tickets</th>
                  <th>Allocated</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.name}</td>
                    <td>{new Date(event.date).toLocaleDateString()}</td>
                    <td>{event.location}</td>
                    <td>{event.totalTickets}</td>
                    <td>
                      {event.totalAllocated || 0}/{event.totalTickets}
                    </td>
                    <td>
                      <button onClick={() => setSelectedEvent(event)}>
                        Manage Influencers
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Influencer Form */}
        {selectedEvent && (
          <div className="add-influencer">
            <h2>Add Influencer to {selectedEvent.name}</h2>
            <form onSubmit={handleAddInfluencer}>
              <div className="form-group">
                <label htmlFor="influencerName">Influencer Name</label>
                <input
                  id="influencerName"
                  type="text"
                  value={newInfluencer.name}
                  onChange={(e) =>
                    setNewInfluencer({ ...newInfluencer, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="ticketAllocation">Ticket Allocation</label>
                <input
                  id="ticketAllocation"
                  type="number"
                  value={newInfluencer.ticketAllocation}
                  onChange={(e) =>
                    setNewInfluencer({
                      ...newInfluencer,
                      ticketAllocation: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <button type="submit" className="full-width">
                Add Influencer
              </button>
            </form>

            {/* Influencer List */}
            <div className="influencer-list">
              <h3>Event Influencers</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Tickets Left</th>
                    <th>Registration Link</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEvent.influencers.map((inf, index) => (
                    <tr key={index}>
                      <td>{inf.name}</td>
                      <td>
                        {inf.ticketsRemaining}/{inf.ticketAllocation}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(inf.registrationLink);
                            alert("Link copied!");
                          }}
                        >
                          Copy Link
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
