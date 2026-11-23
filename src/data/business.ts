export const BUSINESS = {
  name: "Bike Rent Siliguri",
  category: "Motorcycle & Scooter Rental Service",
  email: "bikerentsiliguri@gmail.com",
  phoneDisplay: "+91 9046497254",
  /** E.164 without the plus — used for tel: and wa.me links. */
  phoneDigits: "919046497254",
  addressLines: [
    "Darsaratpally Bazar, Sevoke Road",
    "Ward No. 44, Siliguri",
    "West Bengal – 734001, India",
  ],
  addressFull:
    "Darsaratpally Bazar, Sevoke Road, Siliguri, West Bengal – 734001, Ward No. 44, India.",
  mapQuery: "Darsaratpally Bazar, Sevoke Road, Siliguri, West Bengal 734001, India",
} as const;

export const PHONE_HREF = `tel:+${BUSINESS.phoneDigits}`;
export const WHATSAPP_URL = `https://wa.me/${BUSINESS.phoneDigits}`;

/** WhatsApp click-to-chat link to the business number, optionally with a pre-filled message. */
export function whatsappUrl(text?: string): string {
  return text ? `${WHATSAPP_URL}?text=${encodeURIComponent(text)}` : WHATSAPP_URL;
}

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.mapQuery)}&output=embed`;
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSINESS.mapQuery)}`;

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: BUSINESS.name,
  description:
    "Motorcycle and scooter rental in Siliguri — Royal Enfield Himalayan, Classic, Meteor and Hunter, Xpulse, Pulsar, Ntorq, Jupiter and Activa available by the day.",
  email: BUSINESS.email,
  telephone: `+${BUSINESS.phoneDigits}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Darsaratpally Bazar, Sevoke Road, Ward No. 44",
    addressLocality: "Siliguri",
    addressRegion: "West Bengal",
    postalCode: "734001",
    addressCountry: "IN",
  },
  areaServed: "Siliguri, North Bengal",
  priceRange: "₹700 – ₹1,400 per day",
};
