import assert from "node:assert/strict";
import test from "node:test";
import { normalizeIban } from "./iban.ts";

test("normalizes a spaced IBAN and verifies its check digits", () => {
  // Public format example from the SWIFT IBAN Registry, used only for testing.
  assert.equal(
    normalizeIban("it60 x054 2811 1010 0000 0123 456"),
    "IT60X0542811101000000123456",
  );
  assert.equal(normalizeIban("IT60X0542811101000000123457"), null);
});

test("rejects placeholders and incomplete codes", () => {
  assert.equal(normalizeIban("IBAN da comunicare"), null);
  assert.equal(normalizeIban("IT60X05428111010000001234"), null);
});
