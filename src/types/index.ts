// Navigation
export interface NavLink {
  label: string;
  href: string;
}

// Hero
export interface HeroButton {
  label: string;
  href: string;
  variant: "primary" | "outline";
}

export interface HeroBadge {
  label: string;
}

// About / Experience
export interface Tool {
  name: string;
}

export interface ExperienceCard {
  icon: string;
  title: string;
  description: string;
}

// Vision / Services Tab
export interface VisionTab {
  id: string;
  label: string;
  description: string;
}

// Project
export interface Project {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  figmaUrl?: string;
}

// Marquee
export interface MarqueeItem {
  label: string;
}

// Service Card
export interface ServiceCard {
  icon: string;
  title: string;
  description: string;
}

// Testimonial
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

// FAQ
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// Contact Info
export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
}

// Social Link
export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

// Footer Link
export interface FooterLink {
  label: string;
  href: string;
}
