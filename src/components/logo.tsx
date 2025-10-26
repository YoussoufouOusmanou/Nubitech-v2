"use client";

import React from 'react';
import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  // J'utilise un logo SVG externe comme placeholder. 
  // Remplacez cette URL par le chemin vers votre logo, par exemple "/images/votre-logo.png"
  const logoSrc = '/logo.png'

  return (
    <div className={cn("relative flex items-center", className)} {...props}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt="Nubitech Logo"
        className="object-contain h-10 w-auto"
        style={{ height: '2.5rem' }}
      />
    </div>
  )
}
