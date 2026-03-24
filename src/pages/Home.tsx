import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { DATASET_INFO, AREA_STATS, MONTHLY_TRENDS } from "@/data/trafficData";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useSimulation } from "@/components/simulation/useSimulation";
import HomePriorityPanel from "@/components/home/HomePriorityPanel";
import HomeExplainPanel from "@/components/home/HomeExplainPanel";
import HomeScenarioCards from "@/components/home/HomeScenarioCards";
import HomeBeforeAfter from "@/components/home/HomeBeforeAfter";
import HomeJunction from "@/components/home/HomeJunction";

const totalIncidents = MONTHLY_TRENDS.reduce((s, m) => s + m.incidents, 0);
const avgCongestion = Math.round(MONTHLY_TRENDS.reduce((s, m) => s + m.congestion, 0) / MONTHLY_TRENDS.length * 10) / 10;

const stats = [
  { value: DATASET_INFO.trafficRecords.toLocaleString(), label: "Traffic Records", emoji: "📊" },
  { value: `${DATASET_INFO.areas}`, label: "Bengaluru Areas", emoji: "📍" },
  { value: `${avgCongestion}%`, label: "Avg Congestion", emoji: "🚗" },
  { value: totalIncidents.toLocaleString(), label: "Incidents Tracked", emoji: "⚠️" },
];

const Home = () => {
  const sim = useSimulation();

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-bengaluru-gradient" />
        <div className="absolute inset-0 bg-dots opacity-30" />
        {/* Floating emojis */}
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-20 left-[10%] text-4xl opacity-30 select-none">🛺</motion.div>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} className="absolute top-32 right-[15%] text-3xl opacity-25 select-none">🏗️</motion.div>
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }} className="absolute bottom-20 left-[20%] text-3xl opacity-20 select-none">☕</motion.div>

        <div className="container relative py-24 md:py-36">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-5 py-2 text-xs font-semibold text-primary mb-6 cursor-default">
                  <span className="text-base">🚦</span>
                  NAMMA BENGALURU · SMART SIGNALS
                </div>
              </TooltipTrigger>
              <TooltipContent>Namma = "Our" in Kannada 🇮🇳</TooltipContent>
            </Tooltip>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95]">
              <span className="text-gradient-bengaluru">Namma Smart</span>
              <br />
              <span className="text-foreground">Raste</span>
              <span className="text-secondary"> 🛣️</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Smart Signals for Bengaluru's Busy Roads — powered by{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-primary font-semibold cursor-help underline decoration-dotted decoration-primary/40">{DATASET_INFO.trafficRecords.toLocaleString()} real records</span>
                </TooltipTrigger>
                <TooltipContent>From {DATASET_INFO.areas} areas × 15 roads × 12 months 📈</TooltipContent>
              </Tooltip>
              {" "}from Silk Board to Majestic!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link to="/simulation" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground glow-primary transition-all hover:scale-105 hover:shadow-lg">
                Try Live Simulation <ArrowRight className="h-4 w-4" />
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-secondary bg-secondary/10 px-8 py-3.5 text-sm font-bold text-secondary-foreground transition-all hover:bg-secondary/20 hover:scale-105">
                    📊 View Dashboard
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Silk Board Mode activated! 🚦</TooltipContent>
              </Tooltip>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/60">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="text-center">
                <span className="text-2xl">{s.emoji}</span>
                <p className="text-3xl md:text-4xl font-extrabold font-display text-primary mt-1">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Junction */}
      <section className="container py-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            🚦 Live Junction View
          </h2>
          <p className="mt-2 text-muted-foreground">Watch Silk Board Junction signals adapt in real-time</p>
        </motion.div>
        <div className="max-w-lg mx-auto">
          <HomeJunction roads={sim.roads} />
        </div>
      </section>

      {/* Priority Score Engine */}
      <section className="bg-bengaluru-gradient">
        <div className="container py-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              📊 Priority Score Formula
            </h2>
            <p className="mt-2 text-muted-foreground">Every signal decision is calculated, not random</p>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <HomePriorityPanel roads={sim.roads} context={sim.context} />
          </div>
        </div>
      </section>

      {/* Why this signal is green */}
      <section className="container py-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            🧠 Why This Signal Is Green?
          </h2>
          <p className="mt-2 text-muted-foreground">Explainable AI — no black boxes here!</p>
        </motion.div>
        <div className="max-w-2xl mx-auto">
          <HomeExplainPanel explanations={sim.explanations} />
        </div>
      </section>

      {/* Scenario Cards */}
      <section className="bg-bengaluru-gradient">
        <div className="container py-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              🎬 Try a Scenario
            </h2>
            <p className="mt-2 text-muted-foreground">Click a Bengaluru scenario and watch the system adapt!</p>
          </motion.div>
          <HomeScenarioCards
            scenarios={sim.scenarios}
            activeScenario={sim.activeScenario}
            onApply={sim.applyScenario}
          />
        </div>
      </section>

      {/* Before vs After */}
      <section className="container py-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            📈 Before vs After — The Impact
          </h2>
          <p className="mt-2 text-muted-foreground">Static signals vs Namma Smart Raste</p>
        </motion.div>
        <div className="max-w-3xl mx-auto">
          <HomeBeforeAfter before={sim.beforeStats} after={sim.afterStats} />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-bengaluru-gradient">
        <div className="container py-20 text-center">
          <span className="text-5xl mb-4 block">🛺</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Ready to see it in action?</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Trigger rain, festivals, accidents — and watch Bengaluru's signals get smarter!
          </p>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/simulation" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground glow-primary transition-all hover:scale-105 hover:shadow-lg">
                Launch Simulation <ArrowRight className="h-4 w-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Brace yourself, it's Bengaluru traffic! 🚗💨</TooltipContent>
          </Tooltip>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/50">
        <div className="container text-center text-xs text-muted-foreground font-mono">
          Namma Smart Raste · Student Built with ❤️ for Bengaluru · {DATASET_INFO.trafficRecords.toLocaleString()} records · Silk Board → Majestic
        </div>
      </footer>
    </div>
  );
};

export default Home;
