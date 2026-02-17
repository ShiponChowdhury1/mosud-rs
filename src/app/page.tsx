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
    <main className="relative bg-[#1B1B1B] min-h-screen">
      {/* Green gradient glow – left */}
      <div className="pointer-events-none fixed top-0 left-0 h-full w-[45%] bg-[radial-gradient(ellipse_at_0%_50%,rgba(120,245,11,0.20)_0%,transparent_70%)]" />
      {/* Green gradient glow – right */}
      <div className="pointer-events-none fixed top-0 right-0 h-full w-[55%] bg-[radial-gradient(ellipse_at_100%_50%,rgba(120,245,11,0.40)_0%,transparent_70%)]" />

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
