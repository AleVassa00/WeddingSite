import assert from "node:assert/strict";
import test from "node:test";
import { calculateCountdown } from "./countdown.ts";

const target = "2027-09-04T15:30:00+02:00";
const deadline = Date.parse(target);

test("calculates the remaining days, hours, minutes and seconds from a ceremony time with offset", () => {
  const now = Date.parse("2027-09-03T11:26:56Z");
  assert.deepEqual(calculateCountdown(target, now), { giorni: 1, ore: 2, minuti: 3, secondi: 4 });
});

test("keeps the last second visible until the deadline and clamps expired values", () => {
  assert.deepEqual(calculateCountdown(target, deadline - 1), { giorni: 0, ore: 0, minuti: 0, secondi: 1 });
  for (const now of [deadline, deadline + 1000]) {
    assert.deepEqual(calculateCountdown(target, now), { giorni: 0, ore: 0, minuti: 0, secondi: 0 });
  }
});

test("rejects invalid countdown dates", () => {
  assert.throws(() => calculateCountdown("not-a-date", deadline));
});
