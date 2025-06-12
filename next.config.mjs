/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  images: {
    remotePatterns: [
      ...(isDev
        ? [
          {
            protocol: 'http',
            hostname: 'host.docker.internal',
            port: '9155',
          },
        ]
        : []),
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
