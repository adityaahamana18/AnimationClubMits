// Centralized Club Configuration & Data Store
// Easy to update events, team members, gallery items, and club links!

const CLUB_CONFIG = {
  clubName: "Animation Club, MITS Gwalior",
  college: "Madhav Institute of Technology & Science, Gwalior",
  tagline: "A creative playground for animators, designers, editors, storytellers, and digital creators.",
  logoUrl: "assets/images/club-logo.png",
  socials: {
    instagram: "https://instagram.com/animationclub_mits", // Configure official link
    linkedin: "https://linkedin.com", // Configure official link
    youtube: "https://youtube.com",   // Configure official link
    discord: "https://discord.gg",    // Configure official link
    github: "https://github.com",
    email: "animationclub@mitsgwalior.in"
  },
  recruitment: {
    isOpen: true, // Toggle to false when recruitment closes
    formUrl: "https://forms.google.com", // Replace with official Google Form link
    closedMessage: "Recruitment is currently closed for this term. Follow us on Instagram for upcoming audition & recruitment announcements!"
  }
};

// Events Data
const EVENTS_DATA = [
  {
    id: "frame-shift",
    title: "FRAME SHIFT — Creative Animation & Meme Challenge",
    category: "Featured Event",
    status: "past", // 'upcoming' or 'past'
    date: "Annual Flagship Event",
    venue: "MITS Campus & Online Submissions",
    description: "The ultimate showdown of motion storytelling, experimental 2D/3D clips, frame-by-frame animation, and viral creative meme edits. Judged on creativity, timing, and narrative impact.",
    badge: "Flagship Challenge",
    gradient: "linear-gradient(135deg, #7928CA 0%, #FF0080 50%, #FF4D00 100%)",
    posterSvg: "frameshift",
    actionLink: "gallery.html",
    actionText: "View Highlights & Entries"
  },
  {
    id: "motion-workshop",
    title: "After Effects & Motion Design Boot Camp",
    category: "Workshop",
    status: "upcoming",
    date: "Upcoming • Dates to be announced",
    venue: "CAD / Multimedia Lab & Virtual Meet",
    description: "Deep dive into kinetic typography, easing curves, keyframing theory, and visual styling for high-impact social and commercial reels.",
    badge: "Hands-on Workshop",
    gradient: "linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #ec4899 100%)",
    posterSvg: "workshop",
    actionLink: "https://forms.google.com",
    actionText: "Pre-Register / Notify Me"
  },
  {
    id: "blender-3d",
    title: "3D Animation & Stylized Worlds with Blender",
    category: "Masterclass",
    status: "upcoming",
    date: "Upcoming • Weekend Series",
    venue: "Seminar Hall & Discord Live",
    description: "From polygonal modeling and grease pencil 2.5D techniques to stylized lighting and camera choreography. Zero prior 3D experience required.",
    badge: "Skill Session",
    gradient: "linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fbbf24 100%)",
    posterSvg: "blender",
    actionLink: "https://forms.google.com",
    actionText: "Join Waitlist"
  },
  {
    id: "music-jam",
    title: "Visual Jamming & Lo-Fi Beat Sync Sessions",
    category: "Community Jam",
    status: "past",
    date: "Monthly Creative Mixer",
    venue: "Student Activity Center & Campus Lawns",
    description: "An impromptu audio-visual jam session where animators pair with campus music producers to live-generate rhythm-synced visualizers and short loops.",
    badge: "Club Mixer",
    gradient: "linear-gradient(135deg, #09090b 0%, #3b0764 50%, #9333ea 100%)",
    posterSvg: "musicjam",
    actionLink: "gallery.html",
    actionText: "Watch Jam Loops"
  }
];

