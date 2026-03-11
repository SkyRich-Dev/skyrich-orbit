import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object;
  noindex?: boolean;
}

const SITE_NAME = "SkyRich Orbit";
const SITE_URL = typeof window !== "undefined" ? window.location.origin : "";
const DEFAULT_IMAGE = "/opengraph.jpg";

const TARGET_REGIONS = [
  { code: "en-IN", country: "India" },
  { code: "en-TH", country: "Thailand" },
  { code: "en-MY", country: "Malaysia" },
  { code: "en-SG", country: "Singapore" },
  { code: "en-PH", country: "Philippines" },
  { code: "en-KH", country: "Cambodia" },
];

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage,
  structuredData,
  noindex = false,
}: SEOProps) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;
  const imageUrl = ogImage || `${SITE_URL}${DEFAULT_IMAGE}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {TARGET_REGIONS.map((region) => (
        <link
          key={region.code}
          rel="alternate"
          hrefLang={region.code}
          href={canonicalUrl || SITE_URL}
        />
      ))}
      <link rel="alternate" hrefLang="en" href={canonicalUrl || SITE_URL} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl || SITE_URL} />

      <meta name="geo.region" content="SG" />
      <meta name="geo.placename" content="Singapore" />
      <meta name="ICBM" content="1.3521, 103.8198" />
      <meta name="language" content="English" />
      <meta name="distribution" content="global" />
      <meta name="target" content="India, Thailand, Malaysia, Singapore, Philippines, Cambodia" />
      <meta name="audience" content="SMEs, Small Business Owners, Entrepreneurs, Marketing Managers" />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SkyRich Orbit",
    legalName: "SkyRich Tech Solution Pte Ltd",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    description: "Digital growth agency engineering scalable marketing systems for ambitious SMEs across Asia Pacific — India, Singapore, Malaysia, Thailand, Philippines, and Cambodia.",
    email: "info@skyrichorbit.com",
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "Thailand" },
      { "@type": "Country", name: "Malaysia" },
      { "@type": "Country", name: "Singapore" },
      { "@type": "Country", name: "Philippines" },
      { "@type": "Country", name: "Cambodia" },
    ],
    serviceType: [
      "Digital Marketing",
      "Website Development",
      "SEO Services",
      "Performance Marketing",
      "Marketing Automation",
      "CRM Integration",
      "Conversion Rate Optimization",
      "Digital Analytics",
    ],
    sameAs: [],
  };
  return data;
}

export function WebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SkyRich Orbit",
    url: SITE_URL,
    description: "Digital growth systems for ambitious SMEs in India, Singapore, Malaysia, Thailand, Philippines, and Cambodia.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function ServiceSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "SkyRich Orbit",
      url: SITE_URL,
    },
    url: `${SITE_URL}${url}`,
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "Singapore" },
      { "@type": "Country", name: "Malaysia" },
      { "@type": "Country", name: "Thailand" },
      { "@type": "Country", name: "Philippines" },
      { "@type": "Country", name: "Cambodia" },
    ],
    serviceType: "Digital Marketing",
  };
}

export function BlogPostSchema(post: {
  title: string;
  excerpt: string;
  author: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "SkyRich Orbit",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` },
    },
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    articleSection: post.category,
    inLanguage: "en",
  };
}

export function BreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function FAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
