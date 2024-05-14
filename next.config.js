/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "images.unsplash.com",
            port: "",
            pathname: "/**",
          },
          {
            protocol: "https",
            hostname: "xsamluehlbsmrmjnymnf.supabase.co",
            port: "",
          },
          {
            protocol: "https",
            hostname: "img.freepik.com",
            port: "",
          },
        ],
      },
};

module.exports = nextConfig;
