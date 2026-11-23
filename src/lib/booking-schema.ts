import { z } from "zod";

/** Today's date (YYYY-MM-DD) in India, where the business operates. */
export function todayInIndia(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date");

export function makeBookingSchema(today: string = todayInIndia()) {
  return z
    .object({
      fullName: z.string().trim().min(2, "Please enter your full name").max(120, "Name is too long"),
      email: z.string().trim().email("Please enter a valid email address").max(255),
      phone: z
        .string()
        .trim()
        .regex(/^\+?[0-9\s-]{7,20}$/, "Please enter a valid phone number")
        .refine((v) => v.replace(/\D/g, "").length >= 10, "Please enter a valid phone number"),
      motorcycle: z.string().min(1, "Please select a motorcycle"),
      pickupDate: isoDate.refine((d) => d >= today, "Pickup date cannot be in the past"),
      returnDate: isoDate,
      message: z.string().trim().max(2000, "Message is too long").optional(),
    })
    .refine((v) => v.returnDate >= v.pickupDate, {
      path: ["returnDate"],
      message: "Return date cannot be before the pickup date",
    });
}

export type BookingValues = z.infer<ReturnType<typeof makeBookingSchema>>;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  subject: z.string().trim().max(160).optional(),
  message: z.string().trim().min(5, "Please write a short message").max(2000, "Message is too long"),
});

export type ContactValues = z.infer<typeof contactSchema>;

/** Number of rental days, counting pickup and return as one day when equal. */
export function rentalDays(pickup: string, ret: string): number {
  const a = Date.parse(`${pickup}T00:00:00Z`);
  const b = Date.parse(`${ret}T00:00:00Z`);
  if (Number.isNaN(a) || Number.isNaN(b) || b < a) return 0;
  return Math.max(1, Math.round((b - a) / 86_400_000));
}
