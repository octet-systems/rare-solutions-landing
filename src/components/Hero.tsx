import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center bg-primary circuit-pattern overflow-hidden">
      {/* Abstract decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 md:pt-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-sm font-medium">Malawi's Trusted Tech Partner</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6">
              Transforming Business Through{" "}
              <span className="text-accent">Smart Solutions.</span>
            </h1>

            <p className="text-primary-foreground/70 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
              We deliver IT, consulting, and integrated business services that help Malawian enterprises grow with confidence.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#services">
                <Button className="bg-accent text-accent-foreground hover:bg-gold-light rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-accent/25 gap-2">
                  Our Services <ArrowRight size={18} />
                </Button>
              </a>
              <a href="#contact">
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 text-base font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50 gap-2"
                >
                  <MessageCircle size={18} /> Contact Us
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right - Abstract Tech Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-[420px] h-[420px]">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent" />
              </div>
              {/* Middle ring */}
              <div className="absolute inset-10 rounded-full border border-accent/10 animate-[spin_15s_linear_infinite_reverse]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-accent/60" />
              </div>
              {/* Inner content */}
              <div className="absolute inset-20 rounded-full bg-gradient-to-br from-accent/10 to-navy-light/50 border border-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-accent/20 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--gold))" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span className="text-primary-foreground/60 text-xs font-medium tracking-wider uppercase">Innovation</span>
                </div>
              </div>
              {/* Floating nodes */}
              <div className="absolute top-1/4 -left-4 w-8 h-8 rounded-lg bg-navy-light border border-accent/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <div className="absolute bottom-1/4 -right-4 w-10 h-10 rounded-lg bg-navy-light border border-accent/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-sm bg-accent/40" />
              </div>
              <div className="absolute top-8 right-12 w-6 h-6 rounded-full bg-accent/10 border border-accent/20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
