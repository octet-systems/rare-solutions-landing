import { Linkedin, Facebook, Twitter, Instagram, Mail, Phone, MapPin, Globe, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  "Network Installation & Cabling",
  "PBX & Business Phone Systems",
  "IP Phone Setup & Configuration",
  "IP Addressing & Network Config",
  "Network Devices & Equipment Supply",
];

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Partners", href: "/#partners" },
  { label: "Contact", href: "/#contact" },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "X", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

const Footer = () => (
  <footer id="contact" className="bg-primary pt-24 pb-12 overflow-hidden relative">
    <div className="absolute inset-0 circuit-pattern opacity-[0.02]" />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {/* Col 1 - Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-accent-foreground font-heading font-bold text-base tracking-tighter">RS</span>
            </div>
            <span className="font-heading font-bold text-white text-xl tracking-tight">
              Rare Solutions <span className="text-accent">MW</span>
            </span>
          </Link>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            Malawi's premier provider of smart IT, professional networking, and integrated business services for the modern enterprise.
          </p>
          <div className="flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all group"
              >
                <s.icon size={18} className="text-white/40 group-hover:text-accent-foreground transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 - Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-8 text-xs tracking-[0.2em] uppercase opacity-40">Navigation</h4>
          <ul className="space-y-4">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-white/50 hover:text-accent transition-all text-sm font-bold flex items-center gap-2 group">
                  {l.label}
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
                </a>
              </li>
            ))}
            <li>
              <Link to="/support" className="text-white/50 hover:text-accent transition-all text-sm font-bold flex items-center gap-2 group">
                Support Portal
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3 - Services */}
        <div>
          <h4 className="text-white font-bold mb-8 text-xs tracking-[0.2em] uppercase opacity-40">Specializations</h4>
          <ul className="space-y-4">
            {services.map((s) => (
              <li key={s} className="text-white/50 text-sm font-medium">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 - Contact */}
        <div>
          <h4 className="text-white font-bold mb-8 text-xs tracking-[0.2em] uppercase opacity-40">Get in Touch</h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Office</p>
                <span className="text-white/60 text-sm font-bold tracking-tight">Lilongwe, Malawi</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Mail size={18} className="text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Email</p>
                <span className="text-white/60 text-sm font-bold tracking-tight">info@raresolutionsmw.biz</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Phone size={18} className="text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Hotline</p>
                <span className="text-white/60 text-sm font-bold tracking-tight">+265 999 000 000</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
          © 2025 Rare Solutions MW. Built for the Future.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-white/20 hover:text-accent text-[10px] font-bold uppercase tracking-widest transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-white/20 hover:text-accent text-[10px] font-bold uppercase tracking-widest transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
