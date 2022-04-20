/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // serverRuntimeConfig: {
  //   // Will only be available on the server side
  //   URI: `${process.env.NEXT_PUBLIC_SCHOOL_BACKEND_HOST}:${process.env.NEXT_PUBLIC_SCHOOL_BACKEND_PORT}`
  // },
  // publicRuntimeConfig: {
  //   // Will be available on both server and client
  //   URI: `http://localhost:${process.env.NEXT_PUBLIC_SCHOOL_BACKEND_PORT}`
  // }
}

module.exports = nextConfig
