import { motion } from "framer-motion";

const partners = [
  "Partner One", "Partner Two", "Partner Three", "Partner Four",
  "Partner Five", "Partner Six", "Partner Seven", "Partner Eight",
];

const Partners = () => (
  <section id="partners" className="py-16 md:py-24 bg-muted overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground"
      >
        Our Trusted Partners
      </motion.p>
    </div>

    {/* Marquee */}
    <div className="relative">
      <div className="flex marquee">
        {[...partners, ...partners].map((name, i) => (
          <div
            key={i}
            className="flex-shrink-0 mx-4 w-48 h-24 rounded-xl border border-border bg-card flex items-center justify-center
                       grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-md hover:border-accent/30 cursor-pointer"
          >
            <span className="font-heading font-semibold text-muted-foreground/60 text-sm">{name}</span>
          </div>
        ))}
      </div>
    </div>

    <p className="text-center text-xs text-muted-foreground mt-8 italic">Replace with actual client/partner logos</p>
  </section>
);

export default Partners;
