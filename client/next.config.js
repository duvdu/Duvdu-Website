/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "https://api.duvdu.com/",
    ASSETS_URL: "https://duvdu-s3.s3.eu-central-1.amazonaws.com/",
    DEFAULT_PROFILE_PATH: "/assets/imgs/profile/defaultUser.jpg",
    DEFAULT_COVER_PATH: "/assets/imgs/projects/cover.jpeg",
    MAP_KEY: "AIzaSyD7vp9AFu2PiRWNiPktcrBk9PEMn-dFbQ",
  },

  async headers() {
    return [
      {
        // Match the AASA file path
        source: "/.well-known/apple-app-site-association",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
          {
            key: "Content-Disposition",
            value: "inline",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
