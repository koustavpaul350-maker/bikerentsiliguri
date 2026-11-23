import { describe, expect, it } from "vitest";
import { makeBookingSchema } from "./booking-schema";
import { FLEET } from "@/data/fleet";

const today = "2026-11-23";
const valid = {
  fullName: "Asha Roy",
  email: "asha@example.com",
  phone: "+91 98765 43210",
  motorcycle: "himalayan-bs4-411",
  pickupDate: "2026-11-25",
  returnDate: "2026-11-27",
  message: "",
};

describe("booking enquiry rules", () => {
  it("accepts a complete enquiry", () => {
    expect(makeBookingSchema(today).safeParse(valid).success).toBe(true);
  });

  it("rejects a return date before the pickup date", () => {
    const r = makeBookingSchema(today).safeParse({ ...valid, returnDate: "2026-11-24" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0]?.path).toEqual(["returnDate"]);
  });

  it("rejects a pickup date in the past", () => {
    const r = makeBookingSchema(today).safeParse({ ...valid, pickupDate: "2026-11-22" });
    expect(r.success).toBe(false);
  });

  it("requires name, email, phone and motorcycle", () => {
    const r = makeBookingSchema(today).safeParse({ ...valid, fullName: "", email: "x", phone: "12", motorcycle: "" });
    expect(r.success).toBe(false);
    if (!r.success) {
      const paths = r.error.issues.map((i) => i.path[0]);
      expect(paths).toEqual(expect.arrayContaining(["fullName", "email", "phone", "motorcycle"]));
    }
  });
});

describe("fleet prices", () => {
  it("lists all ten motorcycles at the exact daily prices", () => {
    const prices = Object.fromEntries(FLEET.map((b) => [b.name, b.pricePerDay]));
    expect(prices).toEqual({
      "Himalayan BS4 411cc": 1400,
      "Classic Reborn 350cc": 1300,
      "Meteor 350cc": 1400,
      "Hunter 350cc": 1300,
      "Xpulse 200cc": 1200,
      "TVS Ntorq 125cc": 800,
      "Jupiter 125cc": 700,
      "Pulsar N160": 1000,
      "TVS Ntorq 150cc": 1000,
      "Honda Activa 6G 110cc": 700,
    });
  });
});
