export const BUSINESS = {
  name: "Bike Rent Siliguri",
  category: "Motorcycle & Scooter Rental Service",
  email: "bikerentsiliguri@gmail.com",
  addressLines: [
    "Darsaratpally Bazar, Sevoke Road",
    "Ward No. 44, Siliguri",
    "West Bengal – 734001, India",
  ],
  addressFull:
    "Darsaratpally Bazar, Sevoke Road, Siliguri, West Bengal – 734001, Ward No. 44, India.",
  mapQuery: "Darsaratpally Bazar, Sevoke Road, Siliguri, West Bengal 734001, India",
} as const;

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.mapQuery)}&output=embed`;
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSINESS.mapQuery)}`;

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: BUSINESS.name,
  description:
    "Motorcycle and scooter rental in Siliguri — Royal Enfield Himalayan, Classic, Meteor and Hunter, Xpulse, Pulsar, Ntorq, Jupiter and Activa available by the day.",
  email: BUSINESS.email,
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
