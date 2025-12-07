import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Providers } from "./providers";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Admin Dashboard - Khel Kud",
  description: "Admin dashboard for managing users, organizations, bookings, and venues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
