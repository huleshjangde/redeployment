
// next.config.js
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'fakestoreapi.com',
        
        },
        {
            protocol : 'https',
            hostname : 'www.freepnglogos.com'
        }
      ],
    },
  }