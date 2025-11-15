import { cn } from "@/lib/utils";
import Link from "next/link";
import { Utensils } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-xl font-bold tracking-tight text-foreground",
        className
      )}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Utensils className="h-5 w-5" />
      </div>
      <span className="font-headline">TableTop Touch</span>
    </Link>
  );
}
