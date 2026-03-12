import { Network, Phone, PhoneCall, Globe, Server, Shield, Cloud, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Network,
    title: "Network Installation & Cabling",
    description: "Professional structured cabling, LAN/WAN setup, and rack installation for offices, campuses, and commercial buildings.",
    features: ["Cat6/Cat7 Cabling", "Rack Installation", "LAN/WAN Setup", "Testing & Certification"],
    color: "blue",
  },
  {
    icon: Phone,
    title: "PBX & Business Phone Systems",
    description: "Supply, installation, and configuration of PBX systems for internal and external business communication.",
    features: ["On-premise PBX", "Cloud PBX", "Call Routing", "Voicemail Setup"],
    color: "green",
  },
  {
    icon: PhoneCall,
    title: "IP Phone Setup & Configuration",
    description: "Provisioning and deployment of IP/VoIP handsets across your organization with full configuration.",
    features: ["Extension Setup", "SIP Trunking", "Call Routing", "Device Management"],
    color: "purple",
  },
  {
    icon: Globe,
    title: "IP Addressing & Network Config",
    description: "Full IP planning and configuration — subnetting, VLANs, DHCP, DNS, and firewall rules.",
    features: ["Subnet Planning", "VLAN Configuration", "DHCP/DNS", "Firewall Rules"],
    color: "orange",
  },
  {
    icon: Server,
    title: "Network Equipment Supply",
    description: "We supply and install routers, managed switches, access points, firewalls, and UPS units.",
    features: ["Routers & Switches", "Firewalls", "Access Points", "UPS Systems"],
    color: "red",
  },
  {
    icon: Shield,
    title: "Network Security & Monitoring",
    description: "Protect your infrastructure with security audits, monitoring solutions, and threat prevention.",
    features: ["Security Audits", "24/7 Monitoring", "Threat Prevention", "VPN Setup"],
    color: "teal",
  },
];

const colorClasses = {
  blue: { bg: "bg-blue-500/10", border: "border-blue-200", icon: "text-blue-600", hover: "hover:border-blue-400" },
  green: { bg: "bg-green-500/10", border: "border-green-200", icon: "text-green-600", hover: "hover:border-green-400" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-200", icon: "text-purple-600", hover: "hover:border-purple-400" },
  orange: { bg: "bg-orange-500/10", border: "border-orange-200", icon: "text-orange-600", hover: "hover:border-orange-400" },
  red: { bg: "bg-red-500/10", border: "border-red-200", icon: "text-red-600", hover: "hover:border-red-400" },
  teal: { bg: "bg-teal-500/10", border: "border-teal-200", icon: "text-teal-600", hover: "hover:border-teal-400" },
};

const Services = () => {
  return (
    <section id="services" className="section-padding bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
            <Cloud size={16} />
            Our Solutions
          </div>
          <h2 className="section-heading mb-6 text-primary">Network Solutions Built for <span className="text-accent">Scale.</span></h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From physical structured cabling to sophisticated IP infrastructure — we handle every layer of your business network with precision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const colors = colorClasses[service.color as keyof typeof colorClasses];
            return (
              <div key={service.title} className="service-card flex flex-col group h-full">
                <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500`}>
                  <service.icon size={32} className={`${colors.icon} group-hover:text-white transition-colors duration-500`} strokeWidth={1.5} />
                </div>

                <h3 className="text-2xl font-bold text-primary mb-4 tracking-tight group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {service.features.map((feature) => (
                    <span key={feature} className="text-[10px] px-3 py-1.5 rounded-lg bg-muted text-muted-foreground font-bold uppercase tracking-wider border border-border/50">
                      {feature}
                    </span>
                  ))}
                </div>

                <a href="/#contact" className="inline-flex items-center gap-2 text-accent font-bold text-sm group-hover:gap-3 transition-all">
                  Learn More <ArrowRight size={16} />
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-24 bg-primary rounded-3xl p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left shadow-2xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 circuit-pattern opacity-10" />
          <div className="relative z-10">
            <h3 className="text-white text-3xl md:text-4xl font-bold mb-4 tracking-tight">Need a professional network audit?</h3>
            <p className="text-white/70 text-lg max-w-xl">
              Our experts provide comprehensive site surveys and full network health reports across Malawi.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto">
            <a href="/#contact" className="w-full sm:w-auto">
              <Button className="bg-accent text-accent-foreground hover:bg-gold-light rounded-full px-10 py-8 text-lg font-bold shadow-xl shadow-accent/20 w-full">
                Request a Quote
              </Button>
            </a>
            <a href="/support" className="w-full sm:w-auto">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-10 py-8 text-lg font-bold w-full">
                Get Support
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
