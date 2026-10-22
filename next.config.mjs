/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // The supplied FlutedGlass cleanup loses its context during Strict Mode's effect replay.
  reactStrictMode: false,
};

export default nextConfig;
