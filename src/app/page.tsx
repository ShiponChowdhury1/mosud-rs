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
    <main className="bg-[#1B1B1B] min-h-screen">
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
    </main>
  );
}
