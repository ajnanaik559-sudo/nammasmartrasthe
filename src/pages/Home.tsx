import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Activity, Brain, Car, Leaf, MapPin, Shield, Users, Zap, ArrowRight } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Predictive Engine", desc: "Forecasts congestion using historical data, weather, and events" },
  { icon: Activity, title: "Dynamic Signal Control", desc: "Real-time signal adjustment based on vehicle density" },
  { icon: Shield, title: "Priority Scoring", desc: "Dynamic road priority based on traffic, emergencies, and pedestrians" },
  { icon: MapPin, title: "Smart Rerouting", desc: "Automatic alternate routes around roadblocks and construction" },
  { icon: Leaf, title: "Eco-Optimization", desc: "Reduces idle time, emissions, and prioritizes EVs" },
  { icon: Users, title: "Pedestrian Integration", desc: "Adaptive crossing timers and smart detection" },
];

const stats = [
  { value: "34%", label: "Congestion Reduction" },
  { value: "1.2K", label: "Active Signals" },
  { value: "45%", label: "Emission Savings" },
  { value: "< 2s", label: "Response Time" },
];

const Home = () => (
  <div className="min-h-screen pt-16">
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="container relative py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-mono text-primary mb-6">
            <Zap className="h-3 w-3" />
            SMART MOVES FIRST
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]">
            <span className="text-foreground">FirstMove</span>
            <br />
            <span className="text-gradient-primary">for Bengaluru</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Context-aware traffic management that makes smart moves first — dynamically adapting signals
            using AI prediction, real-time data, and eco-optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground glow-primary transition-all hover:scale-105"
            >
              Open Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/simulation"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-8 py-3.5 text-sm font-semibold text-secondary-foreground transition-all hover:bg-muted"
            >
              Try Simulation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section className="border-y border-border bg-card/50">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-black font-mono text-gradient-primary">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="container py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Core Capabilities</h2>
        <p className="mt-3 text-muted-foreground">Powered by real-time data and machine learning</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:glow-primary"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4 transition-colors group-hover:bg-primary/20">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="border-t border-border">
      <div className="container py-20 text-center">
        <Car className="h-8 w-8 text-primary mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Ready to see it in action?</h2>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          Explore the simulation mode to trigger real-world scenarios and watch the system adapt.
        </p>
        <Link
          to="/simulation"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground glow-primary transition-all hover:scale-105"
        >
          Launch Simulation <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t border-border py-8">
      <div className="container text-center text-xs text-muted-foreground font-mono">
        FirstMove v1.0 · Smart Moves First · Built for Bengaluru
      </div>
    </footer>
  </div>
);

export default Home;
