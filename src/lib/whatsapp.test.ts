import { describe, expect, it } from "vitest";
import { FLEET, getBike } from "@/data/fleet";
import { PHONE_HREF, WHATSAPP_URL } from "@/data/business";
import { bikeWhatsAppUrl, bookingWhatsAppMessage, bookingWhatsAppUrl } from "./whatsapp";

const enquiry = {
  fullName: "Asha Roy",
  email: "asha@example.com",
  phone: "+91 98765 43210",
  motorcycle: "himalayan-bs4-411",
  pickupDate: "2026-11-25",
  returnDate: "2026-11-27",
  message: "Two riders, heading to Darjeeling & back?",
};

function decodedText(url: string): string {
  return new URL(url).searchParams.get("text") ?? "";
}

describe("phone and WhatsApp links", () => {
  it("calls the business number", () => {
    expect(PHONE_HREF).toBe("tel:+919046497254");
  });
  it("opens a chat with the business WhatsApp number", () => {
    expect(WHATSAPP_URL).toBe("https://wa.me/919046497254");
  });
});

describe("booking enquiry WhatsApp message", () => {
  it("is addressed to the business number", () => {
    expect(bookingWhatsAppUrl(enquiry).startsWith("https://wa.me/919046497254?text=")).toBe(true);
  });

  it("contains every submitted detail in the agreed format", () => {
    expect(bookingWhatsAppMessage(enquiry)).toBe(
      [
        "NEW BIKE RENTAL BOOKING ENQUIRY",
        "",
        "Customer Name: Asha Roy",
        "Phone Number: +91 98765 43210",
        "Email: asha@example.com",
        "Selected Bike: Himalayan BS4 411cc (₹1,400/day)",
        "Pickup Date: 25 Nov 2026",
        "Return Date: 27 Nov 2026",
        "Additional Message: Two riders, heading to Darjeeling & back?",
        "",
        "Please contact this customer regarding the booking.",
      ].join("\n"),
    );
  });

  it("survives URL encoding intact (&, ?, ₹, new lines)", () => {
    expect(decodedText(bookingWhatsAppUrl(enquiry))).toBe(bookingWhatsAppMessage(enquiry));
  });

  it("says None when no additional message is given", () => {
    expect(bookingWhatsAppMessage({ ...enquiry, message: "" })).toContain("Additional Message: None");
  });
});

describe("per-motorcycle WhatsApp enquiry", () => {
  it("names the Jupiter 125cc and its ₹700 daily price", () => {
    const text = decodedText(bikeWhatsAppUrl(getBike("jupiter-125")!));
    expect(text).toContain("Jupiter 125cc");
    expect(text).toContain("₹700 per day");
  });

  it.each(FLEET.map((b) => [b.name, b] as const))("%s message uses its own name and price", (_n, bike) => {
    const url = bikeWhatsAppUrl(bike);
    expect(url.startsWith("https://wa.me/919046497254?text=")).toBe(true);
    expect(decodedText(url)).toContain(`${bike.name} at ₹${bike.pricePerDay.toLocaleString("en-IN")} per day`);
  });
});
