import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface ServiceItem {
  id: string | number;
  title: string;
  category: string;
  image: string;
  description: string;
  tagline: string;
  features?: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  categories: string[] = [
    'All',
    'Strategy & Governance',
    'Software & Cloud',
    'Emerging Tech',
    'Security & Smart Systems',
    'Marketing & Communications',
    'Industry Solutions'
  ];
  selectedCategory: string = 'All';

  services: ServiceItem[] = [
    // Original Services
    {
      id: 'srv-cctv',
      title: "CCTV SURVEILLANCE SYSTEMS",
      category: "Security & Smart Systems",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=60",
      description: "Site assessment, camera placement logic, cabling (Cat6/Coaxial), NVR/DVR installation, power supply distribution, and remote network access configuration.",
      tagline: "See everything. Protect what matters.",
      features: [
        "IP and Analog camera deployment",
        "Thermal & Night-Vision configuration",
        "Motion detection & notification zoning",
        "Secure central server storage setup"
      ]
    },
    {
      id: 'srv-access',
      title: "ACCESS CONTROL & BIOMETRIC SYSTEMS",
      category: "Security & Smart Systems",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=60",
      description: "Design and deployment of biometric access control, turnstiles, RFID smart card locks, and automated time attendance tracking systems integrated with local ERP and HR platforms.",
      tagline: "Manage access, record attendance, secure your space.",
      features: [
        "Biometric & Facial Recognition scanners",
        "RFID Smart Card lock integration",
        "Turnstiles & Speed-gate installations",
        "Real-time clocking and HR system sync"
      ]
    },
    {
      id: 'srv-office',
      title: "OFFICE MACHINE SERVICES",
      category: "Software & Cloud",
      image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&auto=format&fit=crop&q=60",
      description: "Installation, troubleshooting, and component replacement for multi-function printers, scanners, laminators, and shredders. Split into Hardware repairs and Software/Network integration.",
      tagline: "Zero downtime for your office hardware.",
      features: [
        "Paper path cleaning & roller swaps",
        "Firmware updates & network scanning setup",
        "Diagnostic checks & hardware troubleshooting",
        "Toner/ink level automated alerts configuration"
      ]
    },
    {
      id: 'srv-procurement',
      title: "PROCUREMENT & SUPPLY",
      category: "Strategy & Governance",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60",
      description: "Volume sourcing of office machines, custom hardware specs, SLA contract negotiation, and group-wide consumable fulfillment schedules.",
      tagline: "Volume supply, compliance, and guaranteed value.",
      features: [
        "Bravion Printers group capacity sourcing",
        "Compliance audit documentation",
        "Direct manufacturer warranty channels",
        "Dedicated account managers"
      ]
    },

    // New 22 Services
    {
      id: 1,
      title: "STRATEGIC ICT CONSULTING",
      category: "Strategy & Governance",
      image: "/assets/Services2.png",
      description: "Bravion provides strategic ICT consulting services that help organizations align technology with mission. From digital transformation roadmaps to ICT governance, we guide institutions toward smarter, integrated systems. Our consulting spans architecture design, project management, and risk assessments. We ensure that every ICT investment delivers value, compliance, and impact.",
      tagline: "Planning tech like strategy. Executing it like art."
    },
    {
      id: 2,
      title: "MONITORING & EVALUATION (M&E)",
      category: "Strategy & Governance",
      image: "/assets/Services3.png",
      description: "We design and implement robust M&E systems to measure results, track progress, and inform policy. We deliver end-to-end services—from theory of change and indicators to evaluations and reporting tools. Our capacity-building efforts empower stakeholders to own their M&E frameworks. With digital tools and RBM methodologies, we foster transparency and accountability.",
      tagline: "Measure what matters. Improve what counts."
    },
    {
      id: 3,
      title: "MARKET RESEARCH & DATA ANALYTICS",
      category: "Strategy & Governance",
      image: "/assets/Services4.png",
      description: "Our company delivers market intelligence and analytical insights to support evidence-based decision-making. We conduct surveys, segmentation, impact assessments, and socio-economic studies for diverse sectors. Our tools include real-time dashboards and visualization platforms that make complex data actionable. From field to policy, we turn insight into strategy.",
      tagline: "See the data. Lead the change."
    },
    {
      id: 4,
      title: "STRATEGIC PLANNING & ORGANIZATIONAL DEVELOPMENT",
      category: "Strategy & Governance",
      image: "/assets/slide13.png",
      description: "Bravion helps organizations design forward-looking strategic plans and development frameworks that turn vision into action. Through participatory approaches, evidence-based analysis, and tools like SWOT, PESTEL, and Balanced Scorecard, we deliver practical, measurable, and sustainable strategies. From institutional assessments and stakeholder consultations to drafting, validation, and implementation, we ensure each plan strengthens governance, builds capacity, and provides a clear road map for long-term growth and impact.",
      tagline: "With Bravion, strategy is not just written — it is lived, measured, and achieved."
    },
    {
      id: 5,
      title: "CYBERSECURITY & RISK MANAGEMENT",
      category: "Security & Smart Systems",
      image: "/assets/Services1.png",
      description: "Our team delivers comprehensive cybersecurity solutions that protect digital assets, infrastructure, and users across sectors. From strategy development and security architecture to vulnerability assessments and compliance audits, we ensure organizations stay resilient in the face of evolving threats. We integrate threat intelligence, advanced encryption, and continuous monitoring to defend against both internal and external risks. In the event of a breach, Bravion provides rapid incident response, forensic analysis, and recovery planning to restore trust and operations.",
      tagline: "Secure today. Resilient tomorrow."
    },
    {
      id: 6,
      title: "SOFTWARE DEVELOPMENT & INTEGRATION",
      category: "Software & Cloud",
      image: "/assets/Services5.png",
      description: "Tailored software solutions that solve real-world problems. From enterprise-grade systems to lean mobile applications, our development approach focuses on scalability, security, and user experience. We utilize agile methodologies to deliver iterative results that evolve with client needs. We also specialize in system integration—connecting legacy platforms with modern technologies to ensure seamless workflows. Whether developing from scratch or customizing off-the-shelf tools, Bravion ensures technology aligns with your mission.",
      tagline: "Empowering your vision through reliable, intelligent code."
    },
    {
      id: 7,
      title: "ARTIFICIAL INTELLIGENCE & MACHINE LEARNING",
      category: "Emerging Tech",
      image: "/assets/Services6.png",
      description: "At Bravion, we transform data into intelligence. Our AI/ML solutions help organizations predict outcomes, automate operations, and make smarter decisions. From predictive analytics to intelligent document processing, we leverage state-of-the-art algorithms to meet sector-specific needs. We tailor models to solve challenges in agriculture, health, logistics, finance, and beyond. With responsible AI at the core, Bravion balances innovation with ethics, ensuring transparency, fairness, and inclusivity.",
      tagline: "From data to decisions—smarter, faster, fairer."
    },
    {
      id: 8,
      title: "CLOUD COMPUTING & INFRASTRUCTURE",
      category: "Software & Cloud",
      image: "/assets/Services7.png",
      description: "Our dedicated team guides clients through every stage of cloud transformation. We offer migration, deployment, and infrastructure management services for public, private, and hybrid cloud models. Our approach maximizes cost-efficiency, security, and operational agility. With tools like Kubernetes, Docker, and serverless computing, we modernize IT ecosystems to meet evolving demands. We also ensure compliance with local and global data protection standards.",
      tagline: "Your infrastructure, unchained and optimized in the cloud."
    },
    {
      id: 9,
      title: "INTERNET OF THINGS (IOT) & IIOT",
      category: "Emerging Tech",
      image: "/assets/Services8.png",
      description: "We design, deploy, and manage IoT systems that connect the physical world to digital insights. From smart cities to remote agriculture, Bravion enables real-time monitoring and automation through sensor networks, edge computing, and robust analytics. In the industrial realm (IIoT), we help clients track assets, streamline logistics, and boost productivity. All solutions are built with scalability, security, and interoperability in mind.",
      tagline: "Connecting everything, understanding anything."
    },
    {
      id: 10,
      title: "UX/UI & DIGITAL EXPERIENCE DESIGN",
      category: "Software & Cloud",
      image: "/assets/Services9.png",
      description: "User experience is central to every digital product we create. Bravion's design team crafts intuitive interfaces that elevate usability, accessibility, and visual appeal. We conduct user research, prototyping, and usability testing to refine each experience. Our designs are not just beautiful—they're purposeful, aligning with audience behavior and business goals. Whether for mobile apps, dashboards, or web platforms, we make interactions effortless and impactful.",
      tagline: "Designs that speak. Experiences that stick."
    },
    {
      id: 11,
      title: "DIGITAL MARKETING & GROWTH STRATEGIES",
      category: "Marketing & Communications",
      image: "/assets/Services10.png",
      description: "We help organizations attract, engage, and retain their audience across digital platforms. Bravion offers SEO, social media marketing, email campaigns, content strategy, and performance analytics tailored to your objectives. Our strategies are data-driven, ensuring continuous optimization and measurable results. From donor engagement to product sales, we craft campaigns that deliver impact.",
      tagline: "From visibility to virality—let's grow."
    },
    {
      id: 12,
      title: "OPEN SOURCE SOLUTIONS",
      category: "Software & Cloud",
      image: "/assets/Services11.png",
      description: "Bravion advocates for open-source as a powerful engine for innovation and cost-efficiency. We customize, deploy, and support leading open-source platforms across content management, data analytics, ERP, and education. Open-source reduces vendor lock-in and increases transparency. We ensure secure configurations, ongoing updates, and community-aligned practices for sustainability.",
      tagline: "Freedom, flexibility, and performance—open to your future."
    },
    {
      id: 13,
      title: "ROBOTICS & AUTOMATION",
      category: "Emerging Tech",
      image: "/assets/Services12.png",
      description: "We engineer automation systems that reduce human error, increase throughput, and cut operational costs. From robotic process automation (RPA) in admin workflows to physical robots in agriculture and industry, Bravion delivers efficiency at scale. We also integrate sensors, actuators, and AI for intelligent automation across sectors. Our solutions are tailored to function in challenging environments with reliability.",
      tagline: "Repetitive tasks? Let machines handle them."
    },
    {
      id: 14,
      title: "AUGMENTED REALITY (AR) & VIRTUAL REALITY (VR)",
      category: "Emerging Tech",
      image: "/assets/Services13.png",
      description: "Our team uses immersive technologies to create interactive learning, simulation, and experience environments. We develop AR/VR solutions for training, tourism, education, health, and citizen engagement. Whether it's a virtual clinic or an augmented smart city tour, we merge storytelling with technology to captivate and educate.",
      tagline: "Enter new worlds. Solve real problems."
    },
    {
      id: 15,
      title: "GAME DEVELOPMENT",
      category: "Emerging Tech",
      image: "/assets/Services14.png",
      description: "We builds games for entertainment, education, and social impact. Our multidisciplinary team handles concept design, storytelling, coding, art, and monetization. We also specialize in serious games—tailored for civic education, climate awareness, or health training. All our games are built to engage, inform, and inspire.",
      tagline: "Playful by nature. Purposeful by design."
    },
    {
      id: 16,
      title: "ERP IMPLEMENTATION & CUSTOMIZATION",
      category: "Software & Cloud",
      image: "/assets/Services15.png",
      description: "Bravion helps organizations streamline operations with customized ERP solutions. We implement modules across finance, HR, procurement, inventory, and more, ensuring alignment with organizational goals. Our support includes training, localization, data migration, and performance tuning—offering both proprietary and open-source ERP platforms.",
      tagline: "Total visibility. Total control."
    },
    {
      id: 17,
      title: "IT SUPPORT & MANAGED SERVICES",
      category: "Software & Cloud",
      image: "/assets/Services16.png",
      description: "Our IT support services keep your tech systems running smoothly. From helpdesk support to proactive maintenance and system upgrades, Bravion ensures operational continuity. We also offer managed services including remote monitoring, backups, patching, and SLA-based support—freeing you to focus on core activities.",
      tagline: "We manage IT so you can manage progress."
    },
    {
      id: 18,
      title: "EDTECH & E-LEARNING PLATFORMS",
      category: "Industry Solutions",
      image: "/assets/Services17.png",
      description: "Developing digital learning platforms that empower educators and learners. From LMS setup to content creation, we support both formal education and lifelong learning programs. We also provide analytics, gamification, and mobile access to ensure engagement and inclusivity. Our platforms can be localized for national curricula or NGO-based training.",
      tagline: "Learning without limits."
    },
    {
      id: 19,
      title: "HEALTHTECH & DIGITAL HEALTH",
      category: "Industry Solutions",
      image: "/assets/Services18.png",
      description: "Bravion builds digital solutions to strengthen health systems. We develop EMRs, telemedicine apps, health reporting dashboards, and patient tracking tools that are secure and interoperable. Our tools improve service delivery, supply chain visibility, disease surveillance, and remote diagnostics—especially in underserved regions.",
      tagline: "Healthy systems. Healthier communities."
    },
    {
      id: 20,
      title: "COMMUNICATIONS",
      category: "Marketing & Communications",
      image: "/assets/Services19.png",
      description: "We design communication ecosystems that inform, inspire, and influence. We help governments, organizations, and institutions craft compelling narratives, manage public sentiment, and spark genuine connections through stunning visuals, strategic media placements, and real-time social engagement. Whether you're telling a story or defending your image — we help your voice lead the conversation.",
      tagline: "Bravion — Where your story finds its spotlight."
    },
    {
      id: 21,
      title: "BRANDING & BRAND MANAGEMENT",
      category: "Marketing & Communications",
      image: "/assets/Services20.png",
      description: "Our company goes beyond design — we build meaning. Our branding experts shape bold visual identities, define authentic voice and tone, and develop brand systems that scale across platforms and regions. When challenges arise, we step in with precision, offering strategic communication and media control to protect your legacy.",
      tagline: "Bravion — Build bold. Stand strong."
    },
    {
      id: 22,
      title: "TRADITIONAL MARKETING",
      category: "Marketing & Communications",
      image: "/assets/Services21.png",
      description: "We blend creative storytelling with market intelligence to breathe new life into traditional formats. From headline-grabbing print ads to jingles that echo across regions and billboards that command attention, we craft campaigns that meet audiences where they are — offline, on air, and in person.",
      tagline: "Bravion — We make old-school unforgettable."
    }
  ];

  filteredServices: ServiceItem[] = [];

  constructor() {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.applyFilter();
  }

  setCategory(cat: string): void {
    this.selectedCategory = cat;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.selectedCategory === 'All') {
      this.filteredServices = this.services;
    } else {
      this.filteredServices = this.services.filter(s => s.category === this.selectedCategory);
    }
  }

  isEven(index: number): boolean {
    return index % 2 === 0;
  }
}
