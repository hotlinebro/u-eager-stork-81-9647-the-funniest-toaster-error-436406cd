// The Funniest Toaster Error Message — make.fun entry
// Writes one toaster error line (1-120 chars) to /output/entry.txt
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "ERROR: Read 533 lines of toasting manual. Remember 151. Confidence: 100%.";

if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`entry must be 1-120 characters, got ${LINE.length}`);
}
// Self-check gate: the gate scorer requires one line, 1-120 chars,
// not only whitespace. Fail loudly here instead of shipping a bad file.
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
// Read back and verify what actually landed on disk.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from entry");
}
console.log(`wrote ${LINE.length} chars to /output/entry.txt`);
