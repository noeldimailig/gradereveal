import { useEffect, useState } from "react";
import { FAKE_GRADES, shouldPrank } from "@/lib/grades";

export function usePrankFlow() {
  const [stage, setStage] = useState("lookup");
  const [fakeGrade, setFakeGrade] = useState(5.0);
  const [showCheckBtn, setShowCheckBtn] = useState(false);

  // 5s panic timer on fakeFail
  useEffect(() => {
    if (stage !== "fakeFail") return;
    setShowCheckBtn(false);
    const t = setTimeout(() => setShowCheckBtn(true), 5000);
    return () => clearTimeout(t);
  }, [stage, fakeGrade]);

  const toLookup = () => setStage("lookup");
  const toReady = () => setStage("ready");
  const toRickroll = () => setStage("rickroll");
  const toPrankReveal = () => setStage("prankReveal");
  const toReveal = () => setStage("reveal");

  // Decide whether to prank or reveal — returns where it went
  function startPrankOrReveal(student) {
    if (shouldPrank(student)) {
      setFakeGrade(FAKE_GRADES[Math.floor(Math.random() * FAKE_GRADES.length)]);
      setStage("fakeFail");
      return "fakeFail";
    }
    setStage("reveal");
    return "reveal";
  }

  return {
    stage,
    fakeGrade,
    showCheckBtn,
    toLookup,
    toReady,
    toRickroll,
    toPrankReveal,
    toReveal,
    startPrankOrReveal,
  };
}