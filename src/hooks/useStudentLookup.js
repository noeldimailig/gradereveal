import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStudentGrade } from "@/services/getStudentGradeQuery";

export function useStudentLookup() {
  const [studentId, setStudentId] = useState(null);
  const [error, setError] = useState("");

  const query = useQuery({
    queryKey: ["grades", studentId],
    queryFn: () => getStudentGrade(studentId),
    enabled: Boolean(studentId),
    retry: false,
    staleTime: 0,
  });

  const { data: student, isSuccess, isError, error: queryError } = query;

  // Surface query errors as a friendly message
  useEffect(() => {
    if (isError && queryError) {
      setError(queryError.message);
      setStudentId(null);
    }
  }, [isError, queryError]);

  function lookup(id) {
    setError("");
    setStudentId(id.trim());
  }

  function clear() {
    setStudentId(null);
    setError("");
  }

  return {
    student,        // null until found
    isSuccess,
    isLoading: query.isLoading,
    error,
    setError,
    lookup,
    clear,
  };
}