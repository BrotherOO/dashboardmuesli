import "./globals.css";
import type { Metadata } from "next";
import { AdminProvider } from "@/components/AdminProvider";

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
    <html lang="de">
      <body>
        <AdminProvider>{children}</AdminProvider>
      </body>
    </html>
  );
}
