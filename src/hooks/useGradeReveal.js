import { useEffect } from "react";
import { useStudentLookup } from "./useStudentLookup";
import { useViewLimit } from "./useViewLimit";
import { usePrankFlow } from "./usePrankFlow";

export function useGradeReveal() {
  const lookupApi = useStudentLookup();
  const views = useViewLimit();
  const prank = usePrankFlow();

  const { student, isSuccess, setError, error } = lookupApi;

  // When the query resolves, either block (view limit) or go to "ready"
  useEffect(() => {
    if (!isSuccess || !student) return;

    prank.toReady();
  }, [isSuccess, student]); // eslint-disable-line react-hooks/exhaustive-deps

  // --- actions exposed to the UI ---
  function lookup(id) {
    const trimmed = id.trim();

    // 1. Check the local cap first — no network needed
    if (!views.hasViewsLeft(trimmed)) {
      setError(views.limitMessage());
      prank.toLookup();
      return;
    }

    prank.toLookup();
    lookupApi.lookup(id);
  }

  function start() {
    const where = prank.startPrankOrReveal(student);
    if (where === "reveal") views.consume(student.student_id);
  }

  function goToReveal() {
    views.consume(student.student_id);
    prank.toReveal();
  }

  function reset() {
    lookupApi.clear();
    prank.toLookup();
  }

  return {
    // state
    stage: prank.stage,
    student,
    error,
    fakeGrade: prank.fakeGrade,
    showCheckBtn: prank.showCheckBtn,
    // query
    isLoading: lookupApi.isLoading,
    // actions
    lookup,
    start,
    startRickroll: prank.toRickroll,
    afterRickroll: prank.toPrankReveal,
    goToReveal,
    reset,
  };
}