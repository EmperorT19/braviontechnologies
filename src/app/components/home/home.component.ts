import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="space-y-24 blueprint-bg pb-12">
      
      <!-- Hero Section -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-6 relative">
        <!-- Floating Ambient Glows -->
        <div class="absolute -top-10 -left-10 w-72 h-72 bg-[#e62e2e]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute top-1/2 right-10 w-96 h-96 bg-[#ff6b4a]/5 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Text content -->
        <div class="lg:col-span-6 space-y-6 z-10">

          <div class="space-y-4">
            <h1 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase leading-none">
              ENTERPRISE <span class="text-[#e62e2e] block">HARDWARE LOGISTICS</span> & ENGINEER DISPATCH
            </h1>
            <p class="text-sm text-gray-400 leading-relaxed max-w-lg">
              Bravion Technologies supplies volume ICT hardware, secure printing fleets, and backup energy systems, integrated under rigorous, 24/7/365 Service Level Agreements (SLAs) for enterprise and government operations.
            </p>
          </div>

          <div class="flex flex-wrap gap-4 pt-2">
            <a routerLink="/catalog" class="btn-primary flex items-center gap-2">
              <span>EXPLORE EQUIPMENT CATALOG</span>
              <span>→</span>
            </a>
            <a routerLink="/services" class="btn-secondary">
              VIEW SERVICE LEVEL AGREEMENTS
            </a>
          </div>
        </div>

        <!-- Live NOC Simulator Widget -->
        <div class="lg:col-span-6 z-10">
          <div class="corporate-card-premium p-6 space-y-6 relative overflow-hidden">
            <!-- Scanline overlay effect -->
            <div class="scanline-overlay pointer-events-none absolute inset-0 z-20"></div>

            <div class="flex justify-between items-center border-b border-neutral-900 pb-3">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 bg-[#e62e2e] rounded-full animate-pulse"></span>
                <span class="font-mono text-xs text-white uppercase tracking-wider">LIVE NOC SIMULATOR</span>
              </div>
              <span class="text-[9px] font-mono text-gray-500 uppercase">SYS_LOC: ZN_SOUTH_EAST</span>
            </div>

            <!-- Terminal Output Area -->
            <div class="bg-neutral-950/80 rounded border border-neutral-900 p-4 font-mono text-[10px] text-emerald-400 space-y-2 h-44 overflow-y-auto relative">
              <div *ngIf="isScanning" class="scanner-beam pointer-events-none"></div>
              
              <!-- Logs stack -->
              <div *ngFor="let log of terminalLogs" class="leading-relaxed whitespace-nowrap overflow-hidden">
                <span class="text-gray-600 mr-1.5">></span>{{ log }}
              </div>
              
              <!-- Scan complete state -->
              <div *ngIf="scanComplete" class="pt-2 border-t border-neutral-900 space-y-1.5 text-gray-300">
                <div class="text-[#e62e2e] font-bold">SCAN STATUS: 100% NOMINAL</div>
                <div *ngFor="let res of scanResults" class="flex justify-between items-center text-[9px]">
                  <span>{{ res.label }}</span>
                  <span class="text-emerald-400 font-bold">[OK]</span>
                </div>
              </div>
              
              <div *ngIf="isScanning" class="text-white animate-pulse">
                SCANNING SYSTEM TELEMETRY... {{ scanProgress }}%
              </div>
            </div>

            <!-- Controls -->
            <div class="grid grid-cols-2 gap-4">
              <button 
                (click)="runDiagnosticScan()" 
                [disabled]="isScanning || scanComplete" 
                class="btn-primary text-center text-xs py-3 rounded uppercase font-bold tracking-wider disabled:opacity-30"
              >
                RUN HEALTH SCAN
              </button>
              <button 
                (click)="resetTerminal()" 
                [disabled]="isScanning || !scanComplete" 
                class="btn-secondary text-center text-xs py-3 rounded uppercase font-bold tracking-wider disabled:opacity-30"
              >
                RESET TELEMETRY
              </button>
            </div>

            <div class="flex items-center justify-between text-[9px] font-mono text-gray-500">
              <span>SLA THRESHOLD: 99.9%</span>
              <span>STANDBY ENGINEERS: 8 ACTIVE</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Live SLA Metrics Banner -->
      <section class="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-neutral-950/40 border border-neutral-900 p-8 rounded-xl relative overflow-hidden">
        <div class="space-y-1">
          <div class="text-3xl font-extrabold text-white tracking-tight">2HR / 4HR</div>
          <div class="text-[10px] font-mono text-[#e62e2e] uppercase tracking-wider">Guaranteed SLA Dispatch</div>
        </div>
        <div class="space-y-1">
          <div class="text-3xl font-extrabold text-white tracking-tight">99.98%</div>
          <div class="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Contracted Network Uptime</div>
        </div>
        <div class="space-y-1">
          <div class="text-3xl font-extrabold text-white tracking-tight">100%</div>
          <div class="text-[10px] font-mono text-gray-400 uppercase tracking-wider">OEM Parts Authenticity</div>
        </div>
        <div class="space-y-1">
          <div class="text-3xl font-extrabold text-white tracking-tight">24/7/365</div>
          <div class="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Technical SLA Helpdesk</div>
        </div>
      </section>

      <!-- About Us Section -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div class="lg:col-span-5 space-y-4">
          <span class="section-label">WHO WE ARE</span>
          <h2 class="text-3xl font-extrabold text-white uppercase tracking-tight">THE HARDWARE BACKBONE FOR CRITICAL OPERATIONS</h2>
        </div>
        <div class="lg:col-span-7 space-y-6 text-gray-300 text-sm md:text-base leading-relaxed">
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
          <p class="text-gray-400 max-w-xl mx-auto text-xs leading-relaxed">
            Bulk volume procurement, tender supply, and deployment of enterprise computing hardware and office assets.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <!-- Card 1: Networking & Telecom -->
          <div class="corporate-card-premium flex flex-col justify-between h-full overflow-hidden group">
            <div>
              <div class="relative overflow-hidden h-40 w-full">
                <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=60" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Networking & Telecom">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0d111c] to-transparent opacity-60"></div>
                <div class="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-[#e62e2e] flex items-center justify-center text-white shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-2.25-.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div class="p-6 space-y-3">
                <h3 class="text-base font-bold text-white uppercase tracking-tight group-hover:text-[#e62e2e] transition-colors">Networking & Telecom</h3>
                <p class="text-xs text-gray-400 leading-relaxed">
                  Supply of high-capacity managed switches, SFP+ core routing systems, wireless access points, and server cabinets.
                </p>
                <div class="flex flex-wrap gap-1.5 pt-1">
                  <span class="text-[9px] font-mono bg-neutral-900 text-gray-400 px-2 py-0.5 rounded border border-neutral-800">SFP+ Switch</span>
                  <span class="text-[9px] font-mono bg-neutral-900 text-gray-400 px-2 py-0.5 rounded border border-neutral-800">Core Router</span>
                </div>
              </div>
            </div>
            <div class="px-6 pb-6 pt-2">
              <a routerLink="/catalog" class="text-xs font-semibold text-[#e62e2e] hover:text-[#ff6b4a] flex items-center gap-1">
                <span>View networking items</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <!-- Card 2: Power & Energy Backup -->
          <div class="corporate-card-premium flex flex-col justify-between h-full overflow-hidden group">
            <div>
              <div class="relative overflow-hidden h-40 w-full">
                <img src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&auto=format&fit=crop&q=60" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Power & Protection">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0d111c] to-transparent opacity-60"></div>
                <div class="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-[#e62e2e] flex items-center justify-center text-white shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
              </div>
              <div class="p-6 space-y-3">
                <h3 class="text-base font-bold text-white uppercase tracking-tight group-hover:text-[#e62e2e] transition-colors">Power & Protection</h3>
                <p class="text-xs text-gray-400 leading-relaxed">
                  Solar station backups for NVRs/network closets, pure sine wave rack-mount inverters, online UPS, and LiFePO4 batteries.
                </p>
                <div class="flex flex-wrap gap-1.5 pt-1">
                  <span class="text-[9px] font-mono bg-neutral-900 text-gray-400 px-2 py-0.5 rounded border border-neutral-800">LiFePO4</span>
                  <span class="text-[9px] font-mono bg-neutral-900 text-gray-400 px-2 py-0.5 rounded border border-neutral-800">UPS</span>
                </div>
              </div>
            </div>
            <div class="px-6 pb-6 pt-2">
              <a routerLink="/catalog" class="text-xs font-semibold text-[#e62e2e] hover:text-[#ff6b4a] flex items-center gap-1">
                <span>View power systems</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <!-- Card 3: Copiers & Office Hardware -->
          <div class="corporate-card-premium flex flex-col justify-between h-full overflow-hidden group">
            <div>
              <div class="relative overflow-hidden h-40 w-full">
                <img src="https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&auto=format&fit=crop&q=60" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Printers & Copiers">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0d111c] to-transparent opacity-60"></div>
                <div class="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-[#e62e2e] flex items-center justify-center text-white shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-14.326 0C3.768 7.44 3 8.375 3 9.456V15.75a2.25 2.25 0 002.25 2.25h1.091M9 9h6m-6 3h6" />
                  </svg>
                </div>
              </div>
              <div class="p-6 space-y-3">
                <h3 class="text-base font-bold text-white uppercase tracking-tight group-hover:text-[#e62e2e] transition-colors">Printers & Copiers</h3>
                <p class="text-xs text-gray-400 leading-relaxed">
                  Heavy-duty A3 department copiers, wide plotters, secure paper shredders, laminators, and barcode scanners.
                </p>
                <div class="flex flex-wrap gap-1.5 pt-1">
                  <span class="text-[9px] font-mono bg-neutral-900 text-gray-400 px-2 py-0.5 rounded border border-neutral-800">A3 Heavy Duty</span>
                  <span class="text-[9px] font-mono bg-neutral-900 text-gray-400 px-2 py-0.5 rounded border border-neutral-800">Wide Plotter</span>
                </div>
              </div>
            </div>
            <div class="px-6 pb-6 pt-2">
              <a routerLink="/catalog" class="text-xs font-semibold text-[#e62e2e] hover:text-[#ff6b4a] flex items-center gap-1">
                <span>View office hardware</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <!-- Card 4: Toners & Cartridges -->
          <div class="corporate-card-premium flex flex-col justify-between h-full overflow-hidden group">
            <div>
              <div class="relative overflow-hidden h-40 w-full">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Toners & Cartridges">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0d111c] to-transparent opacity-60"></div>
                <div class="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-[#e62e2e] flex items-center justify-center text-white shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                  </svg>
                </div>
              </div>
              <div class="p-6 space-y-3">
                <h3 class="text-base font-bold text-white uppercase tracking-tight group-hover:text-[#e62e2e] transition-colors">Toners & Cartridges</h3>
                <p class="text-xs text-gray-400 leading-relaxed">
                  Compatible LaserJet replacement toners, EcoTank refill sets, plotter rolls, and dot-matrix ribbons.
                </p>
                <div class="flex flex-wrap gap-1.5 pt-1">
                  <span class="text-[9px] font-mono bg-neutral-900 text-gray-400 px-2 py-0.5 rounded border border-neutral-800">LaserJet</span>
                  <span class="text-[9px] font-mono bg-neutral-900 text-gray-400 px-2 py-0.5 rounded border border-neutral-800">Plotter Roll</span>
                </div>
              </div>
            </div>
            <div class="px-6 pb-6 pt-2">
              <a routerLink="/catalog" class="text-xs font-semibold text-[#e62e2e] hover:text-[#ff6b4a] flex items-center gap-1">
                <span>View consumables</span>
                <span>→</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      <!-- Services Segment -->
      <section class="border-t border-neutral-900 pt-16 space-y-12">
        <div class="text-center space-y-4">
          <span class="section-label">TECHNICAL SERVICES & SOLUTIONS</span>
          <h2 class="text-3xl font-extrabold text-white uppercase tracking-tight">OUR SERVICE DIVISIONS</h2>
          <p class="text-gray-400 max-w-xl mx-auto text-xs leading-relaxed">
            Professional SLA-backed engineering services, smart integration planning, and strategic consulting.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <!-- Card 1: Technical SLA Helpdesk -->
          <div class="corporate-card-premium flex flex-col justify-between h-full overflow-hidden group">
            <div>
              <div class="relative overflow-hidden h-40 w-full">
                <img src="assets/Services16.png" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="SLA Helpdesk & Support">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0d111c] to-transparent opacity-60"></div>
                <div class="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-[#e62e2e] flex items-center justify-center text-white shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.67 2.67 0 1113.5 17.25l-5.83-5.83m.002 0a1.5 1.5 0 01-2.005-2.005 3 3 0 00-4.007-4.007 1.5 1.5 0 01-2.005-2.005 3 3 0 00-4.007-4.007m12.014 12.014L20.25 15A2.67 2.67 0 1116.5 11.25l-3.75-3.75m0 0a1.5 1.5 0 01-2.005-2.005 3 3 0 00-4.007-4.007 1.5 1.5 0 01-2.005-2.005 3 3 0 00-4.007-4.007" />
                  </svg>
                </div>
              </div>
              <div class="p-6 space-y-3">
                <h3 class="text-base font-bold text-white uppercase tracking-tight group-hover:text-[#e62e2e] transition-colors">SLA Helpdesk & Support</h3>
                <p class="text-xs text-gray-400 leading-relaxed">
                  24/7/365 active monitoring, emergency callouts, on-site hardware repairs, and scheduled sweep agreements.
                </p>
                <div class="text-[9px] text-[#e62e2e] font-mono">SUPPORT LAYER: SLA-1 (CRITICAL)</div>
              </div>
            </div>
            <div class="px-6 pb-6 pt-2">
              <a routerLink="/services" class="text-xs font-semibold text-[#e62e2e] hover:text-[#ff6b4a] flex items-center gap-1">
                <span>View SLA details</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <!-- Card 2: CCTV Surveillance planning -->
          <div class="corporate-card-premium flex flex-col justify-between h-full overflow-hidden group">
            <div>
              <div class="relative overflow-hidden h-40 w-full">
                <img src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=60" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="CCTV Camera Zoning">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0d111c] to-transparent opacity-60"></div>
                <div class="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-[#e62e2e] flex items-center justify-center text-white shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25" />
                  </svg>
                </div>
              </div>
              <div class="p-6 space-y-3">
                <h3 class="text-base font-bold text-white uppercase tracking-tight group-hover:text-[#e62e2e] transition-colors">CCTV Camera Zoning</h3>
                <p class="text-xs text-gray-400 leading-relaxed">
                  Interactive zone planning, camera placement logic, network storage server configuration, and night-vision tests.
                </p>
                <div class="text-[9px] text-[#e62e2e] font-mono">INTERACTIVE: ZONE PLANNER MAP</div>
              </div>
            </div>
            <div class="px-6 pb-6 pt-2">
              <a routerLink="/cctv" class="text-xs font-semibold text-[#e62e2e] hover:text-[#ff6b4a] flex items-center gap-1">
                <span>Open zone planner</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <!-- Card 3: Access Control & Biometrics -->
          <div class="corporate-card-premium flex flex-col justify-between h-full overflow-hidden group">
            <div>
              <div class="relative overflow-hidden h-40 w-full">
                <img src="https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=60" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Access & Biometrics">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0d111c] to-transparent opacity-60"></div>
                <div class="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-[#e62e2e] flex items-center justify-center text-white shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
              </div>
              <div class="p-6 space-y-3">
                <h3 class="text-base font-bold text-white uppercase tracking-tight group-hover:text-[#e62e2e] transition-colors">Access & Biometrics</h3>
                <p class="text-xs text-gray-400 leading-relaxed">
                  Facial/fingerprint scanning terminal integration, RFID smart card setups, speed gate wiring, and HR sync.
                </p>
                <div class="text-[9px] text-[#e62e2e] font-mono">DEPLOYMENT: SECURITY AUDITS</div>
              </div>
            </div>
            <div class="px-6 pb-6 pt-2">
              <a routerLink="/services" class="text-xs font-semibold text-[#e62e2e] hover:text-[#ff6b4a] flex items-center gap-1">
                <span>View security systems</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <!-- Card 4: ICT Strategy Consulting -->
          <div class="corporate-card-premium flex flex-col justify-between h-full overflow-hidden group">
            <div>
              <div class="relative overflow-hidden h-40 w-full">
                <img src="assets/Services2.png" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="ICT Strategy & Auditing">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0d111c] to-transparent opacity-60"></div>
                <div class="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-[#e62e2e] flex items-center justify-center text-white shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>
                </div>
              </div>
              <div class="p-6 space-y-3">
                <h3 class="text-base font-bold text-white uppercase tracking-tight group-hover:text-[#e62e2e] transition-colors">ICT Strategy & Auditing</h3>
                <p class="text-xs text-gray-400 leading-relaxed">
                  High-level systems architecture blueprint design, digital transformation roadmaps, governance, and audit.
                </p>
                <div class="text-[9px] text-[#e62e2e] font-mono">ADVISORY: DEPT LEVEL COMPLIANCE</div>
              </div>
            </div>
            <div class="px-6 pb-6 pt-2">
              <a routerLink="/services" class="text-xs font-semibold text-[#e62e2e] hover:text-[#ff6b4a] flex items-center gap-1">
                <span>View consulting solutions</span>
                <span>→</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      <!-- Clients We Serve Segment -->
      <section class="border-t border-neutral-900 pt-16 space-y-12">
        <div class="text-center space-y-4">
          <span class="section-label">MARKET SECTORS</span>
          <h2 class="text-3xl font-extrabold text-white uppercase tracking-tight">CLIENTS & INDUSTRIES WE SERVE</h2>
          <p class="text-gray-400 max-w-xl mx-auto text-xs leading-relaxed">
            Deploying robust IT infrastructure, secure printing networks, and dedicated SLA contracts across critical commercial and public sectors.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <!-- Industry 1: Government & Tenders -->
          <div class="corporate-card-premium p-6 flex flex-col justify-between h-full space-y-4">
            <div class="space-y-3">
              <h4 class="text-sm font-mono font-bold text-white uppercase tracking-wider border-b border-neutral-900 pb-2">
                Government & Public
              </h4>
              <p class="text-xs text-gray-400 leading-relaxed font-medium">
                Custom hardware supply and security network deployments complying with national procurement and institutional tender guidelines.
              </p>
            </div>
          </div>

          <!-- Industry 2: Corporate & Enterprise -->
          <div class="corporate-card-premium p-6 flex flex-col justify-between h-full space-y-4">
            <div class="space-y-3">
              <h4 class="text-sm font-mono font-bold text-white uppercase tracking-wider border-b border-neutral-900 pb-2">
                Corporate Enterprise
              </h4>
              <p class="text-xs text-gray-400 leading-relaxed font-medium">
                Managed office printer fleets, high-density Wi-Fi networks, server room management, and 24/7 priority SLA support contracts.
              </p>
            </div>
          </div>

          <!-- Industry 3: Logistics & Retail -->
          <div class="corporate-card-premium p-6 flex flex-col justify-between h-full space-y-4">
            <div class="space-y-3">
              <h4 class="text-sm font-mono font-bold text-white uppercase tracking-wider border-b border-neutral-900 pb-2">
                Logistics & Retail
              </h4>
              <p class="text-xs text-gray-400 leading-relaxed font-medium">
                High-volume barcode scanners, thermal label printing automation, inventory software, and rugged warehouse wireless installations.
              </p>
            </div>
          </div>

          <!-- Industry 4: Financial & Banking -->
          <div class="corporate-card-premium p-6 flex flex-col justify-between h-full space-y-4">
            <div class="space-y-3">
              <h4 class="text-sm font-mono font-bold text-white uppercase tracking-wider border-b border-neutral-900 pb-2">
                Financial Services
              </h4>
              <p class="text-xs text-gray-400 leading-relaxed font-medium">
                Biometric access control gates, secure UTM firewall systems, network link redundancy, and real-time CCTV planning maps.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit, OnDestroy {
  
  // NOC Simulator variables
  terminalLogs: string[] = [
    'MONITOR_SYS: Starting ping monitoring sweep...',
    'NET_CORE: Core Switch Port 24 status changed to UP',
    'DISPATCH: Ticket BRV-TEC-8831 dispatched to SLA engineer',
    'MONITOR_SYS: 99.98% network stability maintained over 24 hrs',
    'PRINT_NOC: Wide Plotter #4 plotter consumable levels at 92%'
  ];
  
  logTemplates: string[] = [
    'NET_CORE: Checked SFP+ core linkages... OK (14ms latency)',
    'POWER_SYS: LiFePO4 battery cabinet status at 100% capacity',
    'DISPATCH: Dispatch standby team #3 deployed for scheduled sweep',
    'PRINT_NOC: EcoTank refill orders queued for headquarters dispatch',
    'SEC_CCTV: NVR storage array health check... 100% NOMINAL',
    'MONITOR_SYS: Received SNMP packet sweep from Substation 4B... OK',
    'NET_CORE: AP-Zone-3 Wi-Fi client load balanced (48 active client sessions)',
    'POWER_SYS: Sine Wave Inverter 10kVA load factor normal (24%)',
    'DISPATCH: Routine SLA inspection report submitted for Rose Avenue Mall'
  ];

  logIntervalId: any;

  // Scan state
  isScanning = false;
  scanProgress = 0;
  scanComplete = false;
  scanResults: { label: string; ok: boolean }[] = [];

  ngOnInit() {
    // Start simulation logs rotation
    this.logIntervalId = setInterval(() => {
      this.rotateTerminalLogs();
    }, 4500);
  }

  ngOnDestroy() {
    if (this.logIntervalId) {
      clearInterval(this.logIntervalId);
    }
  }

  rotateTerminalLogs() {
    if (this.isScanning || this.scanComplete) return;

    // Pick a random template log
    const randomTemplate = this.logTemplates[Math.floor(Math.random() * this.logTemplates.length)];
    
    // Add to logs and shift first item out if too many
    this.terminalLogs.push(randomTemplate);
    if (this.terminalLogs.length > 5) {
      this.terminalLogs.shift();
    }
  }

  runDiagnosticScan() {
    this.isScanning = true;
    this.scanProgress = 0;
    this.scanComplete = false;
    
    const interval = setInterval(() => {
      this.scanProgress += 5;
      if (this.scanProgress >= 100) {
        clearInterval(interval);
        this.completeScan();
      }
    }, 120);
  }

  completeScan() {
    this.isScanning = false;
    this.scanComplete = true;
    this.scanResults = [
      { label: 'Core Networking Switches', ok: true },
      { label: 'Backup Battery Inverters', ok: true },
      { label: 'Fleet Printers / Copiers', ok: true },
      { label: 'CCTV Surveillance Access Control', ok: true }
    ];
  }

  resetTerminal() {
    this.scanComplete = false;
    this.scanProgress = 0;
    this.isScanning = false;
    this.scanResults = [];
    
    // Reset starting logs
    this.terminalLogs = [
      'MONITOR_SYS: Diagnostics desk reset successfully.',
      'NET_CORE: Core Switch Port 24 status changed to UP',
      'MONITOR_SYS: 99.98% network stability maintained over 24 hrs',
      'PRINT_NOC: Wide Plotter #4 plotter consumable levels at 92%',
      'MONITOR_SYS: Listening for new telemetry inputs...'
    ];
  }
}
