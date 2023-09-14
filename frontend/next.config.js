/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains:['cdn.weatherapi.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      }
    ]
  }
}

module.exports = nextConfig
