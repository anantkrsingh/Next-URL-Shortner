import Footer from "@/components/Footer";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
