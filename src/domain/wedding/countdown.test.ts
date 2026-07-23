import assert from "node:assert/strict";
import test from "node:test";
import { calculateCountdown } from "./countdown.ts";

test("calculates each countdown unit independently", () => {
  const now = Date.parse("2027-06-13T14:26:56+02:00");
  const target = "2027-06-14T16:30:00+02:00";

  assert.deepEqual(calculateCountdown(target, now), {
    giorni: 1,
    ore: 2,
    minuti: 3,
    secondi: 4,
  });
});

test("clamps an expired countdown to zero", () => {
  const target = "2027-06-14T16:30:00+02:00";
  const afterWedding = Date.parse("2027-06-15T16:30:00+02:00");

  assert.deepEqual(calculateCountdown(target, afterWedding), {
    giorni: 0,
    ore: 0,
    minuti: 0,
    secondi: 0,
  });
});

test("rejects invalid ISO dates", () => {
  assert.throws(() => calculateCountdown("not-a-date", Date.now()));
});
