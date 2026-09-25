import { useCallback } from "react";
import { getViews, setViews, MAX_VIEWS } from "@/lib/grades";

export function useViewLimit() {
  const hasViewsLeft = useCallback(
    (studentId) => getViews(studentId) < MAX_VIEWS,
    [],
  );

  const remaining = useCallback(
    (studentId) => Math.max(0, MAX_VIEWS - getViews(studentId)),
    [],
  );

  const consume = useCallback((studentId) => {
    const next = getViews(studentId) + 1;
    setViews(studentId, next);
    return next;
  }, []);

  const limitMessage = useCallback(
    () => `View limit reached. You've already viewed this grade ${MAX_VIEWS} times.`,
    [],
  );

  return { hasViewsLeft, remaining, consume, limitMessage, MAX_VIEWS };
}