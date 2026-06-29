"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-[var(--text-muted)] mb-4 font-mono">500</div>
        <h1 className="text-xl font-semibold text-[var(--text)] mb-2">Something went wrong</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
