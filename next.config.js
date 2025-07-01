/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_APP_HOST:"http://localhost:5000",
    NEXT_APP_STRIPE_PUBLISHABLE_KEY:'pk_test_51O5CTTJ4JWXOoJd9vnv0QjnUInNTF5xQHUiOxA1sZR74IMQespfwfBTStVq3pkKkSB7ZlJAywbWPxwheeSDE0f1b000CSKi9Fd'
    },
  images:{
    domains:["res.cloudinary.com"]
  }
}

module.exports = nextConfig;