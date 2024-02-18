import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TOKYO GARDEN",
  description: "東東京の庭園を紹介します。",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <section id="hero">
          <div className="container max-w-6xl mx-auto px-6 py-12">
            <nav className="flex items-center justify-between font-bold text-white">
              <div>
                <Link href="/" passHref>
                  <Image
                    width={200}
                    height={100}
                    src="/images/logo-white.svg"
                    alt="TOKYO GARDEN"
                  />
                </Link>
              </div>
            </nav>
          </div>
        </section>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between">
                <ModeToggle />
                <nav className="ml-auto text-sm font-medium space-x-6">
                  <Link href="/">Home</Link>
                  <Link href="/about">About</Link>
                </nav>
              </div>
            </header>
            <main>
              東京の庭園を紹介します。
              {children}
            </main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
