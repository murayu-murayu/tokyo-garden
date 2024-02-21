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
        <footer className="bg-black">
          <div className="container max-w-6xl py-10 mx-auto">
            <div className="flex flex-col items-center mb-8 space-y-6 md:flex-row md:space-y-0 md:justify-between md:items-start">
              <div className="flex flex-col items-center space-y-8 md:items-start md:space-y-4">
                <div className="flex flex-col items-center space-y-4 font-bold text-white md:flex-row md:space-y-0 md:space-x-6 md:ml-3">
                  <div className="h-10 group">
                    <a href="/">Home</a>
                    <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                  </div>
                  <div className="h-10 group">
                    <a href="/about">About</a>
                    <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-between space-y-4 text-gray-500">
                <div className="font-bold">TOKYO GARDEN</div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
