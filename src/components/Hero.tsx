import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import networkInstaller from "@/assets/network-installer.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={networkInstaller}
          alt="Network technician installing cabling in a server room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80 md:bg-primary/70" />
        <div className="absolute inset-0 circuit-pattern" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-5 py-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-xs font-bold uppercase tracking-widest">Malawi's Trusted Tech Partner</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-8">
            Transforming Business Through{" "}
            <span className="text-accent">Smart Solutions.</span>
          </h1>

          <p className="text-white/80 text-lg md:text-2xl max-w-2xl mb-12 leading-relaxed font-medium">
            We deliver premium IT, consulting, and integrated business services that empower Malawian enterprises to scale with confidence.
          </p>

          <div className="flex flex-wrap gap-5">
            <a href="/#services">
              <Button className="bg-accent text-accent-foreground hover:bg-gold-light rounded-full px-10 py-7 text-lg font-bold shadow-2xl shadow-accent/30 gap-3 group transition-all">
                Our Services <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="/#contact">
              <Button
                variant="outline"
                className="rounded-full px-10 py-7 text-lg font-bold border-white/30 text-white hover:bg-white hover:text-primary gap-3 transition-all"
              >
                <MessageCircle size={20} /> Contact Us
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
