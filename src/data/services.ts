export interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string;
  folderPath: string;
  themeColor: string;
  gradient: string;
  features: string[];
  section1: { title: string; subtitle: string };
  section2: { title: string; subtitle: string };
  detailsSection: { title: string; description: string; imageAlt: string };
}

export const services: Service[] = [
  {
    id: "ai-automation",
    name: "AI Automation",
    tagline: "Smarter workflows, instant results.",
    description: "Automate business processes using cutting-edge AI solutions.",
    folderPath: "/images/ai-automation",
    themeColor: "#00FFFF",
    gradient: "linear-gradient(135deg, #00FFFF 0%, #0080FF 100%)",
    features: ["Workflow automation", "Custom AI models", "Integration-ready"],
    section1: { title: "AI Automation", subtitle: "Smarter workflows, instant results." },
    section2: { title: "Boost Efficiency", subtitle: "Let AI handle repetitive tasks so your team can focus on strategy." },
    detailsSection: { title: "AI-Powered Solutions", description: "We design custom AI systems tailored to your business processes, increasing productivity and reducing errors.", imageAlt: "AI Automation" }
  },
  {
    id: "social-media",
    name: "Social Media Management",
    tagline: "Engage, grow, convert.",
    description: "End-to-end social media strategy, content, and growth management.",
    folderPath: "/images/social-media",
    themeColor: "#FF00FF",
    gradient: "linear-gradient(135deg, #FF00FF 0%, #FF80FF 100%)",
    features: ["Content creation", "Analytics tracking", "Engagement growth"],
    section1: { title: "Social Media Management", subtitle: "Engage, grow, convert." },
    section2: { title: "Brand Amplification", subtitle: "We grow your social presence with content that converts." },
    detailsSection: { title: "Complete Social Strategy", description: "From planning to execution, we manage your social campaigns across all platforms.", imageAlt: "Social Media Management" }
  },
  {
    id: "website-development",
    name: "Website Development",
    tagline: "Your digital storefront.",
    description: "Responsive, fast, and beautiful websites tailored for your brand.",
    folderPath: "/images/website-development",
    themeColor: "#00FF80",
    gradient: "linear-gradient(135deg, #00FF80 0%, #008040 100%)",
    features: ["Responsive Design", "Performance Optimized", "SEO Ready"],
    section1: { title: "Website Development", subtitle: "Your digital storefront." },
    section2: { title: "Modern Design", subtitle: "We build websites that are fast, responsive, and engaging." },
    detailsSection: { title: "Custom Web Solutions", description: "Every website is tailored to your brand identity and customer experience.", imageAlt: "Website Development" }
  },
  {
    id: "mobile-app",
    name: "Mobile App Development",
    tagline: "Apps that engage and convert.",
    description: "Custom mobile apps for iOS and Android that scale with your business.",
    folderPath: "/images/mobile-app",
    themeColor: "#FF8000",
    gradient: "linear-gradient(135deg, #FF8000 0%, #FF4000 100%)",
    features: ["iOS & Android", "UI/UX Design", "Performance Optimized"],
    section1: { title: "Mobile App Development", subtitle: "Apps that engage and convert." },
    section2: { title: "Native & Cross-platform", subtitle: "High-quality apps built for maximum user engagement." },
    detailsSection: { title: "Custom Mobile Solutions", description: "We develop apps that align perfectly with your business goals.", imageAlt: "Mobile App Development" }
  },
  {
    id: "whatsapp-automation",
    name: "WhatsApp Automation",
    tagline: "Customer engagement, simplified.",
    description: "Automate communication, lead management, and support via WhatsApp.",
    folderPath: "/images/whatsapp-automation",
    themeColor: "#25D366",
    gradient: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
    features: ["Chatbots", "Customer Support", "Lead Automation"],
    section1: { title: "WhatsApp Automation", subtitle: "Customer engagement, simplified." },
    section2: { title: "Smart Messaging", subtitle: "Automate responses, follow-ups, and notifications efficiently." },
    detailsSection: { title: "AI-Powered WhatsApp Bots", description: "We integrate automation with WhatsApp for seamless customer communication.", imageAlt: "WhatsApp Automation" }
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    tagline: "Reach, convert, grow.",
    description: "Data-driven marketing campaigns that generate measurable ROI.",
    folderPath: "/images/digital-marketing",
    themeColor: "#FF4081",
    gradient: "linear-gradient(135deg, #FF4081 0%, #C51162 100%)",
    features: ["SEO", "PPC", "Content Marketing", "Analytics"],
    section1: { title: "Digital Marketing", subtitle: "Reach, convert, grow." },
    section2: { title: "Maximize ROI", subtitle: "Campaigns designed to increase visibility, engagement, and conversions." },
    detailsSection: { title: "End-to-End Marketing", description: "From strategy to execution, we handle all aspects of your digital marketing.", imageAlt: "Digital Marketing" }
  },
  {
    id: "tech-consulting",
    name: "Tech Consulting",
    tagline: "Strategic technology guidance.",
    description: "Expert consulting to align technology with your business goals.",
    folderPath: "/images/tech-consulting",
    themeColor: "#8040FF",
    gradient: "linear-gradient(135deg, #8040FF 0%, #4000FF 100%)",
    features: ["Strategy Planning", "System Architecture", "AI & Automation Advice"],
    section1: { title: "Tech Consulting", subtitle: "Strategic technology guidance." },
    section2: { title: "Expert Advice", subtitle: "We provide insights to optimize your technology and processes." },
    detailsSection: { title: "Business-Driven Tech Strategy", description: "Our consulting helps you leverage technology for growth and efficiency.", imageAlt: "Tech Consulting" }
  }
];
