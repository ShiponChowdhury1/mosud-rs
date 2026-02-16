import {
  NavLink,
  HeroBadge,
  ExperienceCard,
  Tool,
  VisionTab,
  Project,
  MarqueeItem,
  ServiceCard,
  Testimonial,
  FAQItem,
  ContactInfo,
  SocialLink,
} from "@/types";

// ─── Navigation ─────────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About me", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Service", href: "#services" },
  { label: "FAQ", href: "#faq" },
];

// ─── Hero ───────────────────────────────────────────────
export const heroBadges: HeroBadge[] = [
  { label: "UI/UX Designer" },
  { label: "Review Design" },
  { label: "SaaS Design" },
  { label: "Product Design" },
];

// ─── About / Experience ─────────────────────────────────
export const tools: Tool[] = [
  { name: "Figma" },
  { name: "Adobe XD" },
  { name: "Sketch" },
  { name: "Photoshop" },
  { name: "Illustrator" },
  { name: "After Effects" },
];

export const experienceCards: ExperienceCard[] = [
  {
    icon: "Layers",
    title: "Design-First",
    description:
      "I prioritize design-driven solutions ensuring that every product looks good and works seamlessly.",
  },
  {
    icon: "Shield",
    title: "Problem Solver",
    description:
      "I identify complex problems and develop innovative solutions that address real user needs effectively.",
  },
  {
    icon: "Heart",
    title: "User-Centric",
    description:
      "Every pixel serves the user's needs. I craft seamless experiences that feel intuitive and natural.",
  },
  {
    icon: "Zap",
    title: "Efficient",
    description:
      "Delivering high-quality designs on time while maintaining attention to detail in every project.",
  },
];

// ─── Vision Tabs ────────────────────────────────────────
export const visionTabs: VisionTab[] = [
  {
    id: "product",
    label: "Product Design",
    description:
      "Creating user-focused digital solutions from start to finish, including detailed wireframes, interactive prototypes, and user-friendly designs that improve overall satisfaction.",
  },
  {
    id: "uiux",
    label: "UI/UX Design",
    description:
      "Crafting intuitive and engaging user interfaces that emphasize both aesthetics and usability, ensuring your digital products resonate with your target audience.",
  },
  {
    id: "mvp",
    label: "Product MVP Design",
    description:
      "From concept to prototype, I help prioritize features, iterate rapidly, and deliver investor-ready UI for a standout product MVP.",
  },
];

// ─── Projects ───────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 1,
    image: "/projects/project1.jpg",
    category: "Web Application",
    title: "FinFlow Dashboard",
    description:
      "A comprehensive financial analytics dashboard with enterprise-level data visualization and real-time analytics.",
  },
  {
    id: 2,
    image: "/projects/project2.jpg",
    category: "Mobile Application",
    title: "FinFlow Dashboard",
    description:
      "Mobile-first financial management app with intuitive navigation and real-time analytics.",
  },
  {
    id: 3,
    image: "/projects/project3.jpg",
    category: "Web Application",
    title: "FinFlow Dashboard",
    description:
      "A comprehensive financial analytics dashboard with enterprise-level data visualization and real-time analytics.",
  },
  {
    id: 4,
    image: "/projects/project4.jpg",
    category: "Web Application",
    title: "FinFlow Dashboard",
    description:
      "A comprehensive financial analytics dashboard with enterprise-level data visualization and real-time analytics.",
  },
];

// ─── Marquee Items ──────────────────────────────────────
export const marqueeItems: MarqueeItem[] = [
  { label: "UX Design" },
  { label: "Mobile App Design" },
  { label: "Web Design" },
  { label: "HUD Design" },
  { label: "Brand Identity" },
  { label: "Design System" },
];

// ─── Services ───────────────────────────────────────────
export const services: ServiceCard[] = [
  {
    icon: "Monitor",
    title: "Website Design",
    description:
      "Modern, responsive website designs that captivate visitors and drive conversions with seamless user experiences.",
  },
  {
    icon: "Smartphone",
    title: "Mobile App Design",
    description:
      "Intuitive mobile app interfaces designed for iOS and Android platforms with focus on user engagement.",
  },
  {
    icon: "LayoutDashboard",
    title: "Dashboard Design",
    description:
      "Data-rich dashboard interfaces that make complex data easy to understand and actionable for enterprises.",
  },
  {
    icon: "Search",
    title: "User Research",
    description:
      "Research, data-driven user insights that uncover user needs, pain points, and opportunities for improvement.",
  },
  {
    icon: "Box",
    title: "Prototyping",
    description:
      "Interactive prototypes and wireframes that bring your ideas to life and enable fast validation with users.",
  },
  {
    icon: "Gamepad2",
    title: "Game Design",
    description:
      "Crafting immersive HUD, UI designs with intuitive controls and compelling visual design for gaming platforms.",
  },
];

// ─── Testimonials ───────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Martha Augustin",
    role: "Website Design",
    avatar: "/testimonials/avatar1.jpg",
    quote:
      "Working with Mosud was an absolute pleasure. The design quality and attention to detail was exceptional. Highly recommend for any design project.",
  },
  {
    id: 2,
    name: "Martha Augustin",
    role: "Website Design",
    avatar: "/testimonials/avatar2.jpg",
    quote:
      "Excellent work on our website redesign. The user experience improved dramatically and our conversion rates have never been better.",
  },
  {
    id: 3,
    name: "Martha Augustin",
    role: "Website Design",
    avatar: "/testimonials/avatar3.jpg",
    quote:
      "The attention to detail and creative problem-solving made all the difference. Our users love the new interface design.",
  },
];

// ─── FAQ ────────────────────────────────────────────────
export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "What is the process for working with you?",
    answer:
      "The process starts with an initial consultation where we discuss your project goals. I then provide design concepts, followed by revisions based on your feedback. Once the final design is approved, I deliver all the necessary assets.",
  },
  {
    id: 2,
    question: "How do I know which plan is right for my project?",
    answer:
      "I offer flexible plans tailored to different project sizes. During our initial consultation, I'll help you determine the best plan based on your project scope, timeline, and budget requirements.",
  },
  {
    id: 3,
    question:
      "Can I make changes to the design after the final delivery?",
    answer:
      "Yes, I offer revision rounds as part of my design packages. After the final delivery, minor adjustments can be made within the agreed revision period.",
  },
  {
    id: 4,
    question: "What's included in the prototyping service?",
    answer:
      "The prototyping service includes interactive wireframes, clickable prototypes, user flow mapping, and usability testing to validate design decisions before development.",
  },
  {
    id: 5,
    question: "How long will it take to complete my project?",
    answer:
      "Project timelines vary based on complexity. A typical website design takes 2-4 weeks, while larger projects like full product designs can take 6-8 weeks.",
  },
  {
    id: 6,
    question: "What formats will I receive my final design in?",
    answer:
      "You'll receive your designs in multiple formats including Figma files, PNG, SVG, and PDF. I also provide developer handoff documentation with specs and assets.",
  },
];

// ─── Contact Info ───────────────────────────────────────
export const contactInfo: ContactInfo[] = [
  { icon: "Mail", label: "Email", value: "mosudrhs@gmail.com" },
  { icon: "Phone", label: "Phone", value: "+8801639312845" },
  { icon: "MapPin", label: "Location", value: "Dhaka, Bangladesh" },
];

// ─── Social Links ───────────────────────────────────────
export const socialLinks: SocialLink[] = [
  { icon: "Linkedin", href: "#", label: "LinkedIn" },
  { icon: "Twitter", href: "#", label: "Twitter" },
  { icon: "Dribbble", href: "#", label: "Dribbble" },
];
