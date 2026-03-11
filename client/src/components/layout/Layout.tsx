import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LeadModals from "./LeadModals";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#F8FAFC] flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />
      <main className="flex-grow pt-20 flex flex-col relative z-10">
        {children}
      </main>
      <Footer />
      <LeadModals />
    </div>
  );
}
