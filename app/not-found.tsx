import Link from "next/link";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      {/* Ambient accent glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "#EEB30D" }}
        aria-hidden="true"
      />
      <div className="max-w-md text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <span className="text-4xl font-bold text-primary">404</span>
        </div>

        <h1 className="text-4xl font-bold text-foreground">Page not found</h1>

        <p className="mt-3 text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
