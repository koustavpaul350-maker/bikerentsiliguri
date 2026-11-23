import { formatPrice, getBike, type Bike } from "@/data/fleet";
import { whatsappUrl } from "@/data/business";
import type { BookingValues } from "@/lib/booking-schema";

/** "2026-11-25" → "25 Nov 2026" (no timezone shift). */
export function formatEnquiryDate(iso: string): string {
  const t = Date.parse(`${iso}T00:00:00Z`);
  if (Number.isNaN(t)) return iso;
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(t);
}

/** The exact booking enquiry text the business asked for. */
export function bookingWhatsAppMessage(values: BookingValues): string {
  const bike = getBike(values.motorcycle);
  const bikeLabel = bike ? `${bike.name} (${formatPrice(bike.pricePerDay)}/day)` : values.motorcycle;
  const message = values.message?.trim() ? values.message.trim() : "None";
  return [
    "NEW BIKE RENTAL BOOKING ENQUIRY",
    "",
    `Customer Name: ${values.fullName.trim()}`,
    `Phone Number: ${values.phone.trim()}`,
    `Email: ${values.email.trim()}`,
    `Selected Bike: ${bikeLabel}`,
    `Pickup Date: ${formatEnquiryDate(values.pickupDate)}`,
    `Return Date: ${formatEnquiryDate(values.returnDate)}`,
    `Additional Message: ${message}`,
    "",
    "Please contact this customer regarding the booking.",
  ].join("\n");
}

export function bookingWhatsAppUrl(values: BookingValues): string {
  return whatsappUrl(bookingWhatsAppMessage(values));
}

/** Quick enquiry for one motorcycle, naming it and its displayed daily price. */
export function bikeWhatsAppMessage(bike: Bike): string {
  return `Hello Bike Rent Siliguri, I would like to book the ${bike.name} at ${formatPrice(bike.pricePerDay)} per day. Please let me know if it is available.`;
}

export function bikeWhatsAppUrl(bike: Bike): string {
  return whatsappUrl(bikeWhatsAppMessage(bike));
}

/**
 * Opens WhatsApp in a new tab; if the browser blocks the new tab,
 * navigates the current tab instead so the customer always reaches the chat.
 */
export function openWhatsApp(url: string): void {
  const w = window.open(url, "_blank");
  if (w) {
    w.opener = null;
  } else {
    window.location.href = url;
  }
}
