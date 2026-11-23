import { BUSINESS, WHATSAPP_URL } from "@/data/business";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Fixed bottom-right WhatsApp chat button shown on every page. */
export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${BUSINESS.name} on WhatsApp`}
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-luxe ring-1 ring-foreground/10 transition-all duration-500 ease-luxe hover:scale-105 hover:shadow-[0_0_0_6px_color-mix(in_oklab,var(--whatsapp)_25%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:bottom-8 md:right-8 md:h-16 md:w-16"
    >
      <WhatsAppIcon className="h-7 w-7 md:h-8 md:w-8" />
      <span className="eyebrow pointer-events-none absolute right-full mr-4 hidden whitespace-nowrap bg-background/90 px-3 py-2 text-[0.6rem] text-foreground opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 md:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
