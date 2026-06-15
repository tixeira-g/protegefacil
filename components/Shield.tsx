export function Shield({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 2l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V5l7-3z"
        fill="#fff"
        opacity="0.96"
      />
      <rect x="9" y="11" width="6" height="5" rx="1.2" fill="#15315c" />
      <path d="M10 11V9.5a2 2 0 0 1 4 0V11" stroke="#15315c" strokeWidth="1.3" fill="none" />
    </svg>
  );
}
