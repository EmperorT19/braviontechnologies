import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface HardwareItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  specs: { [key: string]: string };
  image: string;
  price: string;
  stockStatus: string;
  compatiblePrinters?: string[];
}

@Component({
  selector: 'app-catalog',
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
        <span>HARDWARE CATALOG</span>
      </div>

      <!-- Hero Header -->
      <header class="space-y-3">
        <span class="section-label">HARDWARE SUPPLY</span>
        <h1 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">EQUIPMENT CATALOG</h1>
        <p class="text-gray-400 max-w-2xl text-sm leading-relaxed">
          Source enterprise networking devices, premium toner cartridges, and printer consumables. Filter by category or search by specific office printer model.
        </p>
      </header>

      <!-- Filter Controls -->
      <div class="corporate-card p-6 space-y-6">
        <div class="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
          
          <!-- Category Selector -->
          <div class="space-y-2">
            <span class="block text-xs font-mono text-gray-500 uppercase tracking-widest">FILTER BY CATEGORY</span>
            <div class="flex flex-wrap gap-2">
              <button 
                *ngFor="let cat of categories" 
                (click)="setCategory(cat)"
                [class]="selectedCategory === cat ? 'px-4 py-2 text-xs font-semibold rounded-lg bg-[#e62e2e] text-white border border-[#e62e2e]' : 'px-4 py-2 text-xs font-medium rounded-lg bg-neutral-900/60 text-gray-400 border border-neutral-800 hover:text-white hover:border-neutral-700'"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <!-- Printer Model Filter -->
          <div class="space-y-2 w-full lg:w-72">
            <span class="block text-xs font-mono text-gray-500 uppercase tracking-widest">SEARCH COMPATIBILITY</span>
            <div class="relative">
              <select 
                [(ngModel)]="selectedPrinter" 
                (change)="applyFilters()" 
                class="w-full bg-neutral-900 border border-neutral-800 text-white rounded-lg font-mono text-xs p-3 focus:outline-none focus:border-[#e62e2e] appearance-none"
              >
                <option value="">All Printer Models</option>
                <option *ngFor="let printer of allPrinters" [value]="printer">{{ printer }}</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                ▼
              </div>
            </div>
          </div>

        </div>

        <div class="flex justify-between items-center text-xs font-mono text-gray-500 border-t border-neutral-900 pt-4">
          <span>SHOWING {{ filteredItems.length }} OF {{ items.length }} ITEMS</span>
          <button (click)="resetFilters()" class="hover:text-white transition-colors">RESET ALL FILTERS</button>
        </div>
      </div>

      <!-- Grid list -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          *ngFor="let item of filteredItems" 
          class="corporate-card flex flex-col justify-between overflow-hidden"
        >
          <!-- Card Image Section using placeholder photo links -->
          <div class="relative w-full h-48 overflow-hidden border-b border-neutral-900/50">
            <img 
              [src]="item.image" 
              [alt]="'Photo of ' + item.name" 
              class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <span class="absolute bottom-3 left-3 text-[10px] font-mono bg-neutral-950/80 text-gray-400 px-2.5 py-1 rounded-full border border-neutral-800">
              {{ item.subcategory }}
            </span>
          </div>

          <!-- Content Details -->
          <div class="p-6 flex-1 flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              <div class="flex justify-between items-start gap-4">
                <h3 class="text-lg font-bold text-white uppercase tracking-tight">{{ item.name }}</h3>
                <span 
                  [class]="item.stockStatus === 'In Stock' ? 'text-[9px] font-mono bg-emerald-950/40 text-emerald-400 border border-emerald-800/30 px-2.5 py-1 rounded-full font-semibold' : 'text-[9px] font-mono bg-amber-950/40 text-amber-400 border border-amber-800/30 px-2.5 py-1 rounded-full font-semibold'"
                >
                  {{ item.stockStatus }}
                </span>
              </div>

              <!-- Spec list table -->
              <div class="space-y-1 text-xs">
                <div 
                  *ngFor="let spec of item.specs | keyvalue" 
                  class="flex justify-between py-2 border-b border-neutral-900/40 font-medium"
                >
                  <span class="text-gray-500 font-mono">{{ spec.key }}</span>
                  <span class="text-gray-300">{{ spec.value }}</span>
                </div>
              </div>

              <!-- Printer Compatibility tag list -->
              <div *ngIf="item.compatiblePrinters && item.compatiblePrinters.length" class="space-y-2 pt-2">
                <span class="block text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  SUITABLE PRINTER MODELS
                </span>
                <div class="flex flex-wrap gap-1.5">
                  <span 
                    *ngFor="let printer of item.compatiblePrinters" 
                    class="text-[9px] font-semibold bg-neutral-900 text-gray-400 border border-neutral-800 px-2 py-0.5 rounded"
                  >
                    {{ printer }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Footer Quote CTA -->
            <div class="pt-6 border-t border-neutral-900 flex justify-between items-center gap-4">
              <div>
                <span class="block text-[9px] font-mono text-gray-500 uppercase">ACQUISITION</span>
                <span class="text-sm font-extrabold text-white">{{ item.price }}</span>
              </div>
              <a 
                [routerLink]="['/quote']" 
                [queryParams]="{ item: item.name }" 
                class="px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-semibold text-white hover:bg-[#e62e2e] hover:border-[#e62e2e] transition-colors"
              >
                REQUEST QUOTE
              </a>
            </div>
          </div>

        </div>
      </div>

    </div>
  `
})
export class CatalogComponent implements OnInit {
  items: HardwareItem[] = [];
  filteredItems: HardwareItem[] = [];
  
  categories: string[] = ['All', 'Networking Equipment', 'Toners & Cartridges', 'Office Equipment', 'Power & Backup Systems', 'Scanning & POS Hardware', 'Server & Storage Systems', 'CCTV & Security Hardware', 'Audio-Visual & Conference Systems', 'Laptops & Workstations', 'Cabling & Infrastructure', 'Cybersecurity Hardware', 'Access Control & Biometrics', 'Fiber Splicing & Testing', 'Queue Management Hardware', 'IoT & Smart Building Hardware'];
  selectedCategory = 'All';
  
  allPrinters: string[] = [];
  selectedPrinter = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<HardwareItem[]>('/hardware.json').subscribe({
      next: data => {
        this.items = data;
        this.extractPrinterModels();
        this.applyFilters();
      },
      error: err => {
        console.error('Failed to load hardware items', err);
      }
    });
  }

  extractPrinterModels() {
    const printerSet = new Set<string>();
    this.items.forEach(item => {
      if (item.compatiblePrinters) {
        item.compatiblePrinters.forEach(printer => printerSet.add(printer));
      }
    });
    this.allPrinters = Array.from(printerSet).sort();
  }

  setCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredItems = this.items.filter(item => {
      const matchesCategory = this.selectedCategory === 'All' || item.category === this.selectedCategory;
      const matchesPrinter = !this.selectedPrinter || (item.compatiblePrinters && item.compatiblePrinters.includes(this.selectedPrinter));
      return matchesCategory && matchesPrinter;
    });
  }

  resetFilters() {
    this.selectedCategory = 'All';
    this.selectedPrinter = '';
    this.applyFilters();
  }
}
