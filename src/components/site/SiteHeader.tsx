import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { NAV_LINKS } from "./nav";
import { BUSINESS, PHONE_HREF, WHATSAPP_URL } from "@/data/business";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxe",
          scrolled || open
            ? "border-b border-border bg-background/85 py-3 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-6",
        )}
      >
        <div className="shell flex items-center justify-between gap-6">
          <Logo onClick={() => setOpen(false)} />

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.filter((l) => l.to !== "/").map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="eyebrow link-underline py-1 text-[0.66rem] tracking-[0.24em] text-foreground/80 transition-colors hover:text-foreground"
                activeProps={{ className: "text-primary! " }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={PHONE_HREF}
              aria-label={`Call ${BUSINESS.name} on ${BUSINESS.phoneDisplay}`}
              className="eyebrow inline-flex h-11 items-center justify-center gap-2.5 border border-foreground/25 px-3 text-[0.66rem] tracking-[0.22em] text-foreground transition-all duration-500 ease-luxe hover:border-primary hover:text-primary xl:h-10 xl:px-5"
            >
              <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="hidden xl:inline">Call now</span>
            </a>
            <Button asChild variant="bronze" size="lg" className="hidden sm:inline-flex">
              <Link to="/booking">Book your ride</Link>
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center border border-foreground/25 text-foreground transition-colors hover:border-foreground lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-background transition-all duration-700 ease-luxe lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center gap-1 pt-24">
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              tabIndex={open ? 0 : -1}
              className={cn(
                "flex items-baseline gap-5 border-b border-border py-4 font-display text-4xl transition-all duration-700 ease-luxe",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
            >
              <span className="numeral text-base text-muted-foreground">0{i + 1}</span>
              {l.label}
            </Link>
          ))}
          <Button asChild variant="bronze" size="xl" className="mt-10 w-full">
            <Link to="/booking" tabIndex={open ? 0 : -1}>
              Book your ride
            </Link>
          </Button>
        </nav>
        <div className="shell pb-10 pt-6 text-sm text-muted-foreground">
          <div className="grid grid-cols-2 gap-3">
            <Button asChild variant="outline-light" size="xl" className="px-4">
              <a href={PHONE_HREF} tabIndex={open ? 0 : -1}>
                <Phone className="text-primary" /> Call now
              </a>
            </Button>
            <Button asChild variant="whatsapp" size="xl" className="px-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
                <WhatsAppIcon /> WhatsApp
              </a>
            </Button>
          </div>
          <a href={`mailto:${BUSINESS.email}`} tabIndex={open ? 0 : -1} className="link-underline mt-6 inline-block">
            {BUSINESS.email}
          </a>
        </div>
      </div>
    </>
  );
}
