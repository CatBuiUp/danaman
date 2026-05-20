import type { ReactNode } from "react";

import { siteContentContainerClass } from "@/lib/site-layout";

type ContentSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export function ContentSection({ id, children, className = "" }: ContentSectionProps) {
  return (
    <section
      id={id}
      className={`py-20 ${className}`.trim()}
    >
      <div className={siteContentContainerClass}>{children}</div>
    </section>
  );
}