// Creative Domains Data
const DOMAINS_DATA = [
  {
    id: "2d-anim",
    title: "2D Animation",
    icon: "film",
    number: "01",
    desc: "Frame-by-frame character acting, stylized anime cuts, looping character vignettes, and expressive vector motion.",
    tags: ["Toon Boom", "Krita", "After Effects", "Clip Studio"]
  },
  {
    id: "3d-anim",
    title: "3D Animation",
    icon: "box",
    number: "02",
    desc: "Stylized characters, environments, hard-surface renders, simulation dynamics, and cinematic lighting setups.",
    tags: ["Blender", "Cinema 4D", "Spline", "Maya"]
  },
  {
    id: "video-editing",
    title: "Video Editing",
    icon: "scissors",
    number: "03",
    desc: "Seamless pace-matching, sound design, hyper-edits, narrative cutting, color grading, and viral short-form storytelling.",
    tags: ["Premiere Pro", "DaVinci Resolve", "CapCut Pro"]
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    icon: "sparkles",
    number: "04",
    desc: "Dynamic kinetic type, title sequences, UI motion experiments, broadcast visual packages, and smooth vector morphs.",
    tags: ["After Effects", "Cavalry", "Lottie", "Rive"]
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    icon: "palette",
    number: "05",
    desc: "Brutalism, experimental Swiss typography, poster art, visual identities, brand systems, and editorial magazine layouts.",
    tags: ["Photoshop", "Illustrator", "Figma", "Typography"]
  },
  {
    id: "digital-art",
    title: "Digital Art & Illustration",
    icon: "brush",
    number: "06",
    desc: "Concept art, digital matte painting, expressive character design, custom stickers, and vibrant web illustrations.",
    tags: ["Procreate", "Photoshop", "Graphics Tablets"]
  },
  {
    id: "content-creation",
    title: "Content Creation",
    icon: "video",
    number: "07",
    desc: "High-retention storytelling, reel scripting, creative vlogging, meme culture curation, and behind-the-scenes vids.",
    tags: ["Scripting", "Hooks", "Directing", "Trend Analysis"]
  },
  {
    id: "creative-tech",
    title: "Creative Tech & Code",
    icon: "code-2",
    number: "08",
    desc: "Generative canvas experiments, shaders, Three.js 3D web scenes, interactive creative micro-sites, and generative AI art exploration.",
    tags: ["Three.js", "WebGL", "GSAP", "TouchDesigner"]
  },
  {
    id: "marketing-social",
    title: "Marketing & Socials",
    icon: "trending-up",
    number: "09",
    desc: "Multi-platform outreach campaigns, community growth hacks, engagement funnels, and viral social strategies.",
    tags: ["Social Strategy", "Analytics", "Copywriting", "Branding"]
  },
  {
    id: "event-hosting",
    title: "Event Hosting & Operations",
    icon: "mic",
    number: "10",
    desc: "Curating creative workshops, stage hosting, hackathon moderation, club logistics, and student community onboarding.",
    tags: ["Stage Presence", "Coordination", "Logistics", "Community"]
  }
];

// Creative Gallery Data
const GALLERY_DATA = [
  {
    id: 1,
    title: "CYBER NEON 2026",
    category: "motion",
    categoryLabel: "Motion Graphics",
    author: "Animation Club Studio",
    desc: "Futuristic kinetic typography loop exploring glow diffusion and beat-reactive displacement.",
    color: "#6b21a8",
    aspect: "tall"
  },
  {
    id: 2,
    title: "MITS Robo Mascot 3D",
    category: "3d",
    categoryLabel: "3D Animation",
    author: "Aditya Ahamana & Team",
    desc: "Stylized character model with squash-and-stretch rig and custom hand-painted textures.",
    color: "#ea580c",
    aspect: "square"
  },
  {
    id: 3,
    title: "Frame Shift Poster Experiment",
    category: "posters",
    categoryLabel: "Posters & Design",
    author: "Design Cell",
    desc: "Risograph-inspired brutalist typography poster for the annual animation showdown.",
    color: "#0f172a",
    aspect: "tall"
  },
  {
    id: 4,
    title: "Anime Action Cut — Frame by Frame",
    category: "2d",
    categoryLabel: "2D Animation",
    author: "Club 2D Unit",
    desc: "24-fps fluid sword slash sequence with custom impact frames and smear drawing passes.",
    color: "#db2777",
    aspect: "wide"
  },
  {
    id: 5,
    title: "Exam Week Survival Lore",
    category: "memes",
    categoryLabel: "Memes & Edits",
    author: "Meme Wing",
    desc: "Motion-tracked campus video edit featuring high-speed sound bites and pop-culture references.",
    color: "#16a34a",
    aspect: "square"
  },
  {
    id: 6,
    title: "The Floating Architect",
    category: "art",
    categoryLabel: "Digital Art",
    author: "Illustration Wing",
    desc: "Surreal digital concept art portraying Gwalior Fort floating in an ethereal cloud city.",
    color: "#2563eb",
    aspect: "tall"
  },
  {
    id: 7,
    title: "Dynamic Beat Synced Reel",
    category: "edits",
    categoryLabel: "Video Edits",
    author: "Editing Guild",
    desc: "Paced music synchronization with seamless whip-pans, speed ramping, and ambient foley.",
    color: "#d97706",
    aspect: "wide"
  },
  {
    id: 8,
    title: "Fluid Ink Sim — TouchDesigner",
    category: "motion",
    categoryLabel: "Creative Tech",
    author: "Creative Tech Lab",
    desc: "Procedural particle simulation reacting to live microphone inputs and frequency bands.",
    color: "#7c3aed",
    aspect: "square"
  }
];

