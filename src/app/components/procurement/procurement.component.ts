import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-procurement',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="space-y-8">
      <!-- Breadcrumb -->
      <div class="page-breadcrumb">
        <a routerLink="/" class="breadcrumb-back-btn">
          <span>←</span> HOME
        </a>
        <span class="text-neutral-600">/</span>
        <span>03 / CORPORATE PROCUREMENT</span>
      </div>

      <!-- Hero Header -->
      <header class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-[#e62e2e] animate-pulse"></span>
          <span class="text-[10px] font-mono text-[#e62e2e] tracking-widest uppercase font-bold">
            CLIENT PORTAL | VERIFIED B2B CHANNEL
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">SECURE CONTRACTING PORTAL</h1>
        <p class="text-gray-400 max-w-2xl text-sm leading-relaxed">
          Access point for enterprise volume licensing, institutional frame agreements, and government procurement tenders.
        </p>
      </header>

      <!-- Grid layout with B2B cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Active Frame Agreements -->
        <div class="corporate-card p-6 space-y-6">
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-bold text-white uppercase tracking-tight">
              ACTIVE B2B TENDERS
            </h3>
            <span class="text-[9px] font-mono bg-neutral-900 text-[#e62e2e] border border-[#e62e2e]/30 px-2 py-0.5 rounded">
              VERIFIED TIER
            </span>
          </div>

          <div class="space-y-4 font-mono text-xs">
            <div class="border border-neutral-900 bg-neutral-950/40 p-4 rounded-lg space-y-2">
              <div class="flex justify-between text-gray-500">
                <span>Ref: GVT-NET-2026</span>
                <span class="text-[#e62e2e] font-bold">CLOSED</span>
              </div>
              <p class="text-white font-bold uppercase text-sm">Enterprise Network Expansion Framework</p>
              <p class="text-gray-400 text-[10px]">Supply of dual-power core routing hardware and managed switches.</p>
            </div>

            <div class="border border-neutral-900 bg-neutral-950/40 p-4 rounded-lg space-y-2">
              <div class="flex justify-between text-gray-500">
                <span>Ref: MPS-SUP-2026</span>
                <span class="text-emerald-400 font-bold">OPEN FOR CONTRACTORS</span>
              </div>
              <p class="text-white font-bold uppercase text-sm">Consumables Dispatch Agreement</p>
              <p class="text-gray-400 text-[10px]">Annual paper rolls and high-yield toner logistics (HP/Canon models).</p>
            </div>
          </div>

          <div class="pt-2">
            <a 
              [routerLink]="['/quote']" 
              [queryParams]="{ item: 'Tender: MPS-SUP-2026' }"
              class="block w-full text-center btn-secondary text-xs"
            >
              SUBMIT SUPPLY COMPLIANCE
            </a>
          </div>
        </div>

        <!-- Group Printing Integration -->
        <div class="corporate-card p-6 space-y-6 flex flex-col justify-between">
          <div class="space-y-4">
            <h3 class="text-lg font-bold text-white uppercase tracking-tight">
              HIGH-VOLUME SUPPLY RESOURCES
            </h3>
            <span class="text-xs font-mono text-gray-500 block uppercase">
              DIVISIONAL GROUP CAPACITY
            </span>
            <p class="text-xs text-gray-300 leading-relaxed font-medium">
              We coordinate with partner print logistics facilities to satisfy major paper roll and printing toner orders. 
              Our SLA logistics framework handles scheduled refills, delivery, and hardware warranties under single, corporate-wide service agreements.
            </p>
            
            <ul class="space-y-2 font-mono text-[10px] text-gray-500">
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#e62e2e]"></span> Scheduled toner and ink replenishment sweeps
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#e62e2e]"></span> Full warranty coverage on office hardware fleets
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#e62e2e]"></span> Consolidated monthly billing profiles
              </li>
            </ul>
          </div>

          <div class="pt-6">
            <a 
              [routerLink]="['/quote']" 
              [queryParams]="{ item: 'High-Volume Print Supply SLA' }"
              class="block w-full text-center btn-primary text-xs"
            >
              REQUEST DISPATCH SCHEDULING TERMS
            </a>
          </div>
        </div>

      </div>

      <!-- Security Notice -->
      <div class="border border-neutral-900 bg-neutral-950/30 p-6 rounded-lg font-mono text-[10px] text-gray-500 space-y-2">
        <p class="font-bold text-gray-400">PROCUREMENT DESK NOTE:</p>
        <p>
          Submitted proposals are processed under central corporate B2B compliance. 
          To register new contractor certifications or edit existing SLA frameworks, please contact your designated account advisor.
        </p>
      </div>
    </div>
  `
})
export class ProcurementComponent {}
