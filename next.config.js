/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,},
	env: {
  mongodb_username: "pqppq",
  mondodb_password: "PASSWORD",
  mongodb_clustername: "cluster0",
  mongodb_database: "my-site",
	}
};

module.exports = nextConfig;
