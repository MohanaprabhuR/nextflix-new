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
  //Ignore the type errors
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors during build
  },
};

export default nextConfig;
