import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Local expertise with global standards",
  "End-to-end project delivery",
  "Transparent pricing, no hidden costs",
  "Dedicated post-project support",
  "Trusted by leading brands in Malawi",
];

const WhyChooseUs = () => (
  <section id="about" className="section-padding bg-secondary">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left - Abstract Graphic */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/3] bg-gradient-to-br from-primary to-navy-light rounded-2xl overflow-hidden relative">
            <div className="circuit-pattern absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4">
                  <span className="text-accent font-heading font-bold text-2xl">RS</span>
                </div>
                <p className="text-primary-foreground/50 text-sm font-medium tracking-widest uppercase">
                  Excellence Delivered
                </p>
              </div>
            </div>
            {/* Decorative squares */}
            <div className="absolute top-6 right-6 w-12 h-12 border border-accent/20 rounded-lg" />
            <div className="absolute bottom-6 left-6 w-8 h-8 bg-accent/10 rounded-lg" />
          </div>
        </motion.div>

        {/* Right - Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-heading gold-underline mb-8">Why Rare Solutions?</h2>
          <div className="space-y-5 mt-10">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-4">
                <CheckCircle2 size={22} className="text-accent flex-shrink-0 mt-0.5" />
                <p className="text-foreground text-lg">{point}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
