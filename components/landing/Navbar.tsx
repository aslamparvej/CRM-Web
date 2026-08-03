"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";

const links = [
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="h-16 px-6 mx-auto max-w-7xl flex  items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div>
            <p className="font-bold text-2xl">
              AFS <span className="text-primary">Desk</span>
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium transition hover:text-[#EEB30D]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost">
            <Link href="login">Login</Link>
          </Button>

          <Button className="bg-primary text-black hover:bg-(--primary-hover) cursor-pointer">
            <Link href="/register">Start Free Trial</Link>
          </Button>
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Button size="icon" variant="ghost" className="lg:hidden">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <div className="mt-8 flex flex-col gap-5">
                {links.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="font-medium"
                  >
                    {item.label}
                  </Link>
                ))}

                <Button className="mt-6 bg-[#EEB30D] text-black hover:bg-[#D89F08]">
                  Start Free Trial
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
