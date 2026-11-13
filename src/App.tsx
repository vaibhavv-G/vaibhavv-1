/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Services } from './components/Services.tsx';
import { Projects } from './components/Projects.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-[#0F172A] selection:bg-[#2563EB]/20 selection:text-[#0F172A]">
      <Navbar />

      <main id="main-content">
        <Hero />
        <Services onSelectService={(service) => setSelectedService(service)} />
        <Projects />
        <Contact selectedService={selectedService} />
      </main>

      <Footer />
    </div>
  );
}
