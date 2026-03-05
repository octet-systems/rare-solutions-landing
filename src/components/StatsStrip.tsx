import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 200, suffix: "+", label: "Clients Served" },
  { value: 15, suffix: "", label: "Expert Staff" },
  { value: 1, suffix: "", label: "Malawi's Trusted Partner", isText: true },
];

const CountUp = ({ target, suffix, isText }: { target: number; suffix: string; isText?: boolean }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || isText) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [started, target, isText]);

  if (isText) {
    return <div ref={ref} className="stat-number text-3xl md:text-4xl">#1</div>;
  }

  return <div ref={ref} className="stat-number">{count}{suffix}</div>;
};

const StatsStrip = () => (
  <section className="bg-navy-dark py-12 md:py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <CountUp target={stat.value} suffix={stat.suffix} isText={stat.isText} />
            <p className="text-primary-foreground/60 text-sm md:text-base mt-2 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsStrip;
