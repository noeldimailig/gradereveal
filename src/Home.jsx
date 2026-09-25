import { AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";

import { useGradeReveal } from "@/hooks/useGradeReveal";
import { MAX_VIEWS } from "@/lib/grades";

import LookupPanel from "@/components/LookupPanel";
import ReadyPanel from "@/components/ReadyPanel";
import FakeFailPanel from "@/components/FakeFailPanel";
import RickrollPanel from "@/components/RickrollPanel";
import PrankRevealPanel from "@/components/PrankRevealPanel";
import RevealPanel from "@/components/RevealPanel";

export default function Home() {
  const {
    stage,
    error,
    fakeGrade,
    showCheckBtn,
    student,
    isLoading,
    lookup,
    start,
    startRickroll,
    afterRickroll,
    goToReveal,
  } = useGradeReveal();

  return (
    <main className="app">
      <div className="glow g1" />
      <div className="glow g2" />

      <header>
        <div className="brand">
          <div className="logo">{`{ }`}</div>
          <div>
            <b>Grade Reveal</b>
            <span>College of Computer Studies</span>
          </div>
        </div>
        <div className="badge">
          <Calendar size={15} /> MIDTERM 2026
        </div>
      </header>

      <AnimatePresence mode="wait">
        {stage === "lookup" && (
          <LookupPanel
            key="lookup"
            onSearch={lookup}
            isLoading={isLoading}
            error={error}
            MAX_VIEWS={MAX_VIEWS}
          />
        )}

        {stage === "ready" && student && (
          <ReadyPanel key="ready" student={student} onStart={start} />
        )}

        {stage === "fakeFail" && (
          <FakeFailPanel
            key="fakeFail"
            fakeGrade={fakeGrade}
            showCheckBtn={showCheckBtn}
            onCheck={startRickroll}
          />
        )}

        {stage === "rickroll" && (
          <RickrollPanel
            key="rickroll"
            src="/media/rickroll.mp4"
            onEnded={afterRickroll}
          />
        )}

        {stage === "prankReveal" && (
          <PrankRevealPanel
            key="prankReveal"
            fakeGrade={fakeGrade}
            onContinue={goToReveal}
          />
        )}

        {stage === "reveal" && student && (
          <RevealPanel key="reveal" student={student} />
        )}
      </AnimatePresence>
    </main>
  );
}