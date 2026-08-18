import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <main id="main-content" className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