// Structured Team Data categorized by Hierarchy
const TEAM_SECTIONS = {
  faculty: [
    {
      name: "Dr. Tejaswita Mishra",
      role: "Faculty Coordinator",
      dept: "Department of Architecture & Design / Engineering",
      badge: "Faculty Mentor",
      bio: "Guiding the Animation Club's creative and technical evolution, providing institutional mentorship, and empowering student initiatives.",
      icon: "graduation-cap",
      socials: {
        email: "mailto:animationclub@mitsgwalior.in"
      }
    },
    {
      name: "Dr. Shradha Dubey",
      role: "Faculty Coordinator",
      dept: "Faculty Advisor, MITS Gwalior",
      badge: "Faculty Mentor",
      bio: "Facilitating institute resources, inter-departmental collaborations, and fostering academic excellence in digital media arts.",
      icon: "graduation-cap",
      socials: {
        email: "mailto:animationclub@mitsgwalior.in"
      }
    }
  ],
  president: [
    {
      name: "Aditya Ahamana",
      role: "President",
      badge: "Club President",
      bio: "Spearheading the club’s artistic roadmap, directing collaborative shorts, and fostering an inclusive playground for MITS creators.",
      icon: "crown",
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
        github: "https://github.com"
      }
    }
  ],
  vicePresidents: [
    {
      name: "Mritunjay Mishra",
      role: "Vice President",
      badge: "Vice President",
      bio: "Driving inter-domain creative pipelines, technical animation reviews, and production workflows for club projects.",
      icon: "shield",
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    },
    {
      name: "Akshi Galav",
      role: "Vice President",
      badge: "Vice President",
      bio: "Coordinating creative storytelling initiatives, member development programs, and artistic collaborations.",
      icon: "shield",
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    }
  ],
  secretary: [
    {
      name: "Ronak Gupta",
      role: "Secretary",
      badge: "Core Secretariat",
      bio: "Managing club documentation, inter-society official communications, meeting protocols, and executive affairs.",
      icon: "file-text",
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    }
  ],
  treasurers: [
    {
      name: "Anshika Bansal",
      role: "Treasurer",
      badge: "Core Finance",
      bio: "Overseeing fiscal planning, sponsorship budgeting, financial auditing, and resource allocation for fests and workshops.",
      icon: "wallet",
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    },
    {
      name: "Pragati Jain",
      role: "Treasurer",
      badge: "Core Finance",
      bio: "Managing club expenditure accounts, event budgets, asset acquisitions, and financial transparency.",
      icon: "wallet",
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    }
  ],
  promotions: [
    {
      name: "Pranshu Gupta",
      role: "Promotions & Outreach",
      badge: "Promotions Lead",
      bio: "Curating viral social media campaigns, campus hype activations, content scheduling, and audience engagement.",
      icon: "megaphone",
      socials: {
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com"
      }
    },
    {
      name: "Yuvraj Singh Rajput",
      role: "Promotions & Outreach",
      badge: "Promotions Lead",
      bio: "Driving multi-platform promotional strategies, student community relations, and outreach for club fests.",
      icon: "megaphone",
      socials: {
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com"
      }
    }
  ],
  graphicDesigners: [
    {
      name: "Sparsh Tamrakar",
      role: "Graphic Designer",
      badge: "Design Wing",
      bio: "Crafting bold poster layouts, event identities, typography systems, and experimental visual merchandise.",
      icon: "palette",
      socials: {
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com"
      }
    },
    {
      name: "Kratik Patil",
      role: "Graphic Designer",
      badge: "Design Wing",
      bio: "Designing promotional banners, digital creative assets, vector illustrations, and brand visual guidelines.",
      icon: "palette",
      socials: {
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com"
      }
    }
  ]
};
