"use client";

import Lower from "@/components/Lower";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className=" flex items-center justify-center h-screen w-screen">
          <main className="bg-gray-100 h-screen w-screen sm:h-[700px] sm:w-[450px] flex flex-col justify-between">
            <div className="p-6">{children}</div>
            <Lower />
          </main>
        </body>
      </html>
    </QueryClientProvider>
  );
}
