let API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Render provides only the host (e.g. 'app.onrender.com') via the 'host' property.
// We need to ensure it includes the protocol.
if (API_URL && !API_URL.startsWith('http')) {
  // Use http for localhost, https for everything else (Render)
  if (API_URL.includes('localhost') || API_URL.includes('127.0.0.1')) {
    API_URL = `http://${API_URL}`;
  } else {
    API_URL = `https://${API_URL}`;
  }
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // Always proxy to the real backend API URL; inside Docker this is http://backend:5000
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
