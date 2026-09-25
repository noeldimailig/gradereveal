import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Search, LockKeyhole, ShieldAlert, LogIn, Loader2 } from "lucide-react";
import { useState } from "react";

const studentSchema = z.object({
  studentId: z
    .string()
    .min(1, "Student ID is required")
});

export default function StudentForm({ onSearch, MAX_VIEWS, isLoading = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      studentId: "",
    },
  });

  const onSubmit = (data) => {
    onSearch(data.studentId);
  };

  return (
    <motion.section
      key="lookup"
      className="panel"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
    >
      {/* <div className="eyebrow">GRADE REVEAL SYSTEM</div> */}
      <h1>
        Ready to face
        <br />
        <em>your fate?</em>
      </h1>
      <p className="sub">
        Enter your Student ID to find out your grade this Midterms
      </p>
      <form className="lookup" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputWrap">
          <Search size={20} />
          <input
            {...register('studentId')}
            placeholder="e.g. MMC2025-00001"
            autoFocus
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 size={19} className="spin" />
              Verifying…
            </>
          ) : (
            <>
              <LogIn size={19} />
              Login
            </>
          )}
        </button>
      </form>
      {errors.studentId && (
        <motion.div
          className="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ShieldAlert size={17} />
          {errors.studentId.message}
        </motion.div>
      )}
      <h4 className="privacy">
        <LockKeyhole size={14} /> Your grade is revealed only after
        verification. Max {MAX_VIEWS} views per student.
      </h4>
    </motion.section>
  );
}
