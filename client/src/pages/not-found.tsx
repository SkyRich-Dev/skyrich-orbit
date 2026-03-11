import { Link } from "wouter";
import { AlertCircle, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0A0D14]">
      <SEO
        title="404 - Page Not Found"
        description="The page you are looking for does not exist."
        noindex={true}
      />
      <div className="text-center px-6">
        <div className="flex items-center justify-center mb-6">
          <AlertCircle className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-display font-bold text-white mb-4" data-testid="text-404-heading">404</h1>
        <p className="text-xl text-slate-300 mb-2">Page Not Found</p>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          data-testid="link-back-home"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
