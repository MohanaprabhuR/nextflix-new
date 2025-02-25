/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Be cautious with using "**" - see explanation below
      },
    ],
  },
};

export default nextConfig;
