import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { fakeGradeLabel, fakeGradeCategory } from "@/lib/grades";

export default function FakeFailPanel({ fakeGrade, showCheckBtn, onCheck }) {
  const label = fakeGradeLabel(fakeGrade);
  const cat = fakeGradeCategory(fakeGrade);

  return (
    <motion.section
      key="fakeFail"
      className={`panel fakeFail ${cat}`}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="eyebrow">FINAL RESULT</div>

      <motion.div
        className="fakeGrade"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.2, repeat: 1 }}
      >
        {fakeGrade.toFixed(2)}
      </motion.div>

      <h2>{label}</h2>
      <p>
        Numerical Equivalent: <b>{fakeGrade.toFixed(2)}</b>
      </p>

      <motion.div
        className="fakeStamp"
        initial={{ opacity: 0, rotate: -12, scale: 0.5 }}
        animate={{ opacity: 1, rotate: -4, scale: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
      >
        RESULT VERIFIED
      </motion.div>

      <p className="prankSub">Wait... something doesn't look right.</p>

      {showCheckBtn ? (
        <button className="primary" onClick={onCheck}>
          <Play size={18} fill="currentColor" /> CHECK THE RESULT
        </button>
      ) : (
        <p className="prankSub">verifying... do not close this window.</p>
      )}
    </motion.section>
  );
}