import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="space-y-24">
      
      <!-- Hero Section -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-6">
        <!-- Text content -->
        <div class="lg:col-span-7 space-y-6">
          <span class="section-label">ENTERPRISE IT & NETWORKING</span>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            High-Performance <span class="gradient-text">Hardware</span> & <span class="gradient-text">SLA Support</span>
          </h1>
          <p class="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl">
            Bravion Technologies supplies enterprise networking infrastructure, plotter consumables, and rapid technical dispatch services. We keep corporate office networks and large-scale operations running.
          </p>
          <div class="flex flex-wrap gap-4 pt-4">
            <a routerLink="/catalog" class="btn-primary">
              Browse Equipment
            </a>
            <a routerLink="/quote" class="btn-secondary">
              Request Dispatch Call
            </a>
          </div>
        </div>
        <!-- Banner image -->
        <div class="lg:col-span-5 relative flex justify-center">
          <div class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#e62e2e]/20 to-[#ff6b4a]/20 blur-xl opacity-75"></div>
          <div class="relative w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
            <img src="hero-tech.png" alt="Corporate Technology Solutions" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      <!-- About Us Section -->
      <section class="border-t border-neutral-900 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-4">
          <span class="section-label">ABOUT US</span>
          <h2 class="text-3xl font-extrabold text-white mt-2 uppercase tracking-tight">WHO WE ARE</h2>
        </div>
        <div class="lg:col-span-8 space-y-6 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            At Bravion Technologies, we specialize in bridging hardware logistics with reliable engineering support. We provide high-quality equipment procurement alongside 24/7/365 Service Level Agreements (SLAs) tailored to modern business environments and government bureaus.
          </p>
          <p>
            Our partnership structure utilizes divisional group capacities—such as high-volume printing supply lines and professional secure facility logistics—to deploy hardware and technical services under a single point of responsibility.
          </p>
        </div>
      </section>

      <!-- Equipment Divisions Segment -->
      <section class="border-t border-neutral-900 pt-16 space-y-12">
        <div class="text-center space-y-4">
          <span class="section-label">HARDWARE SUPPLY DEPARTMENTS</span>
          <h2 class="text-3xl font-extrabold text-white uppercase tracking-tight">OUR EQUIPMENT DIVISIONS</h2>
          <p class="text-gray-400 max-w-xl mx-auto text-sm">
            Bulk volume procurement, tender supply, and deployment of enterprise computing hardware and office assets.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <!-- Card 1: Networking & Telecom -->
          <div class="corporate-card p-8 flex flex-col justify-between h-full space-y-6">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-lg bg-[#e62e2e]/10 flex items-center justify-center text-xl text-[#e62e2e]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-2.25-.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white uppercase">Networking & Telecom</h3>
              <p class="text-xs text-gray-400 leading-relaxed">
                Supply of high-capacity managed switches, SFP+ core routing systems, wireless access points, and server cabinets.
              </p>
            </div>
            <a routerLink="/catalog" class="text-xs font-semibold text-[#e62e2e] hover:text-[#ff6b4a] flex items-center gap-1 mt-4">
              <span>View networking items</span>
              <span>→</span>
            </a>
          </div>

          <!-- Card 2: Power & Energy Backup -->
          <div class="corporate-card p-8 flex flex-col justify-between h-full space-y-6">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-lg bg-[#e62e2e]/10 flex items-center justify-center text-xl text-[#e62e2e]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white uppercase">Power & Protection</h3>
              <p class="text-xs text-gray-400 leading-relaxed">
                Solar station backups for NVRs/network closets, pure sine wave rack-mount inverters, online UPS, and LiFePO4 batteries.
              </p>
            </div>
            <a routerLink="/catalog" class="text-xs font-semibold text-[#e62e2e] hover:text-[#ff6b4a] flex items-center gap-1 mt-4">
              <span>View power systems</span>
              <span>→</span>
            </a>
          </div>

          <!-- Card 3: Copiers & Office Hardware -->
          <div class="corporate-card p-8 flex flex-col justify-between h-full space-y-6">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-lg bg-[#e62e2e]/10 flex items-center justify-center text-xl text-[#e62e2e]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-14.326 0C3.768 7.44 3 8.375 3 9.456V15.75a2.25 2.25 0 002.25 2.25h1.091M9 9h6m-6 3h6" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white uppercase">Printers & Copiers</h3>
              <p class="text-xs text-gray-400 leading-relaxed">
                Heavy-duty A3 department copiers, wide plotters, secure paper shredders, laminators, and barcode scanners.
              </p>
            </div>
            <a routerLink="/catalog" class="text-xs font-semibold text-[#e62e2e] hover:text-[#ff6b4a] flex items-center gap-1 mt-4">
              <span>View office hardware</span>
              <span>→</span>
            </a>
          </div>

          <!-- Card 4: Toners & Cartridges -->
          <div class="corporate-card p-8 flex flex-col justify-between h-full space-y-6">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-lg bg-[#e62e2e]/10 flex items-center justify-center text-xl text-[#e62e2e]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white uppercase">Toners & Cartridges</h3>
              <p class="text-xs text-gray-400 leading-relaxed">
                Compatible LaserJet replacement toners, EcoTank refill sets, plotter rolls, and dot-matrix ribbons.
              </p>
            </div>
            <a routerLink="/catalog" class="text-xs font-semibold text-[#e62e2e] hover:text-[#ff6b4a] flex items-center gap-1 mt-4">
              <span>View consumables</span>
              <span>→</span>
            </a>
          </div>

        </div>
      </section>

      <!-- Services Segment -->
      <section class="border-t border-neutral-900 pt-16 space-y-12">
        <div class="text-center space-y-4">
          <span class="section-label">TECHNICAL SERVICES & SOLUTIONS</span>
          <h2 class="text-3xl font-extrabold text-white uppercase tracking-tight">OUR SERVICE DIVISIONS</h2>
          <p class="text-gray-400 max-w-xl mx-auto text-sm">
            Professional SLA-backed engineering services, smart integration planning, and strategic consulting.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <!-- Card 1: Technical SLA Helpdesk -->
          <div class="corporate-card p-8 flex flex-col justify-between h-full space-y-6">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-lg bg-[#e62e2e]/10 flex items-center justify-center text-xl text-[#e62e2e]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.67 2.67 0 1113.5 17.25l-5.83-5.83m.002 0a1.5 1.5 0 01-2.005-2.005 3 3 0 00-4.007-4.007 1.5 1.5 0 01-2.005-2.005 3 3 0 00-4.007-4.007m12.014 12.014L20.25 15A2.67 2.67 0 1116.5 11.25l-3.75-3.75m0 0a1.5 1.5 0 01-2.005-2.005 3 3 0 00-4.007-4.007 1.5 1.5 0 01-2.005-2.005 3 3 0 00-4.007-4.007" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white uppercase">SLA Helpdesk & Support</h3>
              <p class="text-xs text-gray-400 leading-relaxed">
                24/7/365 active monitoring, emergency callouts, on-site hardware repairs, and scheduled sweep agreements.
              </p>
            </div>
            <a routerLink="/services" class="text-xs font-semibold text-[#e62e2e] hover:text-[#ff6b4a] flex items-center gap-1 mt-4">
              <span>View SLA details</span>
              <span>→</span>
            </a>
          </div>

          <!-- Card 2: CCTV Surveillance planning -->
          <div class="corporate-card p-8 flex flex-col justify-between h-full space-y-6">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-lg bg-[#e62e2e]/10 flex items-center justify-center text-xl text-[#e62e2e]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white uppercase">CCTV Camera Zoning</h3>
              <p class="text-xs text-gray-400 leading-relaxed">
                Interactive zone planning, camera placement logic, network storage server configuration, and night-vision tests.
              </p>
            </div>
            <a routerLink="/cctv" class="text-xs font-semibold text-[#e62e2e] hover:text-[#ff6b4a] flex items-center gap-1 mt-4">
              <span>Open zone planner</span>
              <span>→</span>
            </a>
          </div>

          <!-- Card 3: Access Control & Biometrics -->
          <div class="corporate-card p-8 flex flex-col justify-between h-full space-y-6">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-lg bg-[#e62e2e]/10 flex items-center justify-center text-xl text-[#e62e2e]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white uppercase">Access & Biometrics</h3>
              <p class="text-xs text-gray-400 leading-relaxed">
                Facial/fingerprint scanning terminal integration, RFID smart card setups, speed gate wiring, and HR sync.
              </p>
            </div>
            <a routerLink="/services" class="text-xs font-semibold text-[#e62e2e] hover:text-[#ff6b4a] flex items-center gap-1 mt-4">
              <span>View security systems</span>
              <span>→</span>
            </a>
          </div>

          <!-- Card 4: ICT Strategy Consulting -->
          <div class="corporate-card p-8 flex flex-col justify-between h-full space-y-6">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-lg bg-[#e62e2e]/10 flex items-center justify-center text-xl text-[#e62e2e]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white uppercase">ICT Strategy & Auditing</h3>
              <p class="text-xs text-gray-400 leading-relaxed">
                High-level systems architecture blueprint design, digital transformation roadmaps, governance, and audit.
              </p>
            </div>
            <a routerLink="/services" class="text-xs font-semibold text-[#e62e2e] hover:text-[#ff6b4a] flex items-center gap-1 mt-4">
              <span>View consulting solutions</span>
              <span>→</span>
            </a>
          </div>

        </div>
      </section>

      <!-- Clients We Serve Segment -->
      <section class="border-t border-neutral-900 pt-16 space-y-12">
        <div class="text-center space-y-4">
          <span class="section-label">MARKET SECTORS</span>
          <h2 class="text-3xl font-extrabold text-white uppercase tracking-tight">CLIENTS & INDUSTRIES WE SERVE</h2>
          <p class="text-gray-400 max-w-xl mx-auto text-sm">
            Deploying robust IT infrastructure, secure printing networks, and dedicated SLA contracts across critical commercial and public sectors.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <!-- Industry 1: Government & Tenders -->
          <div class="corporate-card p-6 space-y-4">
            <h4 class="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-neutral-900 pb-2">
              01 / Government & Public
            </h4>
            <p class="text-xs text-gray-400 leading-relaxed">
              Custom hardware supply and security network deployments complying with national procurement and institutional tender guidelines.
            </p>
          </div>

          <!-- Industry 2: Corporate & Enterprise -->
          <div class="corporate-card p-6 space-y-4">
            <h4 class="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-neutral-900 pb-2">
              02 / Corporate Enterprise
            </h4>
            <p class="text-xs text-gray-400 leading-relaxed">
              Managed office printer fleets, high-density Wi-Fi networks, server room management, and 24/7 priority SLA support contracts.
            </p>
          </div>

          <!-- Industry 3: Logistics & Retail -->
          <div class="corporate-card p-6 space-y-4">
            <h4 class="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-neutral-900 pb-2">
              03 / Logistics & Retail
            </h4>
            <p class="text-xs text-gray-400 leading-relaxed">
              High-volume barcode scanners, thermal label printing automation, inventory software, and rugged warehouse wireless installations.
            </p>
          </div>

          <!-- Industry 4: Financial & Banking -->
          <div class="corporate-card p-6 space-y-4">
            <h4 class="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-neutral-900 pb-2">
              04 / Financial Services
            </h4>
            <p class="text-xs text-gray-400 leading-relaxed">
              Biometric access control gates, secure UTM firewall systems, network link redundancy, and real-time CCTV planning maps.
            </p>
          </div>

        </div>
      </section>

    </div>
  `
})
export class HomeComponent {}
