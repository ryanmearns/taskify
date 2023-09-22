/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'tailwindui.com',
      port: '',
      pathname: '/**',
    }, {
      protocol: 'https',
      hostname: 'avatar.vercel.sh',
      port: '',
      pathname: '/**',
    }]
  },
  transpilePackages: ["@playbook/ui", "@playbook/tailwind-config", "@playbook/forms"]
}

module.exports = nextConfig
