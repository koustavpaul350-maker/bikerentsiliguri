import { Link } from "@tanstack/react-router";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="group flex flex-col leading-none" aria-label="Bike Rent Siliguri — home">
      <span className="font-display text-[1.6rem] tracking-[0.04em] md:text-[1.8rem]">
        Bike Rent
      </span>
      <span className="eyebrow mt-1 flex items-center gap-2 text-[0.58rem] tracking-[0.5em] text-primary">
        <span className="h-px w-4 bg-primary transition-all duration-500 group-hover:w-7" aria-hidden="true" />
        Siliguri
      </span>
    </Link>
  );
}
