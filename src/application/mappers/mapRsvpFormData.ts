import type {
  Attendance,
  RsvpSubmission,
} from "@/src/domain/wedding/types";

function stringValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function mapRsvpFormData(formData: FormData): RsvpSubmission {
  const attendance = stringValue(formData, "attendance");

  if (attendance !== "yes" && attendance !== "no") {
    throw new Error("Attendance is required.");
  }

  const guests = Number.parseInt(stringValue(formData, "guests"), 10);

  return {
    name: stringValue(formData, "name"),
    attendance: attendance as Attendance,
    guests: Number.isFinite(guests) ? Math.max(1, guests) : 1,
    dietaryRequirements: stringValue(formData, "diet"),
    message: stringValue(formData, "message"),
    shuttleRequested: formData.get("shuttle") === "on",
    submittedAt: new Date().toISOString(),
  };
}
