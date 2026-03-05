import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CtaBanner = () => (
  <section className="py-20 md:py-28 bg-gradient-to-br from-accent via-gold-light to-accent relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_70%)]" />
    <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-accent-foreground mb-4">
          Ready to work with us?
        </h2>
        <p className="text-accent-foreground/70 text-lg md:text-xl mb-8">
          Let's build something great together.
        </p>
        <a href="#contact">
          <Button className="bg-primary text-primary-foreground hover:bg-navy-light rounded-full px-10 py-6 text-lg font-semibold shadow-xl">
            Start a Conversation
          </Button>
        </a>
      </motion.div>
    </div>
  </section>
);

export default CtaBanner;
