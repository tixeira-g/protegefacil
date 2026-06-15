import Link from "next/link";
import { Shield } from "./Shield";

export function Header({ subtitle }: { subtitle?: string }) {
  return (
    <header className="flex items-center gap-3">
      <Link href="/" className="flex items-center gap-3 group">
        <span className="grid h-11 w-11 flex-none place-items-center rounded-[13px] bg-gradient-to-b from-navy-soft to-navy-deep shadow-mark transition group-hover:brightness-110">
          <Shield className="h-[23px] w-[23px]" />
        </span>
        <span>
          <span className="block font-display text-lg font-extrabold leading-none tracking-tight text-navy-deep">
            ProtegeFácil
          </span>
          <span className="text-[11.5px] text-muted">
            {subtitle ?? "Seu escudo contra golpes digitais"}
          </span>
        </span>
      </Link>
    </header>
  );
}
