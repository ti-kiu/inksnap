/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/tattoo-try-on",
        destination: "/tattoo-simulator",
        permanent: true,
      },
      {
        source: "/virtual-tattoo",
        destination: "/tattoo-simulator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
