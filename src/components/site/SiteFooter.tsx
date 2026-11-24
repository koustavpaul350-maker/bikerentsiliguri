import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Phone } from "lucide-react";
import { BUSINESS, DIRECTIONS_URL, PHONE_HREF, WHATSAPP_URL } from "@/data/business";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { NAV_LINKS } from "./nav";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-midnight">
      <div className="shell grid gap-14 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-8 max-w-sm font-display text-3xl leading-tight text-foreground/90">
            The road is yours.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Motorcycle and scooter rental in Siliguri — the gateway to the hills, forests and rivers of North Bengal.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-muted-foreground">Explore</p>
          <ul className="mt-6 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-underline text-sm text-foreground/85 hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/booking" className="link-underline text-sm text-primary">
                Booking enquiry
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow text-muted-foreground">Visit & write</p>
          <address className="mt-6 not-italic text-sm leading-relaxed text-foreground/85">
            {BUSINESS.addressLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="link-underline mt-5 inline-block text-sm text-foreground"
          >
            {BUSINESS.email}
          </a>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={PHONE_HREF} className="inline-flex items-center gap-3 text-foreground/85 hover:text-foreground">
                <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="link-underline">{BUSINESS.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-foreground/85 hover:text-foreground"
              >
                <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
                <span className="link-underline">WhatsApp us</span>
              </a>
            </li>
          </ul>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer"
            className="eyebrow mt-6 flex items-center gap-2 text-primary hover:text-bronze-glow"
          >
            Get directions <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      <div className="hairline" />
      <div className="shell flex flex-col gap-3 py-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
        <Link to="/credits" className="link-underline self-start md:self-auto">
          Photography credits
        </Link>
      </div>
    </footer>
  );
}
