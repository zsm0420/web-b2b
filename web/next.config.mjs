/** @type {import('next').NextConfig} */

const nextConfig = {
    // 启用服务器端渲染
    output: 'standalone',
    trailingSlash: true,
    images: {
        unoptimized: false, // 动态渲染不需要禁用图片优化
        domains: [
            'localhost',
            '127.0.0.1',
            'web-b2b-nefcz4o9k-mos-projects-e998b3b8.vercel.app',
            'picsum.photos'
        ],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000'
            },
            {
                protocol: 'https',
                hostname: 'web-b2b-nefcz4o9k-mos-projects-e998b3b8.vercel.app'
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos'
            }
        ]
    },
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || '',
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['*'],
        },
    },
};

export default nextConfig;
