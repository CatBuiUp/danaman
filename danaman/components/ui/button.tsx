import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  target?: string;
  rel?: string;
};

export function Button({ href, children, target, rel }: ButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className="inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:opacity-90"
    >
      {children}
    </Link>
  );
}
