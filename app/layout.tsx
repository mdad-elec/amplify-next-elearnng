// app/layout.tsx
import { Authenticator } from '@aws-amplify/ui-react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "School Portal",
  description: "Student and Teacher Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Authenticator.Provider>
          {children}
        </Authenticator.Provider>
      </body>
    </html>
  );
}