import { motion } from "framer-motion";

export default function PrankRevealPanel({ fakeGrade, onContinue }) {
  return (
    <motion.section
      key="prankReveal"
      className="panel prankReveal"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.div
        className="rickText"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        HAHAHA!
      </motion.div>
      <h1>
        YOU GOT
        <br />
        <em>RICKROLLED!</em>
      </h1>
      <p>
        Okay, okay. The <b>{fakeGrade.toFixed(2)}</b> was fake.
      </p>
      <button className="primary" onClick={onContinue}>
        SHOW MY ACTUAL GRADE →
      </button>
    </motion.section>
  );
}