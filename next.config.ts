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
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
