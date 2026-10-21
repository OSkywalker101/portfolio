import Hero from "@/components/Hero";
import Arsenal from "@/components/Arsenal";
import Projects from "@/components/Projects";
import Uplink from "@/components/Uplink";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#030303] min-h-screen">
      <Hero />
      <Arsenal />
      <Projects />
      <Uplink />
      <Achievements />
      <Footer />
    </main>
  );
}