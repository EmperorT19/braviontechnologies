import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CameraNode {
  id: string;
  name: string;
  location: string;
  resolution: string;
  focalLength: string;
  fps: string;
  viewAngle: string;
  status: 'active' | 'inactive';
  description: string;
  x: number;
  y: number;
  coneRotation: number;
  conePath: string;
}

@Component({
  selector: 'app-cctv',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="space-y-8">
      <!-- Breadcrumb -->
      <div class="page-breadcrumb">
        <a routerLink="/services" class="breadcrumb-back-btn">
          <span>←</span> SERVICES
        </a>
        <span class="text-neutral-600">/</span>
        <span>02A / ZONE PLANNER</span>
      </div>

      <!-- Hero Header -->
      <header class="space-y-3">
        <span class="section-label">CAMERA DEPLOYMENT VISUALIZATION</span>
        <h1 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">ZONE PLANNER & COVERAGE MAP</h1>
        <p class="text-gray-400 max-w-2xl text-sm leading-relaxed">
          Interactive planning tool. Select camera nodes on the corporate floorplan schematic below to visualize fields-of-view, angles, and overlapping angles.
        </p>
      </header>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Floorplan SVG -->
        <div class="lg:col-span-2 corporate-card p-6 flex flex-col items-center justify-center min-h-[400px]">
          <span class="text-[10px] font-mono text-gray-500 uppercase tracking-widest self-start mb-4">
            INTERACTIVE OFFICE LAYOUT
          </span>

          <svg viewBox="0 0 800 500" class="w-full h-auto bg-neutral-950 border border-neutral-900 rounded-lg relative select-none">
            <!-- Grid pattern background inside SVG -->
            <defs>
              <pattern id="svg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.02)" stroke-width="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#svg-grid)" />

            <!-- Walls Outline (Outer) -->
            <rect x="50" y="50" width="700" height="400" fill="none" stroke="#2d3748" stroke-width="3" />

            <!-- Room Partitions -->
            <!-- Server Room -->
            <line x1="50" y1="200" x2="300" y2="200" stroke="#2d3748" stroke-width="2" />
            <line x1="300" y1="50" x2="300" y2="200" stroke="#2d3748" stroke-width="2" />
            
            <!-- Loading Bay -->
            <line x1="550" y1="50" x2="550" y2="250" stroke="#2d3748" stroke-width="2" />
            <line x1="550" y1="250" x2="750" y2="250" stroke="#2d3748" stroke-width="2" />

            <!-- Reception / Entrance -->
            <line x1="300" y1="350" x2="550" y2="350" stroke="#2d3748" stroke-width="2" />
            <line x1="300" y1="350" x2="300" y2="450" stroke="#2d3748" stroke-width="2" />
            <line x1="550" y1="350" x2="550" y2="450" stroke="#2d3748" stroke-width="2" />

            <!-- Door Gaps (Visual indicators) -->
            <rect x="285" y="100" width="30" height="15" fill="#0b0f17" />
            <rect x="150" y="193" width="40" height="15" fill="#0b0f17" />
            <rect x="535" y="120" width="30" height="15" fill="#0b0f17" />
            <rect x="400" y="343" width="50" height="15" fill="#0b0f17" />

            <!-- Room Labels -->
            <text x="175" y="125" fill="#718096" font-family="Outfit" font-size="11" font-weight="600" text-anchor="middle" letter-spacing="1">SERVER ROOM</text>
            <text x="650" y="150" fill="#718096" font-family="Outfit" font-size="11" font-weight="600" text-anchor="middle" letter-spacing="1">LOADING BAY</text>
            <text x="425" y="405" fill="#718096" font-family="Outfit" font-size="11" font-weight="600" text-anchor="middle" letter-spacing="1">MAIN ENTRANCE</text>
            <text x="175" y="325" fill="#718096" font-family="Outfit" font-size="11" font-weight="600" text-anchor="middle" letter-spacing="1">SUPPORT LAB</text>
            <text x="650" y="350" fill="#718096" font-family="Outfit" font-size="11" font-weight="600" text-anchor="middle" letter-spacing="1">EXECUTIVE SUITE</text>
            <text x="425" y="210" fill="#718096" font-family="Outfit" font-size="11" font-weight="600" text-anchor="middle" letter-spacing="1">CENTRAL CORRIDOR</text>

            <!-- Render Coverage Cones for Active Cameras -->
            <g *ngFor="let cam of cameras">
              <path 
                *ngIf="cam.status === 'active'"
                [attr.d]="cam.conePath"
                [attr.transform]="'rotate(' + cam.coneRotation + ', ' + cam.x + ', ' + cam.y + ')'"
                fill="rgba(230, 46, 46, 0.12)"
                stroke="rgba(230, 46, 46, 0.35)"
                stroke-width="1.5"
                stroke-dasharray="3,3"
              />
            </g>

            <!-- Render Intersecting/Overlap Alert Nodes if multiple are active -->
            <circle 
              *ngIf="cameras[0].status === 'active' && cameras[3].status === 'active'"
              cx="360" cy="240" r="15" 
              fill="none" stroke="#e62e2e" stroke-width="1" class="animate-pulse" 
            />
            <text 
              *ngIf="cameras[0].status === 'active' && cameras[3].status === 'active'"
              x="360" y="220" fill="#e62e2e" font-family="JetBrains Mono" font-size="9" text-anchor="middle"
            >
              OVERLAP ZONE
            </text>

            <!-- Camera Nodes -->
            <g 
              *ngFor="let cam of cameras" 
              (click)="selectCamera(cam)" 
              class="cursor-pointer"
            >
              <!-- Outer hover ring -->
              <circle 
                [attr.cx]="cam.x" 
                [attr.cy]="cam.y" 
                r="18" 
                [attr.fill]="selectedCamera.id === cam.id ? 'rgba(230, 46, 46, 0.15)' : 'transparent'"
                [attr.stroke]="selectedCamera.id === cam.id ? '#e62e2e' : 'transparent'"
                stroke-width="1"
              />
              
              <!-- Camera Core Circle -->
              <circle 
                [attr.cx]="cam.x" 
                [attr.cy]="cam.y" 
                r="8" 
                [attr.fill]="cam.status === 'active' ? '#e62e2e' : '#2d3748'"
                [attr.stroke]="selectedCamera.id === cam.id ? '#ffffff' : '#4a5568'"
                stroke-width="1.5"
              />
              
              <!-- Blinking dot for active status -->
              <circle 
                *ngIf="cam.status === 'active'"
                [attr.cx]="cam.x" 
                [attr.cy]="cam.y" 
                r="3" 
                fill="#ffffff" 
                class="animate-ping"
              />

              <!-- Camera Name Tag -->
              <text 
                [attr.x]="cam.x" 
                [attr.y]="cam.y - 12" 
                fill="#ffffff" 
                font-family="Outfit" 
                font-size="10" 
                font-weight="bold"
                text-anchor="middle"
              >
                {{ cam.id }}
              </text>
            </g>
          </svg>
          
          <div class="flex gap-4 mt-4 font-mono text-[10px] text-gray-500">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#e62e2e]"></span> Active Cam
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#2d3748] border border-neutral-700"></span> Inactive Cam
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 border border-dashed border-[#e62e2e] bg-[#e62e2e]/10"></span> Coverage Field
            </div>
          </div>
        </div>

        <!-- Details & Operations Panel -->
        <div class="space-y-6">
          
          <!-- Selected Node Details -->
          <div class="corporate-card p-6 space-y-6">
            <span class="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
              DEVICE SPECIFICATIONS: {{ selectedCamera.id }}
            </span>
            
            <div class="space-y-2">
              <span class="text-xs font-mono text-gray-400">DESIGNATION</span>
              <h3 class="text-xl font-bold text-white uppercase">{{ selectedCamera.name }}</h3>
              <span class="text-[10px] font-mono text-[#e62e2e] uppercase block font-bold">
                ZONE: {{ selectedCamera.location }}
              </span>
            </div>

            <p class="text-xs text-gray-400 leading-relaxed font-medium">
              {{ selectedCamera.description }}
            </p>

            <!-- Spec list -->
            <div class="border-t border-neutral-900 pt-4 space-y-2 font-mono text-xs">
              <div class="flex justify-between py-1 border-b border-neutral-900/50">
                <span class="text-gray-500">Resolution</span>
                <span class="text-white">{{ selectedCamera.resolution }}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-neutral-900/50">
                <span class="text-gray-500">Focal Length</span>
                <span class="text-white">{{ selectedCamera.focalLength }}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-neutral-900/50">
                <span class="text-gray-500">Framerate</span>
                <span class="text-white">{{ selectedCamera.fps }}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-neutral-900/50">
                <span class="text-gray-500">Field Angle</span>
                <span class="text-white">{{ selectedCamera.viewAngle }}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-neutral-900/50">
                <span class="text-gray-500">Status</span>
                <button 
                  (click)="toggleActiveStatus(selectedCamera)"
                  [class]="selectedCamera.status === 'active' ? 'text-emerald-400 font-bold hover:text-white transition-colors' : 'text-gray-500 font-bold hover:text-white transition-colors'"
                >
                  {{ selectedCamera.status.toUpperCase() }} (TOGGLE)
                </button>
              </div>
            </div>

            <!-- CTA -->
            <div class="pt-2">
              <a 
                [routerLink]="['/quote']"
                [queryParams]="{ item: 'CCTV Deployment Zone: ' + selectedCamera.id }"
                class="block w-full text-center btn-primary text-xs"
              >
                REQUEST SETUP IN THIS ZONE
              </a>
            </div>
          </div>

          <!-- Simulation controls -->
          <div class="corporate-card p-6 space-y-4">
            <span class="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
              BULK SYSTEM CONTROLS
            </span>
            <div class="grid grid-cols-2 gap-3">
              <button 
                (click)="setAllStatus('active')" 
                class="px-3 py-2 rounded-lg border border-neutral-800 text-[10px] font-mono uppercase text-white bg-neutral-900 hover:bg-[#e62e2e] hover:border-[#e62e2e] transition-colors"
              >
                ACTIVATE ALL
              </button>
              <button 
                (click)="setAllStatus('inactive')" 
                class="px-3 py-2 rounded-lg border border-neutral-800 text-[10px] font-mono uppercase text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
              >
                DEACTIVATE ALL
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  `
})
export class CctvComponent {
  cameras: CameraNode[] = [
    {
      id: 'CAM-01',
      name: 'Wide-Angle Entry Dome',
      location: 'Main Reception & Entrance Door',
      resolution: '4K Ultra-HD (8 Megapixel)',
      focalLength: '2.8mm fixed lens',
      fps: '30 fps',
      viewAngle: '108° horizontal sweep',
      status: 'active',
      description: 'Covers main personnel entrance points. Provides facial-recognition level clarity for entry audit logs.',
      x: 425,
      y: 440,
      coneRotation: 0,
      conePath: 'M 425 440 L 320 300 A 160 160 0 0 1 530 300 Z'
    },
    {
      id: 'CAM-02',
      name: 'Critical Infrastructure Cam',
      location: 'Server Room Rack Row A',
      resolution: '8MP Wide Dynamic Range',
      focalLength: '4.0mm fixed lens',
      fps: '25 fps',
      viewAngle: '84° horizontal sweep',
      status: 'active',
      description: 'Monitors hardware racks and local console switches. Low-lux thermal imaging mode enabled.',
      x: 60,
      y: 60,
      coneRotation: 0,
      conePath: 'M 60 60 L 220 60 A 160 160 0 0 1 170 170 Z'
    },
    {
      id: 'CAM-03',
      name: 'PTZ Perimeter Tracker',
      location: 'Loading Bay Gate Area',
      resolution: '4K Optical Varifocal Zoom',
      focalLength: '4.7mm - 94mm PTZ',
      fps: '30 fps',
      viewAngle: 'Variable (Auto sweep)',
      status: 'active',
      description: 'Continuous patrol pattern covering truck bays and main vehicle ingress gates. Integrated plate reader.',
      x: 740,
      y: 60,
      coneRotation: 0,
      conePath: 'M 740 60 L 580 90 A 165 165 0 0 0 660 210 Z'
    },
    {
      id: 'CAM-04',
      name: 'Corridor Security Module',
      location: 'Central Corridor / Lab Entryway',
      resolution: '5MP Panoramic Dome',
      focalLength: '3.6mm fixed lens',
      fps: '25 fps',
      viewAngle: '90° horizontal sweep',
      status: 'inactive',
      description: 'Provides operational coverage between primary rooms. Links access card readers with timestamp logs.',
      x: 310,
      y: 210,
      coneRotation: 0,
      conePath: 'M 310 210 L 460 120 A 150 150 0 0 1 460 300 Z'
    }
  ];

  selectedCamera: CameraNode = this.cameras[0];

  selectCamera(cam: CameraNode) {
    this.selectedCamera = cam;
  }

  toggleActiveStatus(cam: CameraNode) {
    cam.status = cam.status === 'active' ? 'inactive' : 'active';
  }

  setAllStatus(status: 'active' | 'inactive') {
    this.cameras.forEach(cam => cam.status = status);
  }
}
