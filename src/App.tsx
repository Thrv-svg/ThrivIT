/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IsometricShowcaseSection } from './components/IsometricShowcaseSection';
import { WhatWeDoBento } from './components/WhatWeDoBento';
import { CheckOurWork } from './components/CheckOurWork';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PosSimulatorModal } from './components/PosSimulatorModal';
import { ScheduleMeetingModal } from './components/ScheduleMeetingModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { Language, PricingPackage, PortfolioProject, AuthUser } from './types';
import { DEMO_USERS } from './data/mockData';

export default function App() {
  const [language, setLanguage] = useState<Language>('id');
  const [posModalOpen, setPosModalOpen] = useState(false);
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [selectedPackageName, setSelectedPackageName] = useState<string>('Paket Premium + Sistem PoS — Rp 1.680.000 (Hemat 50%)');

  // Client Portal auth session
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem('thrivit_client_session');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('thrivit_client_session', JSON.stringify(user));
    } catch {
      // Ignore
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('thrivit_client_session');
    } catch {
      // Ignore
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (pkg: PricingPackage) => {
    setSelectedPackageName(`${pkg.name} — ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(pkg.priceIdr)} (Hemat ${pkg.discountPercentage}%)`);
    scrollToSection('contact');
  };

  const handleSelectServiceFromBento = (serviceName: string) => {
    setSelectedPackageName(serviceName.includes('PoS') ? 'Paket Premium + Sistem PoS — Rp 1.680.000 (Hemat 50%)' : 'Paket Advance — Rp 860.000 (Hemat 35%)');
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#070709] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Top Floating Pill Navigation */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onOpenPosDemo={() => setPosModalOpen(true)}
        onOpenPortal={() => setPortalOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Main Page Flow matching reference FasterUI design */}
      <main className="flex-1">
        
        {/* 1. Hero with multi-color ambient glow aura & 3D Isometric / Neural backdrop */}
        <Hero
          language={language}
          onGetInTouch={() => scrollToSection('contact')}
          onExplorePricing={() => scrollToSection('pricing')}
          onOpenPosDemo={() => setPosModalOpen(true)}
        />

        {/* 2. 3D Isometric Ecosystem Section ("Growing Businesses Through Digital Ecosystems") */}
        <IsometricShowcaseSection
          language={language}
          onOpenPosDemo={() => setPosModalOpen(true)}
          onExplorePricing={() => scrollToSection('pricing')}
        />

        {/* 3. What We Do - 7-Card Bento Grid */}
        <WhatWeDoBento
          language={language}
          onExplorePoS={() => setPosModalOpen(true)}
          onSelectService={handleSelectServiceFromBento}
        />

        {/* 3. Check our Work - Interactive Carousel with browser frames */}
        <CheckOurWork
          language={language}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* 4. Pricing - Side-by-Side Meeting Card & 3 Packages (Starter, Advance, Premium + PoS) */}
        <PricingSection
          language={language}
          onSelectPackage={handleSelectPackage}
          onOpenPosDemo={() => setPosModalOpen(true)}
          onScheduleMeeting={() => setMeetingModalOpen(true)}
        />

        {/* 5. Frequently Asked Questions Accordion */}
        <FaqSection
          language={language}
        />

        {/* 6. Let's Get in Touch Minimalist Contact Form */}
        <ContactSection
          language={language}
          selectedPackageName={selectedPackageName}
        />

      </main>

      {/* 7. Footer: Rounded dark card sitting over bottom rainbow glow aura */}
      <Footer
        language={language}
        onNavigate={scrollToSection}
        onOpenPosDemo={() => setPosModalOpen(true)}
      />

      {/* Interactive Point of Sale (PoS) Cashier Sandbox Modal */}
      <PosSimulatorModal
        isOpen={posModalOpen}
        onClose={() => setPosModalOpen(false)}
        onSelectPremium={() => {
          setPosModalOpen(false);
          setSelectedPackageName('Paket Premium + Sistem PoS — Rp 1.680.000 (Hemat 50%)');
          scrollToSection('contact');
        }}
      />

      {/* 30-Minute Discovery Meeting Booking Modal */}
      <ScheduleMeetingModal
        isOpen={meetingModalOpen}
        onClose={() => setMeetingModalOpen(false)}
        language={language}
      />

      {/* Portfolio Showcase Project Inspection Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOrderSimilar={(projTitle) => {
          setSelectedProject(null);
          setSelectedPackageName(`Website Serupa (${projTitle})`);
          scrollToSection('contact');
        }}
      />

      {/* Authenticated Client Portal Modal */}
      <ClientPortalModal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

    </div>
  );
}
