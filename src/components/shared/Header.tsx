import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" asChild className="rounded-full">
            <Link href="/staff/dashboard">Staff Dashboard</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
