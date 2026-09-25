import { supabase } from '@/utils/supabase'

export const getStudentGrade = async (studentId) => {
  const { data, error } = await supabase
    .from("grades")
    .select("*")
    .eq("student_id", studentId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Student ID not found. Check the ID and try again.");
  return data;
}