import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { site } from "@/lib/site";
import { rooms } from "@/lib/rooms";
import { createBookingCheckout } from "@/lib/payments.functions";

const initial = {
  name: "",
  phone: "",
  email: "",
  checkIn: "",
  checkOut: "",
  guests: "2",
  message: "",
};

type RoomOption = {
  name: string;
  slug?: string;
  priceRoomOnly: number | string;
  priceWithBreakfast: number | string;
};

function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(`${checkIn}T00:00:00Z`).getTime();
  const b = new Date(`${checkOut}T00:00:00Z`).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.max(0, Math.round((b - a) / 86_400_000));
}

export function BookingForm({ room }: { room?: RoomOption }) {
  const startCheckout = useServerFn(createBookingCheckout);

  const [slug, setSlug] = useState(room?.slug ?? rooms[0]!.slug);
  const [breakfast, setBreakfast] = useState(false);
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected = useMemo(
    () => rooms.find((r) => r.slug === slug) ?? rooms[0]!,
    [slug],
  );
  const nightly = breakfast ? selected.priceWithBreakfast : selected.priceRoomOnly;
  const nights = nightsBetween(form.checkIn, form.checkOut);
  const total = nightly * nights;

  const summary =
    `Booking enquiry for House Of Nyibiba%0A` +
    `Room: ${selected.name}%0A` +
    `Name: ${form.name}%0A` +
    `Phone: ${form.phone}%0A` +
    `Email: ${form.email || "-"}%0A` +
    `Check-in: ${form.checkIn}%0A` +
    `Check-out: ${form.checkOut}%0A` +
    `Guests: ${form.guests}%0A` +
    `Breakfast: ${breakfast ? "Included" : "Room only"}%0A` +
    `Nights: ${nights || "-"}%0A` +
    `Total: R${total || "-"}%0A` +
    `Notes: ${form.message || "-"}`;

  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${summary}`;

  function set<K extends keyof typeof initial>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onEnquire() {
    setSent(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  async function onPay(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (nights < 1) {
      setError("Please choose a check-out date after your check-in date.");
      return;
    }
    setPaying(true);
    try {
      const result = await startCheckout({
        data: {
          roomSlug: selected.slug,
          breakfast,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          guests: form.guests,
          name: form.name,
          phone: form.phone,
          email: form.email,
          notes: form.message,
          origin: window.location.origin,
        },
      });
      window.location.href = result.redirectUrl;
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "We could not start the payment. Please try again or call us.",
      );
      setPaying(false);
    }
  }

  return (
    <form onSubmit={onPay} className="rounded-lg border border-border bg-card p-6 shadow-soft sm:p-8">
      <p className="eyebrow">Book & pay</p>
      <h2 className="mt-3 text-2xl text-foreground">
        {room ? `Book ${selected.name}` : "Book your stay"}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Choose your dates and pay securely by card. Your booking is confirmed as soon as the
        payment goes through.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="eyebrow">Room</span>
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="field mt-2"
          >
            {rooms.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name} — from R{r.priceRoomOnly} per night
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="eyebrow">Full name</span>
          <input
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="field mt-2"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="eyebrow">Phone</span>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className="field mt-2"
            placeholder="Your contact number"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="eyebrow">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="field mt-2"
            placeholder="you@example.com"
          />
        </label>
        <label className="block">
          <span className="eyebrow">Check-in</span>
          <input
            required
            type="date"
            value={form.checkIn}
            onChange={(e) => set("checkIn", e.target.value)}
            className="field mt-2"
          />
        </label>
        <label className="block">
          <span className="eyebrow">Check-out</span>
          <input
            required
            type="date"
            value={form.checkOut}
            onChange={(e) => set("checkOut", e.target.value)}
            className="field mt-2"
          />
        </label>
        <label className="block">
          <span className="eyebrow">Guests</span>
          <select
            value={form.guests}
            onChange={(e) => set("guests", e.target.value)}
            className="field mt-2"
          >
            {["1", "2", "3", "4", "5", "6+"].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="eyebrow">Breakfast</span>
          <select
            value={breakfast ? "yes" : "no"}
            onChange={(e) => setBreakfast(e.target.value === "yes")}
            className="field mt-2"
          >
            <option value="no">Room only (R{selected.priceRoomOnly} per night)</option>
            <option value="yes">With breakfast (R{selected.priceWithBreakfast} per night)</option>
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="eyebrow">Anything else?</span>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            className="field mt-2"
            placeholder="Arrival time, shuttle request, special occasion…"
          />
        </label>
      </div>

      <div className="mt-7 rounded border border-border bg-sand p-5">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            R{nightly} × {nights || 0} night{nights === 1 ? "" : "s"}
          </span>
          <span>{breakfast ? "Breakfast included" : "Room only"}</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="eyebrow">Total to pay</span>
          <span className="font-display text-3xl text-foreground">
            {total > 0 ? `R${total}` : <span className="text-muted-foreground text-lg">Select your dates</span>}
          </span>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={paying} className="btn-base btn-primary disabled:opacity-60">
          {paying ? "Opening secure payment…" : "Pay Now"}
        </button>
        <button type="button" onClick={onEnquire} className="btn-base btn-outline text-foreground">
          Enquire on WhatsApp
        </button>
      </div>

      {error && (
        <p className="mt-5 rounded border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">
          {error} You can also call {site.phoneDisplay}.
        </p>
      )}

      {sent && (
        <p className="mt-5 rounded border border-accent/50 bg-accent/10 p-4 text-sm text-foreground">
          Thank you, {form.name || "guest"}. Your enquiry opens in WhatsApp so you can send it
          straight to us — or call {site.phoneDisplay} and we'll help right away.
        </p>
      )}

      <p className="mt-5 text-xs text-muted-foreground">
        Payments are processed securely by Yoco in South African Rand. Rates include your selected
        breakfast option.
      </p>
    </form>
  );
}
