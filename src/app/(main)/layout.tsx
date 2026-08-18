import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GlassBackdrop from "@/components/GlassBackdrop";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <GlassBackdrop />
      <Navbar />
      <main id="main-content" className="relative z-10 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
