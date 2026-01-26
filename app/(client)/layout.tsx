import Footer from "@/components/client/layout/Footer";
import Header from "@/components/client/layout/Header";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* {showReadingProgress && <ScrollProgress />} */}
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>
      <Footer />
    </div>
  );
}