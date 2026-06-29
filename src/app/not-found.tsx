import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-[var(--text-muted)] mb-4 font-mono">404</div>
        <h1 className="text-xl font-semibold text-[var(--text)] mb-2">Page not found</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-90 transition-opacity"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
