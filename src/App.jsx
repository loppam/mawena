import "./App.css";
import Clientele from "./blocks/Clientele";
import Homepage from "./blocks/Homepage";
import Navbar from "./blocks/Navbar";
import Team from "./blocks/Team";
import WhatWeDo from "./blocks/WhatWeDo";
import WhatWeveDone from "./blocks/WhatWeveDone";
import Contact from "./blocks/Contact";
function App() {
  return (
    <>
      <Navbar />
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
  );
}

export default App;
