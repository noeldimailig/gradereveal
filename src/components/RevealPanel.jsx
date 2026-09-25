import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { REVEAL_MEDIA, getCategory } from "@/lib/grades";

export default function RevealPanel({ student }) {
  const [mediaMissing, setMediaMissing] = useState(false);
  const videoRef = useRef(null);
  const category = getCategory(student);

  const headline =
    student.numerical_equivalent === 5
      ? "'WAG KA NANG MAGPALIWANAG!"
      : student.numerical_equivalent <= 1.75
        ? "SHENEEL! GALINGAN PA. AJA!"
        : "PWEDE NA!";

  const blurb =
    student.numerical_equivalent === 5
      ? "Ang tamad kasi, sabi sa iyo may balik yan eh!"
      : "SA IS NA IS ALL PASADO. Pa burger ka naman aba!";

  return (
    <motion.section
      key="reveal"
      className={`panel result ${category}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="eyebrow">FINAL RESULT</div>
      <h3 className="studentName">{student.student_name}</h3>

      <motion.div
        className="grade"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 170, damping: 12 }}
      >
        {student.numerical_equivalent.toFixed(2)}
      </motion.div>

      <h2 className="raw">
        Midterm Grade: <b>{student.midterm_grade}</b>
      </h2>
      <h2>{headline}</h2>
      <p>{blurb}</p>

      <motion.div
        className="videoBox revealVideo"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onAnimationComplete={() => {
          videoRef.current?.play().catch(() => {});
        }}
        style={{ marginTop: "1.25rem" }}
      >
        <video
          ref={videoRef}
          src={REVEAL_MEDIA[category]}
          playsInline
          controls
          onError={() => setMediaMissing(true)}
        />
      </motion.div>
    </motion.section>
  );
}
