/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'host.docker.internal',
        port: '9155', // Укажите порт, если он используется
      },
      {
        protocol: 'https',
        hostname: 'api.ecagenthub.com',
      },
      {
        protocol: 'https',
        hostname: 'ecagenthub.com',
      },
    ],
  },
};

export default nextConfig;
