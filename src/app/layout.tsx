import "./globals.css";
import "@radix-ui/themes/styles.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { Navbar } from "@/frontend/components/layout/navbar/navbar";
import { AuthWrapper } from "../frontend/wrappers/AuthWrapper";
import { JotaiWrapper } from "@/frontend/wrappers/JotaiWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HRR Data Dashboard",
  description: "A place for a dashboard for anything",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JotaiWrapper>
          <AuthWrapper>
            <Theme appearance="dark">
              {/* <ThemeHOC> */}
              <Navbar />
              <main>{children}</main>
              {/* </ThemeHOC> */}
            </Theme>
          </AuthWrapper>
        </JotaiWrapper>
      </body>
    </html>
  );
}
