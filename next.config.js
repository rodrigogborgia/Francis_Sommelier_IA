/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  env: {
    // Producción: el front conversa con el backend detrás de Nginx por HTTPS
    NEXT_PUBLIC_API_BASE_URL: "https://tusommeliervirtual.com/api",
  },
  // Si usás imágenes externas, configurá aquí:
  // images: { domains: ['cdn.heygen.com'] },
};

module.exports = nextConfig;
