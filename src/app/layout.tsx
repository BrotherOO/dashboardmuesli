import "./globals.css";
import type { Metadata } from "next";
import { AdminProvider } from "@/components/AdminProvider";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" });

export const metadata: Metadata = {
  title: "Dubinskiy Analytics",
  description: "Next.js E-Commerce Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={workSans.variable}>
      <body className="font-sans antialiased text-mymuesli-black bg-background">
        <AdminProvider>{children}</AdminProvider>
      </body>
    </html>
  );
}
