import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  fovAngle: number;
  range: number;
  bitrate?: number;
}

@Component({
  selector: 'app-cctv',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="space-y-8">
      <!-- Breadcrumb -->
      <div class="page-breadcrumb">
        <a routerLink="/services" class="breadcrumb-back-btn">
          <span>←</span> SERVICES
        </a>
        <span class="text-neutral-600">/</span>
        <span>ZONE PLANNER</span>
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
        
        <!-- Floorplan SVG Panel -->
        <div class="lg:col-span-2 flex flex-col space-y-4">
          <!-- Top Stats Bar -->
          <div class="bg-neutral-900/90 border border-neutral-800/80 px-4 py-3 rounded-lg flex flex-wrap items-center justify-between font-mono text-[10px] text-gray-400 gap-4">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="text-white font-bold">GRID STATUS: NOMINAL</span>
            </div>
            <div class="flex gap-4">
              <span>CHANNELS: <strong class="text-white">{{ activeCameraCount }}/{{ cameras.length }}</strong></span>
              <span>EST. FOOTPRINT COVERAGE: <strong class="text-[#e62e2e]">{{ estimatedCoverage }}%</strong></span>
              <span>NET_OUT: <strong class="text-white">{{ totalBitrate }} Mbps</strong></span>
            </div>
          </div>

          <div class="corporate-card p-6 flex flex-col items-center justify-center min-h-[400px]">
            <span class="text-[10px] font-mono text-gray-500 uppercase tracking-widest self-start mb-4">
              INTERACTIVE OFFICE LAYOUT (CAD BLUEPRINT)
            </span>

            <svg viewBox="0 0 800 500" class="w-full h-auto bg-neutral-950 border border-neutral-900 rounded-lg relative select-none">
              <!-- Grid pattern background inside SVG -->
              <defs>
                <pattern id="svg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(230, 46, 46, 0.015)" stroke-width="1" />
                </pattern>
                <filter id="wall-glow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width="100%" height="100%" fill="url(#svg-grid)" />

              <!-- Outer Boundary Wall (Glowing B2B aesthetic) -->
              <rect x="50" y="50" width="700" height="400" fill="none" stroke="rgba(230, 46, 46, 0.3)" stroke-width="3" filter="url(#wall-glow)" />

              <!-- Room Partitions (CAD Blueprint blocks) -->
              <!-- Server Room -->
              <rect x="50" y="50" width="250" height="150" fill="rgba(230, 46, 46, 0.015)" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
              <!-- Support Lab -->
              <rect x="50" y="200" width="250" height="250" fill="rgba(255,255,255,0.005)" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
              <!-- Loading Bay -->
              <rect x="550" y="50" width="200" height="200" fill="rgba(255,255,255,0.005)" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
              <!-- Executive Suite -->
              <rect x="550" y="250" width="200" height="200" fill="rgba(255,255,255,0.005)" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
              <!-- Main Entrance & Reception -->
              <rect x="300" y="350" width="250" height="100" fill="rgba(230, 46, 46, 0.015)" stroke="rgba(255,255,255,0.08)" stroke-width="2" />

              <!-- Structural Columns (White highlights) -->
              <rect x="296" y="196" width="8" height="8" fill="#ffffff" opacity="0.6" />
              <rect x="546" y="246" width="8" height="8" fill="#ffffff" opacity="0.6" />
              <rect x="296" y="346" width="8" height="8" fill="#ffffff" opacity="0.6" />
              <rect x="546" y="346" width="8" height="8" fill="#ffffff" opacity="0.6" />

              <!-- Interior Technical Details / Visual Props -->
              <!-- Server Racks in Server Room -->
              <g opacity="0.25">
                <rect x="75" y="70" width="15" height="40" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2,2" />
                <rect x="95" y="70" width="15" height="40" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2,2" />
                <rect x="115" y="70" width="15" height="40" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2,2" />
                
                <circle cx="82.5" cy="78" r="1.5" fill="#10b981" />
                <circle cx="82.5" cy="90" r="1.5" fill="#ef4444" />
                <circle cx="102.5" cy="84" r="1.5" fill="#10b981" />
                <circle cx="122.5" cy="95" r="1.5" fill="#10b981" />
              </g>

              <!-- Conference Table in Executive Suite -->
              <g opacity="0.2">
                <ellipse cx="650" cy="350" rx="35" ry="22" fill="none" stroke="#ffffff" stroke-width="1.5" />
                <circle cx="610" cy="350" r="3" fill="#ffffff" />
                <circle cx="690" cy="350" r="3" fill="#ffffff" />
                <circle cx="650" cy="318" r="3" fill="#ffffff" />
                <circle cx="650" cy="382" r="3" fill="#ffffff" />
              </g>

              <!-- Workbenches in Support Lab -->
              <g opacity="0.18">
                <rect x="80" y="240" width="60" height="20" fill="none" stroke="#ffffff" stroke-width="1.5" />
                <rect x="80" y="280" width="60" height="20" fill="none" stroke="#ffffff" stroke-width="1.5" />
                <rect x="80" y="320" width="60" height="20" fill="none" stroke="#ffffff" stroke-width="1.5" />
              </g>

              <!-- Dock Bays in Loading Area -->
              <g opacity="0.2">
                <line x1="720" y1="90" x2="720" y2="210" stroke="#ffffff" stroke-width="1" stroke-dasharray="3,3" />
                <rect x="670" y="125" width="40" height="20" fill="none" stroke="#ffffff" stroke-width="1" />
                <rect x="670" y="165" width="40" height="20" fill="none" stroke="#ffffff" stroke-width="1" />
              </g>

              <!-- Door Symbols & Swings -->
              <!-- Server Room Door Swing -->
              <path d="M 300 130 L 280 110 A 20 20 0 0 0 300 150" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
              <rect x="298" y="128" width="4" height="24" fill="#0b0f17" />
              <!-- Lab Door Swing -->
              <path d="M 180 200 L 160 180 A 20 20 0 0 0 200 200" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
              <rect x="178" y="198" width="24" height="4" fill="#0b0f17" />
              <!-- Main Entrance Swing (Double door) -->
              <path d="M 425 450 L 405 470 A 20 20 0 0 0 425 450" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />
              <path d="M 425 450 L 445 470 A 20 20 0 0 1 425 450" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />
              <rect x="398" y="447" width="54" height="6" fill="#0b0f17" />

              <!-- Room Labels -->
              <text x="175" y="125" fill="#718096" font-family="Outfit" font-size="11" font-weight="600" text-anchor="middle" letter-spacing="1">SERVER ROOM</text>
              <text x="650" y="150" fill="#718096" font-family="Outfit" font-size="11" font-weight="600" text-anchor="middle" letter-spacing="1">LOADING BAY</text>
              <text x="425" y="410" fill="#718096" font-family="Outfit" font-size="11" font-weight="600" text-anchor="middle" letter-spacing="1">MAIN ENTRANCE</text>
              <text x="175" y="325" fill="#718096" font-family="Outfit" font-size="11" font-weight="600" text-anchor="middle" letter-spacing="1">SUPPORT LAB</text>
              <text x="650" y="350" fill="#718096" font-family="Outfit" font-size="11" font-weight="600" text-anchor="middle" letter-spacing="1">EXECUTIVE SUITE</text>
              <text x="425" y="210" fill="#718096" font-family="Outfit" font-size="11" font-weight="600" text-anchor="middle" letter-spacing="1">CENTRAL CORRIDOR</text>

              <!-- Render Coverage Cones for Active Cameras -->
              <g *ngFor="let cam of cameras">
                <path 
                  *ngIf="cam.status === 'active'"
                  [attr.d]="cam.conePath"
                  [attr.fill]="selectedCamera.id === cam.id ? 'rgba(230, 46, 46, 0.16)' : 'rgba(230, 46, 46, 0.08)'"
                  [attr.stroke]="selectedCamera.id === cam.id ? '#ffffff' : 'rgba(230, 46, 46, 0.35)'"
                  stroke-width="1.5"
                  [attr.stroke-dasharray]="selectedCamera.id === cam.id ? '0' : '3,3'"
                />
              </g>

              <!-- Camera Nodes -->
              <g 
                *ngFor="let cam of cameras" 
                (click)="selectCamera(cam)" 
                class="cursor-pointer"
              >
                <!-- Outer selection highlight ring -->
                <circle 
                  [attr.cx]="cam.x" 
                  [attr.cy]="cam.y" 
                  r="18" 
                  [attr.fill]="selectedCamera.id === cam.id ? 'rgba(230, 46, 46, 0.15)' : 'transparent'"
                  [attr.stroke]="selectedCamera.id === cam.id ? '#e62e2e' : 'transparent'"
                  stroke-width="1"
                />
                
                <!-- Camera Outer ring -->
                <circle 
                  [attr.cx]="cam.x" 
                  [attr.cy]="cam.y" 
                  r="8" 
                  [attr.fill]="cam.status === 'active' ? '#e62e2e' : '#2d3748'"
                  [attr.stroke]="selectedCamera.id === cam.id ? '#ffffff' : '#4a5568'"
                  stroke-width="1.5"
                />
                
                <!-- Blinking green/red active core dot -->
                <circle 
                  *ngIf="cam.status === 'active'"
                  [attr.cx]="cam.x" 
                  [attr.cy]="cam.y" 
                  r="3.5" 
                  fill="#ffffff" 
                  class="animate-ping"
                />

                <!-- Camera ID label tag -->
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
                <span class="w-2.5 h-2.5 rounded-full bg-[#e62e2e]"></span> Active Channel
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-[#2d3748] border border-neutral-700"></span> Offline Channel
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-3.5 h-2.5 border border-dashed border-[#e62e2e] bg-[#e62e2e]/10"></span> Coverage Field
              </div>
            </div>
          </div>
        </div>

        <!-- Details, Simulation & Calibration Panel -->
        <div class="space-y-6">
          
          <!-- Live Feed Simulator -->
          <div class="corporate-card p-4 space-y-4">
            <span class="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
              LIVE SIMULATION RECORD
            </span>

            <div class="relative w-full h-44 bg-black rounded-lg overflow-hidden border border-neutral-800">
              <!-- Grid & Scanline overlay -->
              <div class="absolute inset-0 pointer-events-none z-10 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]"></div>
              
              <!-- CRT flickering/grain effect -->
              <div class="absolute inset-0 pointer-events-none z-10 opacity-[0.03] bg-repeat" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E');"></div>

              <!-- Active Camera feed -->
              <div *ngIf="selectedCamera.status === 'active'" class="w-full h-full flex flex-col justify-between p-3 bg-neutral-900/80 text-white font-mono text-[9px] relative">
                <!-- CCTV Target box corners -->
                <div class="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/40"></div>
                <div class="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/40"></div>
                <div class="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/40"></div>
                <div class="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/40"></div>
                
                <div class="flex justify-between items-start z-20">
                  <div class="flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#e62e2e] animate-ping"></span>
                    <span class="text-[#e62e2e] font-bold">● REC</span>
                    <span class="text-white/60 ml-1">{{ selectedCamera.id }}</span>
                  </div>
                  <div class="text-white/60">{{ currentTimeString }}</div>
                </div>

                <!-- Animated scanline marker -->
                <div class="absolute left-0 right-0 h-[1px] bg-white/20 animate-[pulse_2s_infinite]"></div>

                <div class="flex flex-col items-center justify-center flex-grow text-center text-white/50 text-[10px] uppercase font-bold tracking-widest gap-1 py-4">
                  <span class="text-white text-xs">{{ selectedCamera.name }}</span>
                  <span class="text-[9px] font-normal text-white/40">Feed Signal Nominal</span>
                </div>

                <div class="flex justify-between items-end z-20 text-white/60">
                  <div>RES: {{ selectedCamera.resolution }}</div>
                  <div>{{ selectedCamera.bitrate || 6200 }} Kbps</div>
                </div>
              </div>

              <!-- Offline Camera feed (Color bars test pattern) -->
              <div *ngIf="selectedCamera.status === 'inactive'" class="w-full h-full flex flex-col justify-between items-center bg-black relative">
                <!-- Color bars grid background -->
                <div class="absolute inset-0 grid grid-cols-7 h-[75%]">
                  <div class="bg-gray-200"></div>
                  <div class="bg-yellow-400"></div>
                  <div class="bg-cyan-400"></div>
                  <div class="bg-emerald-500"></div>
                  <div class="bg-magenta-500"></div>
                  <div class="bg-red-500"></div>
                  <div class="bg-blue-600"></div>
                </div>
                <!-- Bottom black and blue banner -->
                <div class="absolute bottom-0 left-0 right-0 h-[25%] bg-neutral-900 border-t border-neutral-800 flex justify-between px-3 items-center text-white/40 font-mono text-[8px]">
                  <span>{{ selectedCamera.id }}</span>
                  <span>SIGNAL LOST / DISCONNECTED</span>
                  <span>404 ERR</span>
                </div>
                
                <!-- Central NO SIGNAL banner -->
                <div class="z-20 my-auto bg-black/90 border border-neutral-800 px-4 py-1.5 rounded text-white font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-lg">
                  <span class="w-2 h-2 rounded-full bg-red-600"></span>
                  NO SIGNAL
                </div>
              </div>
            </div>
          </div>

          <!-- Calibration & Adjustments -->
          <div class="corporate-card p-6 space-y-4">
            <span class="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
              CALIBRATION: {{ selectedCamera.id }}
            </span>
            
            <div class="space-y-4">
              <!-- Azimuth (Rotation) -->
              <div class="space-y-1.5">
                <div class="flex justify-between text-[11px] font-mono">
                  <span class="text-gray-400">AZIMUTH DIRECTION</span>
                  <span class="text-white font-bold">{{ selectedCamera.coneRotation }}°</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  [(ngModel)]="selectedCamera.coneRotation" 
                  (input)="onSliderChange()"
                  class="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#e62e2e]"
                />
              </div>

              <!-- Field of View (FOV Angle) -->
              <div class="space-y-1.5">
                <div class="flex justify-between text-[11px] font-mono">
                  <span class="text-gray-400">FIELD ANGLE (FOV)</span>
                  <span class="text-white font-bold">{{ selectedCamera.fovAngle }}°</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="120" 
                  [(ngModel)]="selectedCamera.fovAngle" 
                  (input)="onSliderChange()"
                  class="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#e62e2e]"
                />
              </div>

              <!-- Focal Range (Radius) -->
              <div class="space-y-1.5">
                <div class="flex justify-between text-[11px] font-mono">
                  <span class="text-gray-400">DETECTION RANGE</span>
                  <span class="text-white font-bold">{{ selectedCamera.range }}px</span>
                </div>
                <input 
                  type="range" 
                  min="80" 
                  max="250" 
                  [(ngModel)]="selectedCamera.range" 
                  (input)="onSliderChange()"
                  class="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#e62e2e]"
                />
              </div>
            </div>
          </div>

          <!-- Specifications Panel -->
          <div class="corporate-card p-6 space-y-6">
            <span class="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
              SPECIFICATIONS: {{ selectedCamera.id }}
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

            <div class="border-t border-neutral-900 pt-4 space-y-2 font-mono text-xs">
              <div class="flex justify-between py-1 border-b border-neutral-900/50">
                <span class="text-gray-500">Resolution</span>
                <span class="text-white">{{ selectedCamera.resolution }}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-neutral-900/50">
                <span class="text-gray-500">Lens Type</span>
                <span class="text-white">{{ selectedCamera.focalLength }}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-neutral-900/50">
                <span class="text-gray-500">Framerate</span>
                <span class="text-white">{{ selectedCamera.fps }}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-neutral-900/50">
                <span class="text-gray-500">Operation Status</span>
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
                [queryParams]="{ item: 'CCTV Deployment Zone: ' + selectedCamera.id + ' (' + selectedCamera.location + ')' }"
                class="block w-full text-center btn-primary text-xs"
              >
                REQUEST SETUP IN THIS ZONE
              </a>
            </div>
          </div>

          <!-- Dynamic Grid Alerts Feed -->
          <div class="corporate-card p-6 space-y-4">
            <span class="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
              DYNAMIC GRID ALERTS
            </span>
            <div class="space-y-2">
              <div 
                *ngFor="let alert of activeAlerts"
                class="border border-[#e62e2e]/25 bg-[#e62e2e]/5 px-3 py-2 rounded text-[10px] font-mono text-gray-300 flex items-start gap-2"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#e62e2e] mt-1 shrink-0"></span>
                <span>{{ alert }}</span>
              </div>
              <div 
                *ngIf="activeAlerts.length === 0"
                class="border border-neutral-800 bg-neutral-900/20 px-3 py-2 rounded text-[10px] font-mono text-gray-500 text-center"
              >
                NO SYSTEM ALERTS
              </div>
            </div>
          </div>

          <!-- Bulk System Controls -->
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
export class CctvComponent implements OnInit, OnDestroy {
  simulationInterval: any;
  currentTimeString = '';

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
      coneRotation: 270, // Pointing up
      conePath: '',
      fovAngle: 108,
      range: 160,
      bitrate: 6800
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
      x: 100,
      y: 110,
      coneRotation: 45, // Down-Right
      conePath: '',
      fovAngle: 84,
      range: 140,
      bitrate: 5400
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
      x: 650,
      y: 125,
      coneRotation: 135, // Down-Left
      conePath: '',
      fovAngle: 90,
      range: 150,
      bitrate: 7200
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
      coneRotation: 30, // Pointing down-rightish
      conePath: '',
      fovAngle: 90,
      range: 130,
      bitrate: 0
    }
  ];

  selectedCamera: CameraNode = this.cameras[0];

  ngOnInit() {
    this.cameras.forEach(cam => {
      this.updateConePath(cam);
    });

    this.currentTimeString = this.formatDate(new Date());

    // Simulation interval for bitrate updates and clock ticks
    this.simulationInterval = setInterval(() => {
      this.currentTimeString = this.formatDate(new Date());
      this.cameras.forEach(cam => {
        if (cam.status === 'active') {
          const current = cam.bitrate || 6000;
          const delta = Math.floor(Math.random() * 800) - 400; // Walk value
          cam.bitrate = Math.max(3500, Math.min(10500, current + delta));
        } else {
          cam.bitrate = 0;
        }
      });
    }, 1000);
  }

  ngOnDestroy() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
    }
  }

  selectCamera(cam: CameraNode) {
    this.selectedCamera = cam;
  }

  toggleActiveStatus(cam: CameraNode) {
    cam.status = cam.status === 'active' ? 'inactive' : 'active';
  }

  setAllStatus(status: 'active' | 'inactive') {
    this.cameras.forEach(cam => {
      cam.status = status;
    });
  }

  onSliderChange() {
    this.updateConePath(this.selectedCamera);
  }

  updateConePath(cam: CameraNode) {
    const range = cam.range;
    const fov = cam.fovAngle;
    const rotation = cam.coneRotation;

    // Calculate dynamic slice paths relative to node position
    const startAngleRad = (rotation - fov / 2) * Math.PI / 180;
    const endAngleRad = (rotation + fov / 2) * Math.PI / 180;

    const x1 = cam.x + range * Math.cos(startAngleRad);
    const y1 = cam.y + range * Math.sin(startAngleRad);
    const x2 = cam.x + range * Math.cos(endAngleRad);
    const y2 = cam.y + range * Math.sin(endAngleRad);

    const largeArcFlag = fov > 180 ? 1 : 0;

    cam.conePath = `M ${cam.x} ${cam.y} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${range} ${range} 0 ${largeArcFlag} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
  }

  private formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const sec = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`;
  }

  // Getters for dynamic stats dashboard
  get activeCameraCount(): number {
    return this.cameras.filter(c => c.status === 'active').length;
  }

  get totalBitrate(): string {
    const kbps = this.cameras.reduce((sum, cam) => sum + (cam.bitrate || 0), 0);
    return (kbps / 1000).toFixed(2);
  }

  get estimatedCoverage(): number {
    const active = this.activeCameraCount;
    if (active === 4) return 100;
    if (active === 3) return 78;
    if (active === 2) return 52;
    if (active === 1) return 25;
    return 0;
  }

  get activeAlerts(): string[] {
    const alerts: string[] = [];
    const active = this.cameras.filter(c => c.status === 'active').map(c => c.id);

    if (active.includes('CAM-01') && active.includes('CAM-04')) {
      alerts.push('RECEPTION / CORRIDOR OVERLAP: Cross-line validation logic active.');
    }
    if (active.includes('CAM-02') && active.includes('CAM-04')) {
      alerts.push('SECURE REGION OVERLAP: High-priority transition monitoring active.');
    }
    if (active.includes('CAM-03') && active.length >= 3) {
      alerts.push('PERIMETER GRID SYNCED: Dock-bay tracking active.');
    }
    if (active.length === 4) {
      alerts.push('OPTIMAL FOOTPRINT: 100% facility coverage active.');
    }
    if (active.length === 0) {
      alerts.push('SYSTEM WARNING: All cameras disconnected from central hub.');
    }
    return alerts;
  }
}

