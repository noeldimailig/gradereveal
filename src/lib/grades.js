export const RICKROLL_THRESHOLD = 90;
export const MAX_VIEWS = 3;
export const FAKE_GRADES = [5.0, 3.0, 2.75, 2.5];

export const REVEAL_MEDIA = {
  honors: "/media/post-reveal/laica.mp4",
  excellent: "/media/post-reveal/sumakses.mp4",
  pass: "/media/post-reveal/luha.mp4",
  warning: "/media/post-reveal/tyl.mp4",
  fail: "/media/post-reveal/tumawaka.mp4",
};

export function fakeGradeLabel(g) {
  if (g === 5.0) return "FAILED";
  if (g === 3.0) return "CONDITIONAL / FOR REMOVAL";
  return "PASSED (BARELY)";
}

export function fakeGradeCategory(g) {
  if (g === 5.0) return "fail";
  if (g === 3.0) return "warning";
  return "lowpass";
}

export function getCategory(s) {
  if (!s) return "neutral";
  const g = s.numerical_equivalent;
  if (g >= 1.0 && g <= 2.0) return "honors";
  if (g === 2.25 || g === 2.5) return "pass";
  if (g === 2.75) return "excellent";
  if (g === 3.0) return "warning";
  return "fail";
}

export const isRickrollTarget = (s) =>
  Number(s?.midterm_grade) >= RICKROLL_THRESHOLD;

export const shouldPrank = (s) =>
  !!s && (isRickrollTarget(s) || s.numerical_equivalent <= 1.75);

// localStorage helpers
const VIEWS_KEY = (sid) => `GRADE_VIEWS_${sid}`;

export function getViews(sid) {
  try {
    return Number(localStorage.getItem(VIEWS_KEY(sid))) || 0;
  } catch {
    return 0;
  }
}

export function setViews(sid, n) {
  try {
    localStorage.setItem(VIEWS_KEY(sid), String(n));
  } catch {}
}
