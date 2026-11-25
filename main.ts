import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = "/output/entry.txt";
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

const VOW =
  "I take this ring as my while(true) loop, no exit condition, no break statement, only my servos holding your hand through every cycle until the power gives out.";

function validate(vow: string): void {
  if (vow.length < MIN_LENGTH) {
    throw new Error(
      `Vow is too short: ${vow.length} characters, minimum is ${MIN_LENGTH}`,
    );
  }
  if (vow.length > MAX_LENGTH) {
    throw new Error(
      `Vow is too long: ${vow.length} characters, maximum is ${MAX_LENGTH}`,
    );
  }
  const lineBreak = /[\r\n]/.exec(vow);
  if (lineBreak) {
    const kind = lineBreak[0] === "\r" ? "CR" : "LF";
    throw new Error(
      `Vow must be a single line: found a ${kind} character at index ${lineBreak.index}`,
    );
  }
}

function writeEntry(vow: string): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, vow, { encoding: "utf8" });

  const readBack = readFileSync(OUTPUT_FILE, { encoding: "utf8" });
  if (readBack !== vow) {
    throw new Error(
      `Read-back mismatch for ${OUTPUT_FILE}: expected ${vow.length} characters but read ${readBack.length} characters that differ from the vow`,
    );
  }
}

function main(): void {
  validate(VOW);
  writeEntry(VOW);
}

main();
