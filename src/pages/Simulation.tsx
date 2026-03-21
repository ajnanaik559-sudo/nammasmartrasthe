import { useSimulation } from "@/components/simulation/useSimulation";
import IntersectionView from "@/components/simulation/IntersectionView";
import ContextControlPanel from "@/components/simulation/ContextControlPanel";
import PriorityScorePanel from "@/components/simulation/PriorityScorePanel";
import ExplainPanel from "@/components/simulation/ExplainPanel";
import ScenarioButtons from "@/components/simulation/ScenarioButtons";
import BeforeAfterPanel from "@/components/simulation/BeforeAfterPanel";

const Simulation = () => {
  const {
    roads,
    context,
    setContext,
    setDensity,
    toggleEmergency,
    explanations,
    scenarios,
    activeScenario,
    applyScenario,
    beforeStats,
    afterStats,
  } = useSimulation();

  return (
    <div className="min-h-screen pt-16">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Context-Aware Traffic Simulation</h1>
          <p className="text-sm text-muted-foreground">
            Interactive demo — Silk Board Junction, Bengaluru · Adjust conditions and watch the system adapt
          </p>
        </div>

        {/* Scenario buttons */}
        <div className="mb-6">
          <ScenarioButtons scenarios={scenarios} activeScenario={activeScenario} onApply={applyScenario} />
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Intersection + Explain */}
          <div className="space-y-6">
            <IntersectionView roads={roads} />
            <ExplainPanel explanations={explanations} />
          </div>

          {/* Center: Priority Scores */}
          <div>
            <PriorityScorePanel roads={roads} context={context} />
          </div>

          {/* Right: Controls + Before/After */}
          <div className="space-y-6">
            <ContextControlPanel
              context={context}
              roads={roads}
              onContextChange={setContext}
              onDensityChange={setDensity}
              onToggleEmergency={toggleEmergency}
            />
            <BeforeAfterPanel before={beforeStats} after={afterStats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
