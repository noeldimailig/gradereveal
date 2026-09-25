import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { shouldPrank } from "@/lib/grades";

export default function ReadyPanel({ student, onStart }) {
  return (
    <motion.section
      key="ready"
      className="panel center"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="verified">STUDENT FOUND</div>
      <h2>{student.student_name}</h2>
      <h3>
        {student.section} – {student.year_level} – {student.program}
      </h3>
      <div className="redacted">
        <span>COURSE</span>
        <b>{student.course}</b>
        <span>GRADE</span>
        <b>?.??</b>
      </div>

      {shouldPrank(student) && (
        <div className="prankHint">
          YOUR SCORE LOOKS SUSPICIOUSLY GOOD...
        </div>
      )}

      <p className="warningText">
        Before the grade appears, your fate has been selected.
      </p>

      <button className="primary" onClick={onStart}>
        <Play size={19} fill="currentColor" /> REVEAL MY GRADE
      </button>
    </motion.section>
  );
}