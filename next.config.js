/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_APP_HOST:"https://backendwatch-production.up.railway.app",
    NEXT_APP_STRIPE_PUBLISHABLE_KEY:'pk_test_51PBaCGKv2xIKQkngGij2fLZ6TDiXPNS0dKJJ81UZ3ePUSSc0I5sWq492Vax6PlJFUdXk08YmqOymQ63cY7s9I3qz00VU6Xz0Jv'
    },
  images:{
    domains:["res.cloudinary.com"]
  }
}

module.exports = nextConfig;
