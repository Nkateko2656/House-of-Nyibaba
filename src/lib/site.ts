/**
 * Single source of truth for business details.
 * Edit these values to update them across the whole website.
 */
export const site = {
  name: "House Of Nyibiba",
  tagline: "Guest House in Vosloorus, Boksburg",
  address: "21764/160 Kenyo St, Vosloorus Ext 6, Boksburg, 1475",
  city: "Boksburg",
  province: "Gauteng",
  country: "South Africa",
  postalCode: "1475",
  phoneDisplay: "068 671 4955",
  phoneHref: "tel:+27686714955",
  whatsapp: "27686714955",
  email: "", // Add the guest house email address here when available
  rating: 4.6,
  reviewCount: 17,
  airportDistance: "Approximately 17 miles (about 27 km) from O.R. Tambo International Airport",
  wifi: "Free WiFi up to 97 Mbps",
  // Editable placeholders — replace once confirmed by the guest house
  checkIn: "Check-in time to be confirmed",
  checkOut: "Check-out time to be confirmed",
  mapsQuery: "21764/160 Kenyo St, Vosloorus Ext 6, Boksburg, 1475, South Africa",
};

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  site.mapsQuery,
)}&output=embed`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  site.mapsQuery,
)}`;

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/rooms", label: "Rooms" },
  { to: "/amenities", label: "Amenities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/location", label: "Location" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export const amenities = [
  { title: "Air-conditioned rooms", note: "Climate control in every room." },
  { title: "Private bathrooms", note: "En-suite for each room." },
  { title: "Kitchenettes", note: "Self-catering convenience." },
  { title: "Private balconies / terraces", note: "Your own outdoor space." },
  { title: "Bathrobes", note: "Provided for guests." },
  { title: "Terrace & outdoor seating", note: "Space to unwind outdoors." },
  { title: "Hot tub", note: "On-site for guest use." },
  { title: "Outdoor fireplace", note: "Warm evenings outside." },
  { title: "BBQ facilities", note: "Braai on site." },
  { title: "Daily housekeeping", note: "Rooms serviced daily." },
  { title: "Paid shuttle service", note: "Available at additional cost." },
  { title: "Full-day security", note: "24-hour on-site security." },
  { title: "Private check-in / check-out", note: "Discreet arrival and departure." },
  { title: "Free private parking", note: "On-site, at no extra cost." },
  { title: "Free WiFi up to 97 Mbps", note: "Throughout the guest house." },
];
