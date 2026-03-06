import { Linkedin, Mail } from "lucide-react";

const team = [
  {
    name: "Mwai Mandula",
    role: "CEO & Founder",
    bio: "Seasoned network engineer with extensive experience in enterprise infrastructure, IP networking, and telecommunications. Mwai founded Rare Solutions MW to bridge the technology gap for Malawian businesses with world-class IT solutions.",
    initials: "MM",
    expertise: ["Network Architecture", "Enterprise IT", "Telecom Systems", "Business Strategy"],
  },
];

const Team = () => (
  <section id="team" className="section-padding bg-secondary">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">
          Our Leadership
        </span>
        <h2 className="section-heading gold-underline mx-auto">Meet the Team</h2>
      </div>

      <div className="flex justify-center">
        {team.map((member) => (
          <div
            key={member.name}
            className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden max-w-md w-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Avatar area */}
            <div className="bg-primary p-8 flex flex-col items-center">
              <div className="w-28 h-28 rounded-full bg-accent/20 border-4 border-accent flex items-center justify-center mb-4">
                <span className="text-accent font-heading font-bold text-3xl">{member.initials}</span>
              </div>
              <h3 className="text-primary-foreground font-heading font-bold text-xl">{member.name}</h3>
              <p className="text-accent font-semibold text-sm mt-1">{member.role}</p>
            </div>

            {/* Details */}
            <div className="p-6">
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{member.bio}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {member.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium bg-accent/10 text-accent-foreground px-3 py-1 rounded-full border border-accent/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-accent transition-colors group"
                >
                  <Linkedin size={16} className="text-primary group-hover:text-accent-foreground" />
                </a>
                <a
                  href="#"
                  aria-label="Email"
                  className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-accent transition-colors group"
                >
                  <Mail size={16} className="text-primary group-hover:text-accent-foreground" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
