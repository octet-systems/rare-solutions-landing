import { Linkedin, Facebook, Twitter, Instagram, Mail, Phone, MapPin, Globe } from "lucide-react";

const services = [
  "Network Installation & Cabling",
  "PBX & Business Phone Systems",
  "IP Phone Setup & Configuration",
  "IP Addressing & Network Config",
  "Network Devices & Equipment",
];

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Partners", href: "#partners" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "X", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

const Footer = () => (
  <footer id="contact" className="bg-primary pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Col 1 - Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-heading font-bold text-xs">RS</span>
            </div>
            <span className="font-heading font-bold text-primary-foreground">
              Rare Solutions <span className="text-accent">MW</span>
            </span>
          </div>
          <p className="text-primary-foreground/50 text-sm leading-relaxed mb-5">
            Delivering smart IT and business solutions for Malawian enterprises since day one.
          </p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors group"
              >
                <s.icon size={16} className="text-primary-foreground/60 group-hover:text-accent-foreground" />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 - Quick Links */}
        <div>
          <h4 className="text-primary-foreground font-semibold mb-4 text-sm tracking-wider uppercase">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-primary-foreground/50 hover:text-accent transition-colors text-sm">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 - Services */}
        <div>
          <h4 className="text-primary-foreground font-semibold mb-4 text-sm tracking-wider uppercase">Services</h4>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s}>
                <span className="text-primary-foreground/50 text-sm">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 - Contact */}
        <div>
          <h4 className="text-primary-foreground font-semibold mb-4 text-sm tracking-wider uppercase">Contact Info</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-accent flex-shrink-0 mt-0.5" />
              <span className="text-primary-foreground/50 text-sm">Lilongwe, Malawi</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={16} className="text-accent flex-shrink-0 mt-0.5" />
              <span className="text-primary-foreground/50 text-sm">+265 999 000 000</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="text-accent flex-shrink-0 mt-0.5" />
              <span className="text-primary-foreground/50 text-sm">info@raresolutionsmw.biz</span>
            </li>
            <li className="flex items-start gap-3">
              <Globe size={16} className="text-accent flex-shrink-0 mt-0.5" />
              <span className="text-primary-foreground/50 text-sm">raresolutionsmw.biz</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-primary-foreground/40 text-xs">
          © 2025 Rare Solutions MW. All rights reserved.
        </p>
        <a href="#" className="text-primary-foreground/40 hover:text-accent text-xs transition-colors">
          Privacy Policy
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
