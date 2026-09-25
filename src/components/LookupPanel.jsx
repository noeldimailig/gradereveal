import { AnimatePresence, motion } from "framer-motion";
import StudentForm from "./StudentForm";
import { ShieldAlert } from "lucide-react";

export default function LookupPanel({ onSearch, isLoading, error, MAX_VIEWS }) {
  return (
    <motion.div
      key="lookup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <StudentForm
        onSearch={onSearch}
        MAX_VIEWS={MAX_VIEWS}
        isLoading={isLoading}
        error={error}
      />
      <AnimatePresence>
        {error && (
          <motion.h2
            className="error"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <ShieldAlert size={17} />
            {error}
          </motion.h2>
        )}
      </AnimatePresence>
    </motion.div>
  );
}