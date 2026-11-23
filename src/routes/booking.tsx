import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Field, SelectInput, TextArea, TextInput } from "@/components/site/FormField";
import { Picture } from "@/components/site/Picture";
import { Reveal } from "@/components/site/Reveal";
import { FLEET, formatPrice, getBike } from "@/data/fleet";
import { PHOTOS } from "@/data/media";
import { BUSINESS } from "@/data/business";
import { makeBookingSchema, rentalDays, todayInIndia, type BookingValues } from "@/lib/booking-schema";

const DESCRIPTION =
  "Send a booking enquiry for motorcycle or scooter rental in Siliguri. Choose your bike, pickup and return dates — we confirm availability by email.";

export const Route = createFileRoute("/booking")({
  validateSearch: (search: Record<string, unknown>): { bike?: string } =>
    typeof search["bike"] === "string" && getBike(search["bike"]) ? { bike: search["bike"] } : {},
  head: () => ({
    meta: [
      { title: "Book Your Ride — Bike Rental Enquiry | Bike Rent Siliguri" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Book Your Ride — Bike Rent Siliguri" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  const { bike: preselected } = Route.useSearch();
  const today = useMemo(() => todayInIndia(), []);
  const schema = useMemo(() => makeBookingSchema(today), [today]);
  const [submitted, setSubmitted] = useState<BookingValues | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      motorcycle: preselected ?? "",
      pickupDate: "",
      returnDate: "",
      message: "",
    },
  });

  const selectedSlug = watch("motorcycle");
  const pickup = watch("pickupDate");
  const ret = watch("returnDate");
  const bike = getBike(selectedSlug);
  const days = pickup && ret ? rentalDays(pickup, ret) : 0;

  const onSubmit = async (values: BookingValues) => {
    const chosen = getBike(values.motorcycle);
    const { error } = await supabase.from("booking_enquiries").insert({
      full_name: values.fullName,
      email: values.email,
      phone: values.phone,
      motorcycle: chosen?.name ?? values.motorcycle,
      pickup_date: values.pickupDate,
      return_date: values.returnDate,
      message: values.message?.length ? values.message : null,
    });
    if (error) {
      console.error(error);
      toast.error("We couldn't send your enquiry", {
        description: `Please try again, or email us at ${BUSINESS.email}.`,
      });
      return;
    }
    setSubmitted(values);
    reset({ ...values, message: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-svh pt-28 md:pt-0">
      <div className="grid md:min-h-svh md:grid-cols-12">
        {/* Visual column */}
        <aside className="relative hidden md:col-span-5 md:block">
          <div className="sticky top-0 h-svh overflow-hidden">
            <div className="grain absolute inset-0">
              {bike ? (
                <img
                  key={bike.slug}
                  src={bike.image.src}
                  alt={bike.image.alt}
                  width={bike.image.width}
                  height={bike.image.height}
                  className="animate-page-in h-full w-full object-cover"
                />
              ) : (
                <Picture photo={PHOTOS.sunsetCruiser} priority />
              )}
              <div className="bg-hero-overlay absolute inset-0" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-10 lg:p-14">
              <p className="eyebrow text-primary">{bike ? `${bike.make} · ${bike.style}` : "Booking enquiry"}</p>
              <p className="mt-4 font-display text-5xl leading-none lg:text-6xl">{bike ? bike.name : "Choose your ride."}</p>
              {bike ? (
                <p className="mt-4 text-foreground/80">
                  <span className="font-display text-3xl text-primary">{formatPrice(bike.pricePerDay)}</span>
                  <span className="ml-2 text-sm">per day</span>
                </p>
              ) : null}
              {bike?.representativePhoto ? (
                <p className="mt-3 text-xs text-foreground/60">Representative photograph.</p>
              ) : null}
            </div>
          </div>
        </aside>

        {/* Form column */}
        <div className="md:col-span-7">
          <div className="shell max-w-3xl py-12 md:px-14 md:py-40 lg:px-20">
            <p className="eyebrow flex items-center gap-4 text-primary">
              <span className="rule-bronze" aria-hidden="true" /> Booking
            </p>
            <h1 className="display-lg mt-5">
              Book your <em className="italic text-primary">ride.</em>
            </h1>
            <p className="lede mt-6 text-muted-foreground">
              Send us your details and dates. This is an enquiry — we'll reply by email to confirm availability before
              anything is booked.
            </p>

            {bike && !submitted ? (
              <div className="mt-10 flex items-center gap-5 border border-border bg-card p-3 md:hidden">
                <img
                  src={bike.image.src}
                  alt={bike.image.alt}
                  width={bike.image.width}
                  height={bike.image.height}
                  className="h-20 w-28 shrink-0 object-cover"
                />
                <div>
                  <p className="eyebrow text-[0.58rem] text-muted-foreground">Selected</p>
                  <p className="mt-1 font-display text-2xl leading-tight">{bike.name}</p>
                  <p className="text-sm text-primary">{formatPrice(bike.pricePerDay)} / day</p>
                </div>
              </div>
            ) : null}

            {submitted ? (
              <Reveal className="mt-12 border border-primary/50 bg-card p-8 md:p-10" >
                <div className="flex items-start gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                    <Check className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-3xl">Enquiry received.</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Thank you, {submitted.fullName.split(" ")[0]}. Your enquiry for the{" "}
                      <span className="text-foreground">{getBike(submitted.motorcycle)?.name}</span> from{" "}
                      <span className="text-foreground">{submitted.pickupDate}</span> to{" "}
                      <span className="text-foreground">{submitted.returnDate}</span> has been sent. We'll reply to{" "}
                      <span className="text-foreground">{submitted.email}</span> to confirm availability. Your booking is not
                      confirmed until you hear from us.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <Button type="button" variant="outline-light" size="lg" onClick={() => setSubmitted(null)}>
                        Send another enquiry
                      </Button>
                      <Button asChild variant="line">
                        <Link to="/motorcycles">Back to the collection</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-12 grid gap-9 sm:grid-cols-2" aria-describedby="required-note">
                <p id="required-note" className="text-xs text-muted-foreground sm:col-span-2">
                  Fields marked <span className="text-primary">*</span> are required.
                </p>

                <Field id="fullName" label="Full name" required error={errors.fullName?.message} className="sm:col-span-2">
                  <TextInput
                    id="fullName"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    {...register("fullName")}
                  />
                </Field>

                <Field id="email" label="Email address" required error={errors.email?.message}>
                  <TextInput
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                  />
                </Field>

                <Field id="phone" label="Phone number" required error={errors.phone?.message}>
                  <TextInput
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+91"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    {...register("phone")}
                  />
                </Field>

                <Field
                  id="motorcycle"
                  label="Select motorcycle"
                  required
                  error={errors.motorcycle?.message}
                  className="sm:col-span-2"
                  hint={bike ? `${formatPrice(bike.pricePerDay)} per day` : undefined}
                >
                  <SelectInput
                    id="motorcycle"
                    aria-invalid={Boolean(errors.motorcycle)}
                    aria-describedby={errors.motorcycle ? "motorcycle-error" : undefined}
                    {...register("motorcycle")}
                  >
                    <option value="">Choose a motorcycle or scooter…</option>
                    {FLEET.map((b) => (
                      <option key={b.slug} value={b.slug}>
                        {b.name} — {formatPrice(b.pricePerDay)}/day
                      </option>
                    ))}
                  </SelectInput>
                </Field>

                <Field id="pickupDate" label="Pickup date" required error={errors.pickupDate?.message}>
                  <TextInput
                    id="pickupDate"
                    type="date"
                    min={today}
                    aria-invalid={Boolean(errors.pickupDate)}
                    aria-describedby={errors.pickupDate ? "pickupDate-error" : undefined}
                    {...register("pickupDate")}
                  />
                </Field>

                <Field id="returnDate" label="Return date" required error={errors.returnDate?.message}>
                  <TextInput
                    id="returnDate"
                    type="date"
                    min={pickup || today}
                    aria-invalid={Boolean(errors.returnDate)}
                    aria-describedby={errors.returnDate ? "returnDate-error" : undefined}
                    {...register("returnDate", { deps: ["pickupDate"] })}
                  />
                </Field>

                <Field id="message" label="Additional message" error={errors.message?.message} className="sm:col-span-2">
                  <TextArea
                    id="message"
                    rows={4}
                    placeholder="Your route, number of riders, pickup time, any questions…"
                    {...register("message")}
                  />
                </Field>

                {bike && days > 0 ? (
                  <div className="flex items-baseline justify-between border-y border-border py-5 sm:col-span-2">
                    <p className="text-sm text-muted-foreground">
                      {bike.name} · {days} {days === 1 ? "day" : "days"} × {formatPrice(bike.pricePerDay)}
                    </p>
                    <p className="text-right">
                      <span className="font-display text-3xl text-primary">{formatPrice(days * bike.pricePerDay)}</span>
                      <span className="block text-[0.65rem] text-muted-foreground">Indicative — confirmed by email</span>
                    </p>
                  </div>
                ) : null}

                <div className="sm:col-span-2">
                  <Button type="submit" variant="bronze" size="xl" className="w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" /> Sending…
                      </>
                    ) : (
                      "Send booking enquiry"
                    )}
                  </Button>
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    Prefer email? Write to{" "}
                    <a href={`mailto:${BUSINESS.email}`} className="link-underline text-foreground">
                      {BUSINESS.email}
                    </a>
                    .
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
