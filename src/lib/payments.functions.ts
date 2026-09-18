import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getRoom } from "@/lib/rooms";

const checkoutInput = z.object({
  roomSlug: z.string().min(1),
  breakfast: z.boolean(),
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  guests: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  notes: z.string().optional(),
  origin: z.string().url(),
});

function nightsBetween(checkIn: string, checkOut: string) {
  const a = new Date(`${checkIn}T00:00:00Z`).getTime();
  const b = new Date(`${checkOut}T00:00:00Z`).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.round((b - a) / 86_400_000);
}

// Yoco live keys reject http:// return URLs, so always hand it an https origin.
function httpsOrigin(origin: string) {
  const configured = process.env["SITE_URL"];
  if (/^http:\/\/(localhost|127\.0\.0\.1)/i.test(origin)) {
    return configured ?? origin.replace(/^http:\/\//i, "https://");
  }
  return origin.replace(/^http:\/\//i, "https://");
}

export const createBookingCheckout = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => checkoutInput.parse(data))
  .handler(async ({ data }) => {
    const secret =
      process.env["YOCO_SECRET_KEY"] ?? process.env["STRIPE_LIVE_API_KEY"];
    if (!secret) throw new Error("Payment key is not configured.");

    const room = getRoom(data.roomSlug);
    if (!room) throw new Error("That room could not be found.");

    const nights = nightsBetween(data.checkIn, data.checkOut);
    if (nights < 1) throw new Error("Check-out must be after check-in.");

    const nightly = data.breakfast ? room.priceWithBreakfast : room.priceRoomOnly;
    const totalRands = nightly * nights;
    const amountInCents = Math.round(totalRands * 100);
    const origin = httpsOrigin(data.origin);

    const res = await fetch("https://payments.yoco.com/api/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInCents,
        currency: "ZAR",
        successUrl: `${origin}/payment-success`,
        cancelUrl: `${origin}/payment-cancelled`,
        failureUrl: `${origin}/payment-cancelled`,
        metadata: {
          room: room.name,
          roomSlug: room.slug,
          nights: String(nights),
          nightlyRate: String(nightly),
          breakfast: data.breakfast ? "included" : "room only",
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          guests: data.guests,
          guestName: data.name,
          guestPhone: data.phone,
          guestEmail: data.email || "",
          notes: (data.notes ?? "").slice(0, 400),
        },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Yoco checkout failed", res.status, body);
      throw new Error("We could not start the payment. Please try again or call us.");
    }

    const checkout = (await res.json()) as { id?: string; redirectUrl?: string };
    if (!checkout.redirectUrl) {
      throw new Error("We could not start the payment. Please try again or call us.");
    }

    return {
      redirectUrl: checkout.redirectUrl,
      checkoutId: checkout.id ?? null,
      totalRands,
      nights,
    };
  });
