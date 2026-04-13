import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LINKSGOLF — The World's Finest Links Courses",
  description:
    "Discover, compare, and book the world's greatest links golf courses. Expert guides on every course, from Royal County Down to Cabot Cliffs.",
  keywords: ["links golf", "golf courses", "golf travel", "links courses", "golf holidays"],
  icons: {
    icon: "/linksgolf.png",
    shortcut: "/linksgolf.png",
    apple: "/linksgolf.png",
  },
  openGraph: {
    title: "LINKSGOLF — The World's Finest Links Courses",
    description: "Discover and compare the world's greatest links golf courses.",
    type: "website",
    url: "https://linksgolf.xyz",
    images: [
      {
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/99/32/9f/rolling-fairways-high.jpg?w=1400&h=800&s=1",
        width: 1400,
        height: 800,
        alt: "Links golf aerial view",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LINKSGOLF — The World's Finest Links Courses",
    description: "Discover and compare the world's greatest links golf courses.",
    images: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/99/32/9f/rolling-fairways-high.jpg?w=1400&h=800&s=1"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-D782ZN62VQ" />
    </html>
  );
}
