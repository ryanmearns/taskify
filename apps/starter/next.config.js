/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@playbook/ui", "@playbook/tailwind-config"],
  reactStrictMode: true
}

module.exports = nextConfig
