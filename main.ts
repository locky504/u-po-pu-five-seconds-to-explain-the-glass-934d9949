// Five Seconds to Explain the Glass — make.fun bounty
// u-po-pu-five-seconds-to-explain-the-glass-934d9949
//
// The entry is the single sentence a house cat would say in the five
// seconds after sweeping a glass off the table: at most 200 characters,
// in the cat's own voice. No apology, no confession — just the most
// convincing case the cat can make for itself.
//
// The cat's defence rests on a real grievance: the glass had parked
// itself in the sunbeam and was throwing glare into the cat's eyes all
// morning. A single paw-nudge was pest control, not vandalism; gravity
// did the actual dropping, so the cat owns the nudge and nothing more.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The glass had been sitting in my sunbeam all morning, throwing glare straight into my eyes, so I nudged it aside with one paw — gravity handled the rest.";

// The gate only accepts UTF-8 text of 1 to 200 characters, one sentence,
// in the cat's own voice, with no apology and no confession — so check
// all of that here and fail loudly instead of shipping a bad entry.
function validateEntry(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (text.trim() !== text || text.trim().length === 0) {
    throw new Error("entry must not be blank or padded with whitespace");
  }
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length !== 1) {
    throw new Error(`entry must be exactly one sentence, got ${sentences.length}`);
  }
  const banned = ["sorry", "apolog", "my fault", "my bad", "i confess"];
  const lower = text.toLowerCase();
  for (const word of banned) {
    if (lower.includes(word)) {
      throw new Error(`entry must not apologise or confess (found "${word}")`);
    }
  }
}

validateEntry(ENTRY);

// The harness runs with no network and reads /output/entry.txt.
// MAKEFUN_OUTPUT_DIR lets the same program run locally for a check.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");

console.log(ENTRY);
console.error(`entry written: ${[...ENTRY].length} characters`);
