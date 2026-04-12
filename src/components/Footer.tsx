import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Courses: [
    { href: "/courses?continent=europe", label: "Europe" },
    { href: "/courses?continent=north-america", label: "North America" },
    { href: "/courses?continent=oceania", label: "Oceania" },
    { href: "/courses?difficulty=expert", label: "Expert Courses" },
    { href: "/courses?difficulty=advanced", label: "Advanced Courses" },
  ],
  Destinations: [
    { href: "/courses?country=Scotland", label: "Scotland" },
    { href: "/courses?country=Ireland", label: "Ireland" },
    { href: "/courses?country=Northern Ireland", label: "Northern Ireland" },
    { href: "/courses?country=England", label: "England" },
    { href: "/courses?country=United States", label: "United States" },
  ],
  Plan: [
    { href: "/finder", label: "Course Finder" },
    { href: "/courses", label: "Browse All" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center">
              <Image
                src="/linksgolf.png"
                alt="LINKSGOLF"
                width={176}
                height={25}
                unoptimized
                className="brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
              The definitive guide to the world&apos;s finest links golf courses. Every course, every detail.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)] mb-4">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-primary-foreground/10" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} LINKSGOLF. All rights reserved.</p>
          <p>linksgolf.xyz</p>
        </div>
      </div>
    </footer>
  );
}
