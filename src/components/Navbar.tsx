import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-transparent bg-transparent">
      <div className="container-page flex h-[64px] items-center">
        <Link
          href="/"
          className="inline-flex items-baseline gap-0 font-display text-fs-h4 font-bold tracking-tight text-ink-strong"
          aria-label="TechUpServices home"
        >
          <span>Tech</span>
          <span className="text-brand-gradient">Up</span>
          <span className="font-medium">Services</span>
        </Link>
      </div>
    </header>
  );
}
