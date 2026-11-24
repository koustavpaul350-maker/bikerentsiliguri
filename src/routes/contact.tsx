import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Field, TextArea, TextInput } from "@/components/site/FormField";
import { PHOTOS } from "@/data/media";
import { BUSINESS, DIRECTIONS_URL, MAP_EMBED_URL, PHONE_HREF, WHATSAPP_URL, localBusinessJsonLd } from "@/data/business";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { contactSchema, type ContactValues } from "@/lib/booking-schema";

const DESCRIPTION =
  "Contact Bike Rent Siliguri — Darsaratpally Bazar, Sevoke Road, Siliguri, West Bengal 734001. Email bikerentsiliguri@gmail.com.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Bike Rent Siliguri, Sevoke Road" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Contact Bike Rent Siliguri" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(localBusinessJsonLd) }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (v: ContactValues) => {
    const { error } = await supabase.from("contact_messages").insert({
      full_name: v.fullName,
      email: v.email,
      subject: v.subject?.length ? v.subject : null,
      message: v.message,
    });
    if (error) {
      console.error(error);
      toast.error("We couldn't send your message", { description: `Please email us at ${BUSINESS.email}.` });
      return;
    }
    reset();
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's plan your <em className="italic text-primary">ride.</em>
          </>
        }
        intro={<p>Write to us, visit us on Sevoke Road, or send a message below.</p>}
        photo={PHOTOS.hillTownClouds}
      />

      <section className="section-y">
        <div className="shell grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow text-primary">Bike Rent Siliguri</p>
              <h2 className="display-md mt-5">Find us.</h2>
            </Reveal>

            <Reveal delay={100} className="mt-12 space-y-10">
              <div className="flex gap-5 border-t border-border pt-8">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="eyebrow text-[0.6rem] text-muted-foreground">Phone & WhatsApp</p>
                  <a href={PHONE_HREF} className="link-underline mt-2 inline-block font-display text-2xl md:text-3xl">
                    {BUSINESS.phoneDisplay}
                  </a>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild variant="outline-light" size="xl">
                      <a href={PHONE_HREF}>
                        <Phone className="text-primary" /> Call now
                      </a>
                    </Button>
                    <Button asChild variant="whatsapp" size="xl">
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon /> WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 border-t border-border pt-8">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="eyebrow text-[0.6rem] text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="link-underline mt-2 inline-block break-all font-display text-2xl md:text-3xl"
                  >
                    {BUSINESS.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-5 border-t border-border pt-8">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="eyebrow text-[0.6rem] text-muted-foreground">Address</p>
                  <address className="mt-2 font-display text-2xl not-italic leading-snug">
                    {BUSINESS.addressFull}
                  </address>
                  <Button asChild variant="bronze" size="xl" className="mt-8">
                    <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer">
                      Get directions <ArrowUpRight />
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal className="border border-border bg-card p-7 md:p-12">
              <h2 className="font-display text-4xl">Send a message</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                For a specific bike and dates, the{" "}
                <Link to="/booking" className="link-underline text-foreground">
                  booking enquiry
                </Link>{" "}
                is quickest.
              </p>

              {sent ? (
                <div className="mt-10 flex items-start gap-4 border border-primary/50 p-6" role="status">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                    <Check className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-2xl">Message received.</p>
                    <p className="mt-2 text-sm text-muted-foreground">We'll reply to you by email.</p>
                    <Button type="button" variant="line" className="mt-4" onClick={() => setSent(false)}>
                      Write another
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10 grid gap-8 sm:grid-cols-2">
                  <p className="text-xs text-muted-foreground sm:col-span-2">
                    Fields marked <span className="text-primary">*</span> are required.
                  </p>
                  <Field id="c-name" label="Your name" required error={errors.fullName?.message}>
                    <TextInput id="c-name" autoComplete="name" aria-invalid={Boolean(errors.fullName)} {...register("fullName")} />
                  </Field>
                  <Field id="c-email" label="Email address" required error={errors.email?.message}>
                    <TextInput
                      id="c-email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      {...register("email")}
                    />
                  </Field>
                  <Field id="c-subject" label="Subject" error={errors.subject?.message} className="sm:col-span-2">
                    <TextInput id="c-subject" {...register("subject")} />
                  </Field>
                  <Field id="c-message" label="Message" required error={errors.message?.message} className="sm:col-span-2">
                    <TextArea id="c-message" rows={5} aria-invalid={Boolean(errors.message)} {...register("message")} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Button type="submit" variant="bronze" size="xl" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" /> Sending…
                        </>
                      ) : (
                        "Send message"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="relative aspect-[4/5] w-full sm:aspect-[16/9] md:aspect-[21/8]">
          <iframe
            title="Map showing Bike Rent Siliguri on Sevoke Road, Siliguri"
            src={MAP_EMBED_URL}
            className="absolute inset-0 h-full w-full grayscale-[0.85] invert-[0.92] hue-rotate-180 contrast-[0.9]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}
