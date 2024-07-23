/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects(){
        return [
            // Basic redirects
          {
            source: "/aboutme",
            destination: "/about",
            permanent: true,
          },
          // Wildcard path matching
          {
            source: "/community/:slug",
            destination: "/posts/:slug",
            permanent: true,
          },
        ];
    }
};

export default nextConfig;
