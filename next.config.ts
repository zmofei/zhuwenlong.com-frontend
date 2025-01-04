import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  paths: {
    "@/*": ["./components/*"] // 定义 `@` 的别名指向 `src` 文件夹
  },
  async redirects() {
    return [
      {
        source: "/:lang/blog",
        destination: "/:lang/blog/1",
        permanent: true,
      }, {
        source: "/:lang/message",
        destination: "/:lang/message/1",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        // {
        //   source: '/api/:path*',
        //   destination: 'https://www.zhuwenlong.com/api/:path*' // Proxy to Backend
        // },
        {
          source: '/api/:path*',
          destination: 'https://www.mofei.life/api/:path*' // Proxy to Backend
        },
        {
          source: '/api/finshare/wall/:path*',
          destination: 'https://www.finshare.fi/api/finshare/wall/:path*' // Proxy to Backend
        }
      ]
    } else {
      return []
    }
  }
};

export default nextConfig;
