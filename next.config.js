// next.config.js
module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://floater.jessejesse.xyz/path*', 
          },
        ]
    },
};
