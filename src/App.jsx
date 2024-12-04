import "./App.css";
import Clientele from "./blocks/Clientele";
import Homepage from "./blocks/Homepage";
import Navbar from "./blocks/Navbar";
import Team from "./blocks/Team";
import WhatWeDo from "./blocks/WhatWeDo";
import WhatWeveDone from "./blocks/WhatWeveDone";
import Contact from "./blocks/Contact";
import Dashboard from './blocks/admin/Dashboard';
import { Routes, Route, useLocation } from 'react-router-dom';
import TicketRegister from './blocks/TicketRegister';
import TicketScanner from './blocks/admin/TicketScanner';
import TicketList from './blocks/admin/TicketList';

function App() {
  const location = useLocation();
  const showNavbar = !location.pathname.includes('/register/');

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/scanner" element={<TicketScanner />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/register/:eventId/:influencerTimestamp" element={<TicketRegister />} />
        <Route path="/" element={
          <>
            <section id="homepage">
              <Homepage />
            </section>
            <section id="client">
              <Clientele />
            </section>
            <section id="service">
              <WhatWeDo />
            </section>
            <section id="work">
              <WhatWeveDone />
            </section>
            <section id="team">
              <Team />
            </section>
            <section id="contact">
              <Contact />
            </section>
          </>
        } />
      </Routes>
    </>
  );
}

export default App;
