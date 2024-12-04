import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const ticketsRef = collection(db, "tickets");
      const querySnapshot = await getDocs(ticketsRef);
      const ticketList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTickets(ticketList);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setError("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter(ticket => 
    ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading tickets...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="ticket-list">
      <h1>All Tickets</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, email, or ticket ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Event</th>
              <th>Status</th>
              <th>Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.ticketId}</td>
                <td>{ticket.name}</td>
                <td>{ticket.email}</td>
                <td>{ticket.phone}</td>
                <td>{ticket.eventName}</td>
                <td>
                  <span className={`status-badge ${ticket.checkedIn ? "status-checked-in" : "status-not-checked-in"}`}>
                    {ticket.checkedIn ? "Checked In" : "Not Checked In"}
                  </span>
                </td>
                <td>{new Date(ticket.registeredAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="ticket-stats">
        <p>Total Tickets: {tickets.length}</p>
        <p>Checked In: {tickets.filter(t => t.checkedIn).length}</p>
        <p>Not Checked In: {tickets.filter(t => !t.checkedIn).length}</p>
      </div>
    </div>
  );
};

export default TicketList; 