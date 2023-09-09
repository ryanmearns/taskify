/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  transpilePackages: ["@playbook/ui", "@playbook/tailwind-config", "@playbook/forms"]
}

module.exports = nextConfig
