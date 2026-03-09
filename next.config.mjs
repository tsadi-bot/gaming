/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port:"",
        
      },
      {
        hostname:"images.unsplash.com",
      }
    ]
  }
  
};

export default nextConfig;
