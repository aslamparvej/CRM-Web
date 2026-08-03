import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Put every lead on the rail.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Free for up to 100 leads. No credit card, no sales call required.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
          >
            <Link href="/register" className="flex items-center">
              Get started free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            <Link href="/contact">Talk to sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
