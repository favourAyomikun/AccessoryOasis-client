/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // Add 'localhost' to allowed image domains
  },
};

export default nextConfig; // Use 'export default' instead of 'module.exports'

  