import { motion } from "framer-motion";

export default function RickrollPanel({ src, onEnded }) {
  return (
    <motion.section
      key="rickroll"
      className="panel memePanel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="eyebrow">SYSTEM ERROR DETECTED</div>
      <h2>WAIT... VERIFYING YOUR GRADE</h2>
      <div className="videoBox prankVideo">
        <video
          src={src}
          autoPlay
          playsInline
          controls
          onEnded={onEnded}
          onError={onEnded}
        />
      </div>
      <p className="hint">
        If autoplay is blocked, press play. The real grade remains hidden.
      </p>
    </motion.section>
  );
}