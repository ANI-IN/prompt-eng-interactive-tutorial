export const lower = (t) => String(t).toLowerCase();
export const includesAll = (t, words) => words.every((w) => lower(t).includes(lower(w)));
export const includesAny = (t, words) => words.some((w) => lower(t).includes(lower(w)));
export const wordCount = (t) => String(t).trim().split(/\s+/).filter(Boolean).length;
export const equalsExact = (t, s) => t === s;
export const lineCount = (t) => String(t).split("\n").filter((l) => l.trim() !== "").length;

/** Pretty-print a Claude response and its pass/fail grade in a notebook cell. */
export function grade(response, passed) {
  console.log(response);
  console.log("\n--------------------------- GRADING ---------------------------");
  console.log("This exercise has been correctly solved:", passed);
}
