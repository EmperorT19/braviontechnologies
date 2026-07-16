import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="space-y-8">
      <!-- Breadcrumb -->
      <div class="page-breadcrumb">
        <a routerLink="/" class="breadcrumb-back-btn">
          <span>←</span> HOME
        </a>
        <span class="text-neutral-600">/</span>
        <span>CONTACT & SUPPORT</span>
      </div>

      <!-- Hero Header -->
      <header class="space-y-3">
        <span class="section-label">DISPATCH DESK</span>
        <h1 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">CONTACT & SLA SUPPORT</h1>
        <p class="text-gray-400 max-w-2xl text-sm leading-relaxed">
          Need quick equipment quotes or an urgent technical dispatch? Fill out our 4-field dispatch form or reach out directly to our operations room.
        </p>
      </header>

      <!-- Main Layout: Contact Details + Form -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left Side: Direct Contact Details -->
        <div class="lg:col-span-5 space-y-6">
          <div class="corporate-card p-6 md:p-8 space-y-6">
            <h3 class="text-lg font-bold text-white uppercase tracking-tight">
              DIRECT B2B CHANNELS
            </h3>

            <div class="space-y-4 text-xs font-mono">
              <div class="space-y-1">
                <span class="text-gray-500 block">SLA DISPATCH HOTLINE</span>
                <span class="text-white text-base font-bold">+254 798 628 745</span>
              </div>
              
              <div class="space-y-1">
                <span class="text-gray-500 block">OPERATIONS DESK EMAIL</span>
                <span class="text-[#e62e2e] font-semibold text-sm">tech&#64;braviongroup.co.ke</span>
              </div>

              <div class="space-y-1 border-t border-neutral-900 pt-4">
                <span class="text-gray-500 block">OFFICE HEADQUARTERS</span>
                <span class="text-gray-300 block">Bravion House, Kindaruma Road</span>
                <span class="text-gray-400 block font-sans">Opposite Carrefour Supermarket, Rose Avenue Mall, Next to Listers Car Wash</span>
              </div>


            </div>
          </div>

          <!-- Welcoming Accreditation light card with White logo blended using mix-blend-multiply -->
          <div class="bg-neutral-100 text-neutral-900 rounded-xl p-6 space-y-4 shadow-md">
            <div class="flex items-center justify-between border-b border-neutral-200 pb-3">
              <span class="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">CERTIFIED PARTNER</span>
              <img src="Bravion Technologies white.jpeg" alt="Bravion Technologies Logo" class="h-6 w-auto mix-blend-multiply" />
            </div>
            <p class="text-xs font-semibold leading-relaxed text-neutral-700 font-sans">
              Authorized procurement provider & support engineering network. All hardware dispatches are fully insured and warranted under local legislation.
            </p>
          </div>
        </div>

        <!-- Right Side: 4-Field Dispatch Form -->
        <div class="lg:col-span-7">
          <div class="corporate-card p-6 md:p-8">
            
            <!-- Form State -->
            <form *ngIf="!submitted" (ngSubmit)="onSubmit()" #quoteForm="ngForm" class="space-y-6">
              <h3 class="text-lg font-bold text-white uppercase tracking-tight">
                DISPATCH TICKET FORM
              </h3>
              
              <!-- Company Field -->
              <div class="space-y-2">
                <label class="block text-xs font-semibold text-gray-400">
                  01. Company / Department Name *
                </label>
                <input 
                  type="text" 
                  name="company" 
                  [(ngModel)]="company" 
                  required
                  #companyRef="ngModel"
                  placeholder="e.g. Acme Logistics Ltd"
                  class="w-full bg-neutral-900 border border-neutral-800 focus:border-[#e62e2e] focus:outline-none text-white text-xs p-3.5 rounded-lg font-mono"
                />
                <span *ngIf="companyRef.touched && companyRef.invalid" class="text-[10px] font-mono text-[#e62e2e] block mt-1">
                  * Company name is required
                </span>
              </div>

              <!-- Need Field -->
              <div class="space-y-2">
                <label class="block text-xs font-semibold text-gray-400">
                  02. What do you need help with? *
                </label>
                <textarea 
                  name="need" 
                  [(ngModel)]="need" 
                  required
                  rows="4"
                  #needRef="ngModel"
                  placeholder="Describe your equipment configuration, toner supply orders, or tech support details."
                  class="w-full bg-neutral-900 border border-neutral-800 focus:border-[#e62e2e] focus:outline-none text-white text-xs p-3.5 rounded-lg font-sans resize-y"
                ></textarea>
                <span *ngIf="needRef.touched && needRef.invalid" class="text-[10px] font-mono text-[#e62e2e] block mt-1">
                  * Requirement details are required
                </span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <!-- Urgency Field -->
                <div class="space-y-2">
                  <label class="block text-xs font-semibold text-gray-400">
                    03. Response Urgency
                  </label>
                  <select 
                    name="urgency" 
                    [(ngModel)]="urgency"
                    class="w-full bg-neutral-900 border border-neutral-800 focus:border-[#e62e2e] focus:outline-none text-white text-xs p-3.5 rounded-lg font-mono appearance-none"
                  >
                    <option value="Low">Low - Maintenance/Restock</option>
                    <option value="Medium">Medium - Standard (SLA: 24h)</option>
                    <option value="High">High - SLA Priority (SLA: 4h)</option>
                    <option value="Critical">Critical - Down Event (SLA: 1h)</option>
                  </select>
                </div>

                <!-- Phone Field -->
                <div class="space-y-2">
                  <label class="block text-xs font-semibold text-gray-400">
                    04. Direct Contact Phone *
                  </label>
                  <input 
                    type="tel" 
                    name="phone" 
                    [(ngModel)]="phone" 
                    required
                    #phoneRef="ngModel"
                    placeholder="e.g. +254 712 345 678"
                    class="w-full bg-neutral-900 border border-neutral-800 focus:border-[#e62e2e] focus:outline-none text-white text-xs p-3.5 rounded-lg font-mono"
                  />
                  <span *ngIf="phoneRef.touched && phoneRef.invalid" class="text-[10px] font-mono text-[#e62e2e] block mt-1">
                    * Contact number is required for dispatch calls
                  </span>
                </div>

              </div>

              <!-- Submit CTA -->
              <div class="pt-4 border-t border-neutral-900">
                <button 
                  type="submit" 
                  [disabled]="quoteForm.invalid"
                  class="w-full btn-primary text-center uppercase text-xs font-bold tracking-wider py-4 disabled:opacity-30 disabled:pointer-events-none rounded-lg"
                >
                  TRANSMIT SUPPORT TICKET
                </button>
              </div>

            </form>

            <!-- Success State -->
            <div *ngIf="submitted" class="text-center py-8 space-y-6">
              <div class="flex justify-center">
                <span class="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-800 text-2xl font-bold">✓</span>
              </div>
              
              <div class="space-y-2">
                <h2 class="text-xl font-bold text-white uppercase tracking-tight">TRANSMISSION COMPLETED</h2>
                <p class="text-xs text-gray-400">
                  Your support request has been logged in our dispatch registry.
                </p>
              </div>

              <div class="inline-block border border-dashed border-neutral-800 bg-neutral-900/50 px-6 py-4 rounded-lg font-mono text-xs space-y-1">
                <span class="text-gray-500 block">TICKET REFERENCE ID</span>
                <span class="text-white font-bold text-sm tracking-wider">{{ ticketId }}</span>
                <span class="text-[#e62e2e] block text-[9px] font-bold mt-1">
                  URGENCY ASSIGNED: {{ urgency.toUpperCase() }}
                </span>
              </div>

              <p class="text-xs text-gray-400 max-w-md mx-auto">
                An operations officer will call your registered contact number <strong>{{ phone }}</strong> within the designated SLA window.
              </p>

              <div class="pt-4">
                <button (click)="resetForm(null)" class="btn-secondary text-xs rounded-lg">
                  SUBMIT ANOTHER TICKET
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  `
})
export class QuoteComponent implements OnInit {
  company = '';
  need = '';
  urgency = 'Medium';
  phone = '';
  
  submitted = false;
  ticketId = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Pre-fill need field if query params are present (e.g. from catalog)
      const selectedItem = params['item'];
      if (selectedItem) {
        this.need = `Request quote for: ${selectedItem}\n`;
      }
    });
  }

  onSubmit() {
    // Generate unique ticket number
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    this.ticketId = `BRV-TEC-${randomNum}`;
    this.submitted = true;
  }

  resetForm(form: any) {
    this.submitted = false;
    this.company = '';
    this.need = '';
    this.urgency = 'Medium';
    this.phone = '';
    if (form) {
      form.resetForm({ urgency: 'Medium' });
    }
  }
}
