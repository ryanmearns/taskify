/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'tailwindui.com',
      port: '',
      pathname: '/**',
    }]
  },
  transpilePackages: ["@playbook/ui", "@playbook/tailwind-config", "@playbook/forms"]
}

module.exports = nextConfig
