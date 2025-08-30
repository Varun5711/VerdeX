'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it Works' },
    { href: '/docs', label: 'Docs' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link href="/" aria-label="Home" className="flex items-center gap-2">
          {/* Replace with your brand image if available */}
          <div className="h-6 w-6 rounded-sm bg-primary" aria-hidden="true" />
          <span className="font-semibold">Logo</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost">
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/get-started">Get Started</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              {open ? (
                <path strokeWidth="2" strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeWidth="2" strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </Button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={cn(
          'md:hidden overflow-hidden border-t border-border transition-all duration-200 ease-out',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 md:px-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded px-2 py-2 text-sm text-foreground/90 hover:bg-accent hover:text-accent-foreground"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center gap-2">
            <Button asChild variant="ghost" className="flex-1">
              <Link href="/signin" onClick={() => setOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/get-started" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

