import { Navbar, Footer } from "@/components/shared";
import {
  Hero,
  About,
  Vision,
  Projects,
  Marquee,
  Services,
  Testimonials,
  FAQ,
  CTA,
  Contact,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="relative bg-white dark:bg-[#1B1B1B] min-h-screen transition-colors duration-300">
      {/* Green gradient glow – left (dark only) */}
      <div className="pointer-events-none fixed top-0 left-0 h-full w-[45%] opacity-0 dark:opacity-100 bg-[radial-gradient(ellipse_at_0%_50%,rgba(120,245,11,0.15)_0%,transparent_70%)] transition-opacity duration-300" />
      {/* Green gradient glow – right (dark only) */}
      <div className="pointer-events-none fixed top-0 right-0 h-full w-[55%] opacity-0 dark:opacity-100 bg-[radial-gradient(ellipse_at_100%_50%,rgba(120,245,11,0.25)_0%,transparent_70%)] transition-opacity duration-300" />

      <div className="relative z-10">
      <Navbar />
      <Hero />
      <About />
      <Vision />
      <Projects />
      <Marquee />
      <Services />
      <Testimonials />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
      </div>
    </main>
  );
}
