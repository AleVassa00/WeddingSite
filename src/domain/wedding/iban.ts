export function normalizeIban(value: string): string | null {
  const iban = value.replace(/\s/g, "").toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban)) {
    return null;
  }

  const checkDigits = Number(iban.slice(2, 4));
  if (checkDigits < 2 || checkDigits > 98) {
    return null;
  }

  if (iban.startsWith("IT") && !/^IT\d{2}[A-Z]\d{10}[A-Z0-9]{12}$/.test(iban)) {
    return null;
  }

  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const digits = rearranged.replace(/[A-Z]/g, letter => String(letter.charCodeAt(0) - 55));
  return BigInt(digits) % 97n === 1n ? iban : null;
}
