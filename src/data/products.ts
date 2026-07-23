import { ProductItem } from '../types';

export const PRODUCTS_LIST: ProductItem[] = [
  {
    id: "wellpath",
    name: "WellPath",
    subtitle: "Closed-loop preventive-health navigation",
    description: "Connects Queenslanders with verified free or low-cost preventive health programs through intelligent navigation.",
    category: "Preventive Health & Care Navigation",
    logoUrl: "",
    statusBadge: "Queensland Pilot Platform",
    statusBadgeColor: "gold",
    websiteUrl: "https://wellpath-queensland.ai.studio",
    isFeatured: true,
    keyFeatures: [
      "Closed-loop goal tracking & referral milestone navigation",
      "Explainable program matching based on access & cost preferences"
    ],
    techCapabilities: [
      "Bounded AI engine",
      "Encrypted user vault",
      "Automated follow-ups"
    ]
  },
  {
    id: "tryon-beauty",
    name: "TryOn Beauty (Kobella)",
    subtitle: "Real-time AR virtual makeup & face-tracking",
    description: "AR virtual try-ons, shade matching, and event styling assistant available publicly on the Apple App Store.",
    category: "AR & Computer Vision",
    logoUrl: "",
    statusBadge: "App Store Published",
    statusBadgeColor: "emerald",
    isPublishedOnAppStore: true,
    appStoreUrl: "https://apps.apple.com/au/app/tryon-beauty/id6759636767",
    isFeatured: true,
    keyFeatures: [
      "Real-time 3D facial landmark rendering at 60fps",
      "Precision shade matching & AR product preview engine"
    ],
    techCapabilities: [
      "On-device neural vision",
      "Color accuracy engine",
      "iOS Metal shader runtime"
    ]
  },
  {
    id: "education-revolution",
    name: "Education Revolution",
    subtitle: "Adaptive planning & study momentum tools",
    description: "Adaptive planners, flashcards, and motivational streak systems helping students maintain consistent academic growth.",
    category: "Education & Productivity",
    logoUrl: "",
    statusBadge: "Active Platform",
    statusBadgeColor: "blue",
    isFeatured: true,
    keyFeatures: [
      "Adaptive study schedule generator based on exam timelines",
      "Spaced repetition flashcards & motivational streak analytics"
    ],
    techCapabilities: [
      "AI concept explainer",
      "Real-time state sync",
      "Study habit metrics"
    ]
  },
  {
    id: "repairsync",
    name: "RepairSync",
    subtitle: "Repair services & dispatch tech platform",
    description: "Automated service intake, diagnostic logging, technician dispatch, and real-time repair status updates.",
    category: "Repair Services & Fleet Tech",
    logoUrl: "",
    statusBadge: "Live Tech Platform",
    statusBadgeColor: "purple",
    websiteUrl: "https://repairsync.ai.studio",
    isFeatured: true,
    keyFeatures: [
      "Automated service intake & job diagnostic logging",
      "Real-time customer status alerts & technician dispatch"
    ],
    techCapabilities: [
      "Cloud job queue dispatch",
      "Automated SMS triggers",
      "Technician portal"
    ]
  },
  {
    id: "clickdin",
    name: "Clickdin",
    subtitle: "Digital networking & local discovery platform",
    description: "Connects local professionals, service providers, and organisations through verified digital interactions.",
    category: "Networking & Discovery",
    logoUrl: "",
    statusBadge: "Live Web Platform",
    statusBadgeColor: "emerald",
    websiteUrl: "https://clickdin.qld.one",
    isFeatured: true,
    keyFeatures: [
      "Verified local business directory & capability showcase",
      "Interactive connection request pipeline & direct messaging"
    ],
    techCapabilities: [
      "Directory graph DB",
      "Encrypted messaging",
      "Trust scoring engine"
    ]
  },
  {
    id: "seen-media",
    name: "Seen Media",
    subtitle: "Digital signage & advertising network",
    description: "Manage displays, schedule playlist media, and launch targeted screen campaigns across real-world venues.",
    category: "Digital Out-of-Home SaaS",
    logoUrl: "",
    statusBadge: "Signage Network",
    statusBadgeColor: "purple",
    websiteUrl: "https://seen-media-938630466467.us-west1.run.app",
    isFeatured: true,
    keyFeatures: [
      "Multi-display remote playlist schedule manager",
      "Real-time screen health telemetry & automated sync"
    ],
    techCapabilities: [
      "4K video stream hardware decoding",
      "Cloud edge offline sync",
      "Screen health telemetry"
    ]
  }
];

export const UPCOMING_PRODUCTS_LIST: ProductItem[] = [
  {
    id: "washworks",
    name: "WashWorks",
    subtitle: "On-demand fleet washing & service management",
    description: "Streamlined dispatch and scheduling system for fleet washing, mobile detailing, and equipment maintenance operations.",
    category: "Fleet & Service Management",
    logoUrl: "",
    statusBadge: "Coming Soon",
    statusBadgeColor: "gold",
    isUpcoming: true,
    keyFeatures: [
      "On-demand route dispatch for mobile detailing crews",
      "Fleet maintenance logs & automated recurring wash schedules"
    ],
    techCapabilities: [
      "Geospatial route optimization",
      "Customer SMS dispatch API"
    ]
  },
  {
    id: "messagewise",
    name: "MessageWise",
    subtitle: "Communication clarity & empathy assistant",
    description: "A communication intelligence tool helping users phrase messages with clarity, tone awareness, and empathy.",
    category: "Communication Intelligence",
    logoUrl: "",
    statusBadge: "In Development",
    statusBadgeColor: "blue",
    isUpcoming: true,
    keyFeatures: [
      "Real-time empathy tone gauge prior to sending messages",
      "Conflict de-escalation & clarity phrase suggestions"
    ],
    techCapabilities: [
      "Context-aware prompt conditioning",
      "Tone classification NLP"
    ]
  },
  {
    id: "smsbackup",
    name: "SMSbackup",
    subtitle: "Automated SMS archiving & compliance utility",
    description: "Secure cloud backup and archival utility for mobile messages, compliance export logs, and restoration.",
    category: "Messaging Utility & Security",
    logoUrl: "",
    statusBadge: "Coming Soon",
    statusBadgeColor: "gold",
    isUpcoming: true,
    keyFeatures: [
      "Encrypted automated SMS & MMS cloud backup",
      "Searchable conversation archive with PDF/CSV export"
    ],
    techCapabilities: [
      "Zero-knowledge encrypted storage vault",
      "Background sync worker"
    ]
  }
];
