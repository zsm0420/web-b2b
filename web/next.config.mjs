/** @type {import('next').NextConfig} */

const nextConfig = {
    // output: 'export', // 移除静态导出，Vercel 支持 SSR
    basePath: '', // 设置统一前缀如/en
    assetPrefix: '', // 静态资源前缀
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true, // build时跳过eslint
    },
    env: {
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "da9h8exvs",
        NEXT_PUBLIC_CLOUDINARY_PRESET_NAME: "fi0lxkc1",
        // 添加后端API地址（部署后需要在Cloudflare Pages设置环境变量）
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
    },
    images: {
        unoptimized: true, // Cloudflare Pages需要禁用图片优化
        domains: [],
    },
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Cloudflare Pages不需要trailingSlash
    trailingSlash: false,
    headers: async () => [
        {
            source: '/:path*',
            headers: [
                {
                    key: 'X-DNS-Prefetch-Control',
                    value: 'on'
                },
                {
                    key: 'Strict-Transport-Security',
                    value: 'max-age=63072000; includeSubDomains; preload'
                },
                {
                    key: 'X-XSS-Protection',
                    value: '1; mode=block'
                },
                {
                    key: 'X-Frame-Options',
                    value: 'SAMEORIGIN'
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff'
                }
            ]
        }
    ],
    poweredByHeader: false,
    compress: true,
};

export default nextConfig;
