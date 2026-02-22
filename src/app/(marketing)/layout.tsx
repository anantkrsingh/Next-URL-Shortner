import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="fixed inset-0 bg-black -z-10" />

            {/* Glass effect gradient blob */}
            <div
                className="fixed inset-0 opacity-40 -z-10"
                style={{
                    background: `
            radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 60%)
          `
                }}
            />

            {/* Grain texture */}
            <div
                className="fixed inset-0 opacity-20 -z-10"
                style={{
                    backgroundImage: "url(/grain.png)",
                    backgroundSize: "150px 150px",
                    backgroundRepeat: "repeat",
                    mixBlendMode: "overlay",
                }}
            />

            <Navbar />
            <div className="relative min-h-screen flex flex-col">
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
        </>
    );
}
