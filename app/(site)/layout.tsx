import Header from "@/components/Header";
import SoundPermissionModal from "@/components/SoundPermissionModal";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <SoundPermissionModal />
      <Footer />
    </>
  );
}
