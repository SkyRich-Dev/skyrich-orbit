import SEO from "@/components/SEO";

export default function Growth() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="SkyRich 100 Growth Partners Program"
        description="Apply for SkyRich's 100 Growth Partners Program and explore the sponsored premium business website opportunity."
        canonical="/growth"
        ogImage="/growth/opengraph.jpg"
      />

      <iframe
        title="SkyRich 100 Growth Partners Program"
        src="/growth/"
        className="block w-full border-0 bg-white"
        style={{ height: "100svh" }}
      />
    </div>
  );
}
