import { motion } from "framer-motion";
import { Network, Phone, PhoneCall, Globe, Server, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Network,
    title: "Network Installation & Cabling",
    description: "Professional structured cabling, LAN/WAN setup, and rack installation for offices, campuses, and commercial buildings. We design and deploy reliable physical network infrastructure from the ground up.",
  },
  {
    icon: Phone,
    title: "PBX & Business Phone Systems",
    description: "Supply, installation, and configuration of PBX systems for internal and external business communication. Scalable solutions for small offices to enterprise call centers.",
  },
  {
    icon: PhoneCall,
    title: "IP Phone Setup & Configuration",
    description: "Provisioning and deployment of IP/VoIP handsets across your organization. We configure extensions, call routing, voicemail, and SIP trunking for seamless communication.",
  },
  {
    icon: Globe,
    title: "IP Addressing & Network Configuration",
    description: "Full IP planning and configuration — subnetting, VLANs, DHCP, DNS, static routing, and firewall rules. We ensure your network is logically structured, secure, and optimized for performance.",
  },
  {
    icon: Server,
    title: "Network Devices & Equipment Supply",
    description: "We supply and install routers, managed switches, access points, firewalls, and UPS units from trusted brands. Procurement, delivery, and setup all handled in one engagement.",
  },
];

const Services = () => (
  <section id="services" className="section-padding bg-background">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="section-heading gold-underline mb-4">Network Solutions Built for Business</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-6">
          From physical installation to full IP infrastructure — we handle every layer of your network.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="service-card flex flex-col"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-5">
              <service.icon size={24} className="text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
            <p className="text-muted-foreground leading-relaxed flex-1">{service.description}</p>
            <a href="/#contact" className="inline-flex items-center gap-1 text-accent font-semibold text-sm mt-5 hover:gap-2 transition-all">
              Learn More <ArrowRight size={14} />
            </a>
          </motion.div>
        ))}
      </div>

      {/* Bottom Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 bg-primary rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
      >
        <p className="text-primary-foreground text-lg md:text-xl font-medium max-w-lg">
          Need a full network audit or a quote for your office?
        </p>
        <a href="/#contact">
          <Button className="bg-accent text-accent-foreground hover:bg-gold-light rounded-full px-8 py-6 font-semibold shadow-lg shadow-accent/20 whitespace-nowrap">
            Request a Site Survey
          </Button>
        </a>
      </motion.div>
    </div>
  </section>
);

export default Services;
