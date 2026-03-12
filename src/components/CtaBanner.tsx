import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaBanner = () => (
  <section className="py-24 md:py-32 relative overflow-hidden bg-primary">
    <div className="absolute inset-0 circuit-pattern opacity-[0.03]" />
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(234,179,8,0.05),transparent_50%)]" />
    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(234,179,8,0.05),transparent_50%)]" />

    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
      <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Ready to scale?</span>
      <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
        Let's Build Your <span className="text-accent">Next-Gen</span> Network Together.
      </h2>
      <p className="text-white/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
        From consultation to deployment, Rare Solutions MW is your partner in digital transformation.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/#contact">
          <Button className="bg-accent text-accent-foreground hover:bg-gold-light rounded-full px-10 py-8 text-lg font-bold shadow-2xl shadow-accent/20 flex items-center gap-3">
            Start a Conversation <ArrowRight size={20} />
          </Button>
        </a>
        <a href="/support">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-10 py-8 text-lg font-bold">
            Support Portal
          </Button>
        </a>
      </div>
    </div>
  </section>
);

export default CtaBanner;
