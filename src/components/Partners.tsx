import { Building2 } from "lucide-react";

const partners = [
  "TechnoSystems", "Malawi Net", "Global Connect", "CyberSecure",
  "DataLink", "AfriCom", "NetServe", "InfoTech",
];

const Partners = () => (
  <section id="partners" className="py-16 md:py-24 bg-muted overflow-hidden border-t border-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="text-center">
        <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">
          Our Clients
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-primary">Trusted by Industry Leaders</h2>
      </div>
    </div>

    <div className="relative w-full">
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-muted to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-muted to-transparent z-10" />
      
      <div className="flex marquee whitespace-nowrap">
        {[...partners, ...partners, ...partners].map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex-shrink-0 mx-4 md:mx-8 w-48 h-24 rounded-xl border border-border bg-card/50 flex flex-col items-center justify-center gap-2
                       grayscale hover:grayscale-0 transition-all duration-300 hover:bg-card hover:shadow-md hover:border-accent/30 cursor-default"
          >
            <Building2 size={24} className="text-accent opacity-70" />
            <span className="font-heading font-bold text-primary/70 text-base">{name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Partners;
