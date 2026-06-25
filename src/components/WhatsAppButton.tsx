"use client";

/**
 * WhatsAppButton — kept; restyled to token system; safe-area-inset on mobile.
 * Subtle hover (no whileHover scale 1.1 — design.md anti-default).
 */

export default function WhatsAppButton() {
  const whatsappNumber = "918237447244";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed z-50 inline-flex items-center justify-center rounded-pill bg-[#25D366] text-white shadow-2 hover:shadow-3 transition-shadow duration-base ease-standard"
      style={{
        width: 56,
        height: 56,
        right: "calc(env(safe-area-inset-right, 0px) + 1rem)",
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-7 h-7 fill-current"
        aria-hidden="true"
      >
        <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.128.552 4.195 1.602 6.014L.15 23.328l5.441-1.428c1.761.944 3.722 1.442 5.761 1.442v-.001h.001c6.647 0 12.03-5.383 12.03-12.031C23.383 5.383 18.679 0 12.031 0zm0 21.085c-1.801 0-3.567-.482-5.115-1.401l-.367-.217-3.801.996.996-3.801L3.527 16.3c-1.009-1.608-1.54-3.468-1.54-5.37C1.987 5.483 6.483.987 12.031.987c5.548 0 10.043 4.496 10.043 10.044 0 5.548-4.495 10.044-10.043 10.044zm5.503-7.531c-.301-.151-1.785-.882-2.062-.982-.276-.1-.478-.151-.678.151-.201.301-.78 1.002-.958 1.205-.178.201-.355.226-.656.075-1.558-.787-2.651-1.47-3.666-3.235-.201-.352.203-.326.787-1.498.075-.15.038-.276-.038-.426-.075-.15-.678-1.636-.928-2.24-.244-.589-.492-.511-.678-.521l-.578-.01c-.2 0-.528.075-.804.376-.276.301-1.054 1.03-1.054 2.509 0 1.48 1.08 2.91 1.231 3.111.15.201 2.11 3.226 5.112 4.52.715.309 1.272.493 1.708.631.717.228 1.368.196 1.884.119.58-.088 1.785-.73 2.036-1.432.251-.702.251-1.305.176-1.432-.075-.126-.276-.201-.578-.352z" />
      </svg>
    </a>
  );
}
