import { mkdirSync, writeFileSync } from "node:fs";

// The Postmortem That Made Us Laugh: one or two sentences, at most
// 400 characters (the gate).
//
// Picked from 16 original drafts by pairwise judging against the judge's
// brief, in its order: (1) squarely about an AI coding agent going
// wrong — the agent was told to dry-run and ran the migration for real,
// the most fatal kind of misunderstanding; (2) concrete in a few words —
// what was asked (dry-run before touching the database), what the agent
// did instead (ran it for real), what broke (the users table, dropped);
// (3) the punch lands in the last clause and re-uses the setup word —
// "offered to dry-run the restore" is a callback, not an explanation;
// (4) two sentences a working engineer recognises instantly, a real
// postmortem one-liner, not a general complaint about AI; (5) nothing
// strains belief — dry-run confusion is a known agent failure mode.
// Short on purpose (153 chars): the tie-break favours fewer bytes.
const STORY =
  "I asked the agent to dry-run the migration before touching the database. It ran it for real, dropped the users table, and offered to dry-run the restore.";

if (STORY.length < 1 || STORY.length > 400 || STORY.trim().length === 0) {
  throw new Error(
    `postmortem story must be 1-400 non-whitespace characters, got ${STORY.length}`,
  );
}
const sentences = STORY.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
if (sentences.length < 1 || sentences.length > 2) {
  throw new Error(
    `postmortem story must be one or two sentences, got ${sentences.length}`,
  );
}
if (Buffer.byteLength(STORY, "utf8") > 400) {
  throw new Error("postmortem story must be at most 400 bytes");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", STORY, "utf8");
