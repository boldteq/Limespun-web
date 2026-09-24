import type { NextConfig } from "next";

const baseHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// Next.js streaming injects inline <script> tags to resolve Suspense boundaries.
// 'unsafe-inline' is required; without it the loading fallback shows forever.
// 'unsafe-eval' is required by Turbopack in development.
const prodCSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
].join("; ");

const devCSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self' ws: wss:",
  "frame-ancestors 'none'",
].join("; ");

function securityHeaders(isDev: boolean) {
  return [
    ...baseHeaders,
    {
      key: "Content-Security-Policy",
      value: isDev ? devCSP : prodCSP,
    },
  ];
}

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: process.env.NODE_ENV === "development",
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 991, 1200, 1280, 1440, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    const cacheRules = isDev ? [] : [
      {
        source: "/images/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        source: "/fonts/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
    return [{ source: "/(.*)", headers: securityHeaders(isDev) }, ...cacheRules];
  },
  // Retired routes. The old call-booking page sends people to contact instead.
  async redirects() {
    return [
      { source: "/book-a-demo", destination: "/contact", permanent: true },
      { source: "/customers", destination: "/", permanent: true },
      { source: "/customers/:slug", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
