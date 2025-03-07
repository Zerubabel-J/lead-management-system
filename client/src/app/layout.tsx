import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className="flex flex-col min-h-screen"
      >
        <Navbar />
        <main className="flex-1 flex flex-col justify-center items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
